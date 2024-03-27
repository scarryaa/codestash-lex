import { ValidationResult, BlobRef } from '@atproto/lexicon';
import { lexicons } from '../../../../lexicons';
import { isObj, hasProp } from '../../../../util';

export interface Repository {
  name: string; // undefined
  owner: string; // undefined
  description: string; // undefined
  createdAt: string; // undefined
  updatedAt: string; // undefined
  defaultBranch?: string; // undefined
  homepage?: string; // undefined
  languages?: string[]; // undefined
  license?: string; // undefined
  stars?: number; // undefined
  forks?: number; // undefined
  watchers?: number; // undefined
}


/**
 * Checks if the given value is of type Repository.
 * @param v The value to check.
 * @returns True if the value is of type Repository, false otherwise.
 */
export function isRepository(v: unknown): v is Repository {
    return (
        isObj(v) &&
        hasProp(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#Repository'
    );
}


/**
 * Validates the given value against the Repository type.
 * @param v The value to validate.
 * @returns The validation result.
 */
export function validateRepository(v: unknown): ValidationResult {
    return lexicons.validate('app.bsky.actor.defs#repository', v);
}

