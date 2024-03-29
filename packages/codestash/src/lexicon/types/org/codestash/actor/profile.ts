/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { lexicons } from '../../../../lexicons'
import { isObj, hasProp } from '../../../../util'
import { CID } from 'multiformats/cid'

export interface Record {
  did?: string
  /** The handle of the user */
  handle?: string
  /** The display name of the user */
  displayName?: string
  /** Free-form profile description text. */
  bio?: string
  /** Small image to be displayed next to posts from account. AKA, 'profile picture' */
  avatar?: BlobRef
  /** Larger horizontal image to display behind profile view. */
  banner?: BlobRef
  /** The user's location */
  location?: string
  /** URL of the user's website */
  website?: string
  [k: string]: unknown
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'org.codestash.actor.profile#main' ||
      v.$type === 'org.codestash.actor.profile')
  )
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('org.codestash.actor.profile#main', v)
}
