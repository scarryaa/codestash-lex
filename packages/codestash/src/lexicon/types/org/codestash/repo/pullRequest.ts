import { ValidationResult, BlobRef } from '@atproto/lexicon';
import { lexicons } from '../../../../lexicons';
import { isObj, hasProp } from '../../../../util';

export interface PullRequest {
  title: string; // undefined
  author: string; // undefined
  createdAt: string; // undefined
  updatedAt: string; // undefined
  status: string; // undefined
  mergeable?: boolean; // undefined
  labels?: string[]; // undefined
}


/**
 * Checks if the given value is of type PullRequest.
 * @param v The value to check.
 * @returns True if the value is of type PullRequest, false otherwise.
 */
export function isPullRequest(v: unknown): v is PullRequest {
    return (
        isObj(v) &&
        hasProp(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#PullRequest'
    );
}


/**
 * Validates the given value against the PullRequest type.
 * @param v The value to validate.
 * @returns The validation result.
 */
export function validatePullRequest(v: unknown): ValidationResult {
    return lexicons.validate('app.bsky.actor.defs#pullRequest', v);
}

