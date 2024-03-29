/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { isObj, hasProp } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import { CID } from 'multiformats/cid'

export interface UserProfileBasic {
  did: string
  /** The handle of the user */
  handle: string
  /** URL of the user's avatar */
  avatar?: string
  /** Brief description of the user */
  bio?: string
  /** Number of followers the user has */
  followerCount?: number
  /** Number of users the user is following */
  followingCount?: number
  /** Number of repositories the user has */
  repositoryCount?: number
  /** Location of the user */
  location?: string
  /** URL of the user's website */
  website?: string
  [k: string]: unknown
}

export function isUserProfileBasic(v: unknown): v is UserProfileBasic {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'org.codestash.actor.defs#userProfileBasic'
  )
}

export function validateUserProfileBasic(v: unknown): ValidationResult {
  return lexicons.validate('org.codestash.actor.defs#userProfileBasic', v)
}

export interface UserProfileDetailed {
  did: string
  /** The handle of the user */
  handle: string
  /** URL of the user's avatar */
  avatar?: string
  /** Brief description of the user */
  bio?: string
  /** Number of followers the user has */
  followerCount?: number
  /** Number of users the user is following */
  followingCount?: number
  /** Number of repositories the user has */
  repositoryCount?: number
  /** Location of the user */
  location?: string
  /** URL of the user's website */
  website?: string
  /** Email address of the user */
  email?: string
  /** Company the user is associated with */
  company?: string
  /** Timestamp of when the user joined */
  joinedAt?: string
  /** Timestamp of when the user was last active */
  lastActive?: string
  [k: string]: unknown
}

export function isUserProfileDetailed(v: unknown): v is UserProfileDetailed {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'org.codestash.actor.defs#userProfileDetailed'
  )
}

export function validateUserProfileDetailed(v: unknown): ValidationResult {
  return lexicons.validate('org.codestash.actor.defs#userProfileDetailed', v)
}

export interface UserProfileAdvanced {
  did: string
  /** The handle of the user */
  handle: string
  /** URL of the user's avatar */
  avatar?: string
  /** Brief description of the user */
  bio?: string
  /** Number of followers the user has */
  followerCount?: number
  /** Number of users the user is following */
  followingCount?: number
  /** Number of repositories the user has */
  repositoryCount?: number
  /** Location of the user */
  location?: string
  /** URL of the user's website */
  website?: string
  /** Email address of the user */
  email?: string
  /** Company the user is associated with */
  company?: string
  /** Timestamp of when the user joined */
  joinedAt?: string
  /** Timestamp of when the user was last active */
  lastActive?: string
  /** Programming languages the user is familiar with */
  languages?: string[]
  [k: string]: unknown
}

export function isUserProfileAdvanced(v: unknown): v is UserProfileAdvanced {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'org.codestash.actor.defs#userProfileAdvanced'
  )
}

export function validateUserProfileAdvanced(v: unknown): ValidationResult {
  return lexicons.validate('org.codestash.actor.defs#userProfileAdvanced', v)
}
