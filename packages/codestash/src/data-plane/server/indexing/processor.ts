import { Database } from '../db';
import { CID } from 'multiformats/cid';
import DatabaseSchema from '../db/database-schema';
import { BackgroundQueue } from '../background';
import { lexicons } from '../../../lexicon/lexicons';
import { jsonStringToLex, stringifyLex } from '@atproto/lexicon';
import { AtUri } from '@atproto/syntax';

type RecordProcessorParams<T, S> = {
  lexId: string;
  insertFn: (
    db: DatabaseSchema,
    uri: AtUri,
    cid: CID,
    obj: T,
    timestamp: string,
  ) => Promise<S | null>;
  findDuplicate: (
    db: DatabaseSchema,
    uri: AtUri,
    obj: T,
  ) => Promise<AtUri | null>;
  deleteFn: (db: DatabaseSchema, uri: AtUri) => Promise<S | null>;
  updateAggregates?: (db: DatabaseSchema, obj: S) => Promise<void>;
};

export class RecordProcessor<T, S> {
  collection: string;
  db: DatabaseSchema;
  constructor(
    private appDb: Database,
    private background: BackgroundQueue,
    private params: RecordProcessorParams<T, S>,
  ) {
    this.db = appDb.db;
    this.collection = this.params.lexId;
  }

  matchesSchema(obj: unknown): obj is T {
    try {
      this.assertValidRecord(obj);
      return true;
    } catch {
      return false;
    }
  }

  assertValidRecord(obj: unknown): asserts obj is T {
    lexicons.assertValidRecord(this.params.lexId, obj);
  }

  async insertRecord(
    uri: AtUri,
    cid: CID,
    obj: unknown,
    timestamp: string,
    opts?: { disableNotifs?: boolean },
  ) {
    this.assertValidRecord(obj);
    await this.db
      .insertInto('record')
      .values({
        // @ts-ignore TODO investigate this
        url: uri,
        cid: cid.toString(),
        did: uri.host,
        json: stringifyLex(obj),
        indexedAt: timestamp,
      })
      .onConflict((oc) => oc.doNothing())
      .execute();
    const inserted = await this.params.insertFn(
      this.db,
      uri,
      cid,
      obj,
      timestamp,
    );
    if (inserted) {
      this.aggregateOnCommit(inserted);
      return;
    }
    const found = await this.params.findDuplicate(this.db, uri, obj);
    if (found && found.toString() !== uri.toString()) {
      await this.db
        .insertInto('duplicate_record')
        .values({
          uri: uri.toString(),
          cid: cid.toString(),
          duplicateOf: found.toString(),
          indexedAt: timestamp,
        })
        .onConflict((oc) => oc.doNothing())
        .execute();
    }
  }

  async updateRecord(
    uri: AtUri,
    cid: CID,
    obj: unknown,
    timestamp: string,
    opts?: { disableNotifs?: boolean },
  ) {
    this.assertValidRecord(obj);
    await this.db
      .updateTable('record')
      .where('uri', '=', uri.toString())
      .set({
        cid: cid.toString(),
        json: stringifyLex(obj),
        indexedAt: timestamp,
      })
      .execute();
    const dupe = await this.params.findDuplicate(this.db, uri, obj);
    if (dupe) {
      await this.db
        .updateTable('duplicate_record')
        .where('uri', '=', uri.toString())
        .set({
          cid: cid.toString(),
          duplicateOf: dupe.toString(),
          indexedAt: timestamp,
        })
        .execute();
    } else {
      await this.db
        .deleteFrom('duplicate_record')
        .where('uri', '=', uri.toString())
        .execute();
    }
    const deleted = await this.params.deleteFn(this.db, uri);
    if (!deleted) {
      return this.insertRecord(uri, cid, obj, timestamp);
    }
    this.aggregateOnCommit(deleted);
    const inserted = await this.params.insertFn(
      this.db,
      uri,
      cid,
      obj,
      timestamp,
    );
    if (!inserted) {
      throw new Error(
        'Record update failed: removed from index but could not be replaced',
      );
    }
    this.aggregateOnCommit(inserted);
  }

  async deleteRecord(uri: AtUri, cascading = false) {
    await this.db
      .deleteFrom('record')
      .where('uri', '=', uri.toString())
      .execute();
    await this.db
      .deleteFrom('duplicate_record')
      .where('uri', '=', uri.toString())
      .execute();
    const deleted = await this.params.deleteFn(this.db, uri);
    if (!deleted) return;
    this.aggregateOnCommit(deleted);
    if (cascading) {
      await this.db
        .deleteFrom('duplicate_record')
        .where('duplicateOf', '=', uri.toString())
        .execute();
    } else {
      const found = await this.db
        .selectFrom('duplicate_record')
        .innerJoin('record', 'record.uri', 'duplicate_record.uri')
        .where('duplicateOf', '=', uri.toString())
        .orderBy('duplicate_record.indexedAt', 'asc')
        .limit(1)
        .selectAll()
        .executeTakeFirst();

      if (!found) {
        return;
      }
      const record = jsonStringToLex(found.json);
      if (!this.matchesSchema(record)) {
        return;
      }
      const inserted = await this.params.insertFn(
        this.db,
        new AtUri(found.uri),
        CID.parse(found.cid),
        record,
        found.indexedAt,
      );
      if (inserted) {
        this.aggregateOnCommit(inserted);
      }
    }
  }

  aggregateOnCommit(indexed: S) {
    const { updateAggregates } = this.params;
    if (!updateAggregates) return;
    this.appDb.onCommit(() => {
      this.background.add((db) => updateAggregates(db.db, indexed));
    });
  }
}

export default RecordProcessor;
