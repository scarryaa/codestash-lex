import { AtUri } from '@atproto/syntax'
import { CID } from 'multiformats/cid'
import * as Profile from '../../../../lexicon/types/org/codestash/actor/profile';
import * as lex from '../../../../lexicon/lexicons'
import { DatabaseSchema, DatabaseSchemaType } from '../../db/database-schema'
import RecordProcessor from '../processor'
import { Database } from '../../db'
import { BackgroundQueue } from '../../background'
import { InsertObject } from 'kysely';

const lexId = lex.ids.OrgCodestashActorProfile
type IndexedProfile = DatabaseSchemaType['profile']

const insertFn = async (
    db: DatabaseSchema,
    uri: AtUri,
    cid: CID,
    obj: Profile.Record,
    timestamp: string,
): Promise<IndexedProfile | null> => {
    if (uri.rkey !== 'self') return null;

    // Extract values from the obj
    const { displayName, description, avatar, banner } = obj;

    // Construct the values object with explicit types
    const values: InsertObject<DatabaseSchemaType, "profile"> = {
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        displayName: displayName || null,
        description: description as string,
        avatarCid: avatar?.ref.toString() || null,
        bannerCid: banner?.ref.toString() || null,
        indexedAt: timestamp,
    };

    const inserted = await db
        .insertInto('profile')
        .values(values)
        .onConflict((oc) => oc.doNothing())
        .returningAll()
        .executeTakeFirst();

    return inserted || null;
};


const findDuplicate = async (): Promise<AtUri | null> => {
    return null
}

const notifsForInsert = () => {
    return []
}

const deleteFn = async (
    db: DatabaseSchema,
    uri: AtUri,
): Promise<IndexedProfile | null> => {
    const deleted = await db
        .deleteFrom('profile')
        .where('uri', '=', uri.toString())
        .returningAll()
        .executeTakeFirst()
    return deleted || null
}

const notifsForDelete = () => {
    return { notifs: [], toDelete: [] }
}

export type PluginType = RecordProcessor<Profile.Record, IndexedProfile>

export const makePlugin = (
    db: Database,
    background: BackgroundQueue,
): PluginType => {
    return new RecordProcessor(db, background, {
        lexId,
        insertFn,
        findDuplicate,
        deleteFn,
    })
}

export default makePlugin
