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
  defaultBranch?: string
  homepage?: string
  languages?: string[]
  license?: string
  stars?: number
  forks?: number
  watchers?: number
  url: string
  [k: string]: unknown
}

export function isRepository(v: unknown): v is Repository {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'org.codestash.repository.defs#repository'
  )
}

export function validateRepository(v: unknown): ValidationResult {
  return lexicons.validate('org.codestash.repository.defs#repository', v)
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
    v.$type === 'org.codestash.repository.defs#commit'
  )
}

export function validateCommit(v: unknown): ValidationResult {
  return lexicons.validate('org.codestash.repository.defs#commit', v)
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
    v.$type === 'org.codestash.repository.defs#branch'
  )
}

export function validateBranch(v: unknown): ValidationResult {
  return lexicons.validate('org.codestash.repository.defs#branch', v)
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
    v.$type === 'org.codestash.repository.defs#issue'
  )
}

export function validateIssue(v: unknown): ValidationResult {
  return lexicons.validate('org.codestash.repository.defs#issue', v)
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
    v.$type === 'org.codestash.repository.defs#pullRequest'
  )
}

export function validatePullRequest(v: unknown): ValidationResult {
  return lexicons.validate('org.codestash.repository.defs#pullRequest', v)
}
