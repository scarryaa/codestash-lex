import { ValidationResult } from "@atproto/lexicon";
import { hasProp, isObj } from "../../../../util";
import { lexicons } from "../../../../lexicons";

export interface RepositoryView {
    name: string;
    owner: string;
    description: string;
    created_at: string; // ISO 8601 datetime string
    updated_at: string; // ISO 8601 datetime string
    default_branch?: string;
    homepage?: string;
    language?: string;
    license?: string;
    stars?: number;
    forks?: number;
    watchers?: number;
}

export const isRepositoryView = (v: unknown): v is RepositoryView => {
    return (
        isObj(v) &&
        hasProp(v, '$type') &&
        v.$type === 'org.codestash.repo.defs#repository'
    )
}

export const validateRepositoryView = (v: unknown): ValidationResult => {
    return lexicons.validate('org.codestash.repo.defs#repository', v);
}
