import { ValidationResult, BlobRef } from '@atproto/lexicon';
import { lexicons } from '../../../../lexicons';
import { isObj, hasProp } from '../../../../util';

export interface Commit {
  sha: string; // undefined
  message: string; // undefined
  author: string; // undefined
  timestamp: string; // undefined
}


/**
 * Checks if the given value is of type Commit.
 * @param v The value to check.
 * @returns True if the value is of type Commit, false otherwise.
 */
export function isCommit(v: unknown): v is Commit {
    return (
        isObj(v) &&
        hasProp(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#Commit'
    );
}


/**
 * Validates the given value against the Commit type.
 * @param v The value to validate.
 * @returns The validation result.
 */
export function validateCommit(v: unknown): ValidationResult {
    return lexicons.validate('app.bsky.actor.defs#commit', v);
}

