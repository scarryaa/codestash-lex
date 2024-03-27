/**
 * GENERATED CODE
 */

import { ValidationResult, BlobRef } from '@atproto/lexicon';
import { lexicons } from '../../../../lexicons';
import { isObj, hasProp } from '../../../../util';

export interface Repository {
  name: string; 
  owner: string; 
  description: string; 
  createdAt: string; 
  updatedAt: string; 
  defaultBranch?: string; 
  homepage?: string; 
  languages?: string[]; 
  license?: string; 
  stars?: number; 
  forks?: number; 
  watchers?: number; 
}

export function isRepository(v: unknown): v is Repository {
    return (
        isObj(v) &&
        hasProp(v, '$type') &&
        // @ts-ignore
        v.$type === 'app.bsky.actor.defs#repository'
    )
}
    
export function validateRepository(v: unknown): ValidationResult {
    return lexicons.validate('app.bsky.actor.defs#repository', v)
}
export interface Commit {
  sha: string; 
  message: string; 
  author: string; 
  timestamp: string; 
}

export function isCommit(v: unknown): v is Commit {
    return (
        isObj(v) &&
        hasProp(v, '$type') &&
        // @ts-ignore
        v.$type === 'app.bsky.actor.defs#commit'
    )
}
    
export function validateCommit(v: unknown): ValidationResult {
    return lexicons.validate('app.bsky.actor.defs#commit', v)
}
export interface Branch {
  name: string; 
  commitSha: string; 
}

export function isBranch(v: unknown): v is Branch {
    return (
        isObj(v) &&
        hasProp(v, '$type') &&
        // @ts-ignore
        v.$type === 'app.bsky.actor.defs#branch'
    )
}
    
export function validateBranch(v: unknown): ValidationResult {
    return lexicons.validate('app.bsky.actor.defs#branch', v)
}
export interface Issue {
  title: string; 
  author: string; 
  createdAt: string; 
  updatedAt?: string; 
  status?: string; 
  labels?: string[]; 
}

export function isIssue(v: unknown): v is Issue {
    return (
        isObj(v) &&
        hasProp(v, '$type') &&
        // @ts-ignore
        v.$type === 'app.bsky.actor.defs#issue'
    )
}
    
export function validateIssue(v: unknown): ValidationResult {
    return lexicons.validate('app.bsky.actor.defs#issue', v)
}
export interface PullRequest {
  title: string; 
  author: string; 
  createdAt: string; 
  updatedAt: string; 
  status: string; 
  mergeable?: boolean; 
  labels?: string[]; 
}

export function isPullRequest(v: unknown): v is PullRequest {
    return (
        isObj(v) &&
        hasProp(v, '$type') &&
        // @ts-ignore
        v.$type === 'app.bsky.actor.defs#pullRequest'
    )
}
    
export function validatePullRequest(v: unknown): ValidationResult {
    return lexicons.validate('app.bsky.actor.defs#pullRequest', v)
}
