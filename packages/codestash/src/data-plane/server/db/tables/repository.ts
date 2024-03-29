export interface Repository {
    name: string
    owner: string
    description: string
    createdAt: string
    updatedAt: string
    defaultBranch?: string
    url: string;
    homepage?: string
    languages?: string[]
    license?: string
    stars?: number
    forks?: number
    watchers?: number
    takedownRef: string | null;
}

export const tableName = "repository";

export type PartialDB = { [tableName]: Repository }