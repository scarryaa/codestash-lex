/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { lexicons } from '../../../../lexicons'
import { isObj, hasProp } from '../../../../util'
import { CID } from 'multiformats/cid'

export interface Repository {
  name: string
  owner: string
  description: string
  createdAt: string
  updatedAt: string
  url: string;
  defaultBranch?: string
  homepage?: string
  languages?: string[]
  license?: string
  stars?: number
  forks?: number
  watchers?: number
  [k: string]: unknown
}

export function isRepository(v: unknown): v is Repository {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'org.codestash.repo.defs#repository'
  )
}

export function validateRepository(v: unknown): ValidationResult {
  return lexicons.validate('org.codestash.repo.defs#repository', v)
}

export interface Commit {
  sha: string
  message: string
  author: string
  timestamp: string
  [k: string]: unknown
}

export function isCommit(v: unknown): v is Commit {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'org.codestash.repo.defs#commit'
  )
}

export function validateCommit(v: unknown): ValidationResult {
  return lexicons.validate('org.codestash.repo.defs#commit', v)
}

export interface Branch {
  name: string
  commitSha: string
  [k: string]: unknown
}

export function isBranch(v: unknown): v is Branch {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'org.codestash.repo.defs#branch'
  )
}

export function validateBranch(v: unknown): ValidationResult {
  return lexicons.validate('org.codestash.repo.defs#branch', v)
}

export interface Issue {
  title: string
  author: string
  createdAt: string
  updatedAt?: string
  status?: string
  labels?: string[]
  [k: string]: unknown
}

export function isIssue(v: unknown): v is Issue {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'org.codestash.repo.defs#issue'
  )
}

export function validateIssue(v: unknown): ValidationResult {
  return lexicons.validate('org.codestash.repo.defs#issue', v)
}

export interface PullRequest {
  title: string
  author: string
  createdAt: string
  updatedAt: string
  status: string
  mergeable?: boolean
  labels?: string[]
  [k: string]: unknown
}

export function isPullRequest(v: unknown): v is PullRequest {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'org.codestash.repo.defs#pullRequest'
  )
}

export function validatePullRequest(v: unknown): ValidationResult {
  return lexicons.validate('org.codestash.repo.defs#pullRequest', v)
}
