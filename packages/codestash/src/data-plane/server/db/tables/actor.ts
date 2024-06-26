export interface Actor {
  did: string;
  handle: string | null;
  indexedAt: string;
  takedownRef: string | null;
}

export const tableName = 'actor';

export type PartialDB = { [tableName]: Actor };
