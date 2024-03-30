import { Headers } from '@atproto/xrpc'
import { AtUri } from '@atproto/syntax'
import { CID } from 'multiformats/cid'
import { Record as ProfileRecord } from '../lexicon/types/org/codestash/actor/profile'
import { LocalViewer } from './viewer'

export type LocalRecords = {
  count: number
  profile: RecordDescript<ProfileRecord> | null
}

export type RecordDescript<T> = {
  uri: AtUri
  cid: CID
  indexedAt: string
  record: T
}

export type ApiRes<T> = {
  headers: Headers
  data: T
}

export type MungeFn<T> = (
  localViewer: LocalViewer,
  original: T,
  local: LocalRecords,
  requester: string,
) => Promise<T>

export type HandlerResponse<T> = {
  encoding: 'application/json'
  body: T
  headers?: Record<string, string>
}
