import { ValidationResult, BlobRef } from '@atproto/lexicon';
import { lexicons } from '../../../../lexicons';
import { isObj, hasProp } from '../../../../util';

export interface Issue {
  title: string; // undefined
  author: string; // undefined
  createdAt: string; // undefined
  updatedAt?: string; // undefined
  status?: string; // undefined
  labels?: string[]; // undefined
}


/**
 * Checks if the given value is of type Issue.
 * @param v The value to check.
 * @returns True if the value is of type Issue, false otherwise.
 */
export function isIssue(v: unknown): v is Issue {
    return (
        isObj(v) &&
        hasProp(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#Issue'
    );
}


/**
 * Validates the given value against the Issue type.
 * @param v The value to validate.
 * @returns The validation result.
 */
export function validateIssue(v: unknown): ValidationResult {
    return lexicons.validate('app.bsky.actor.defs#issue', v);
}

