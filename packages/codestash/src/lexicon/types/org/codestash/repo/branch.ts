import { ValidationResult, BlobRef } from '@atproto/lexicon';
import { lexicons } from '../../../../lexicons';
import { isObj, hasProp } from '../../../../util';

export interface Branch {
  name: string; // undefined
  commitSha: string; // undefined
}


/**
 * Checks if the given value is of type Branch.
 * @param v The value to check.
 * @returns True if the value is of type Branch, false otherwise.
 */
export function isBranch(v: unknown): v is Branch {
    return (
        isObj(v) &&
        hasProp(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#Branch'
    );
}


/**
 * Validates the given value against the Branch type.
 * @param v The value to validate.
 * @returns The validation result.
 */
export function validateBranch(v: unknown): ValidationResult {
    return lexicons.validate('app.bsky.actor.defs#branch', v);
}

