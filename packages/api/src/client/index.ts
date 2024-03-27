/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  Client as XrpcClient,
  ServiceClient as XrpcServiceClient,
} from '@atproto/xrpc'
import { schemas } from './lexicons'
import { CID } from 'multiformats/cid'
import * as OrgCodestashRepoDefs from './types/org/codestash/repo/defs'
import * as OrgCodestashRepoGetRepo from './types/org/codestash/repo/getRepo'

export * as OrgCodestashRepoDefs from './types/org/codestash/repo/defs'
export * as OrgCodestashRepoGetRepo from './types/org/codestash/repo/getRepo'

export class AtpBaseClient {
  xrpc: XrpcClient = new XrpcClient()

  constructor() {
    this.xrpc.addLexicons(schemas)
  }

  service(serviceUri: string | URL): AtpServiceClient {
    return new AtpServiceClient(this, this.xrpc.service(serviceUri))
  }
}

export class AtpServiceClient {
  _baseClient: AtpBaseClient
  xrpc: XrpcServiceClient
  org: OrgNS

  constructor(baseClient: AtpBaseClient, xrpcService: XrpcServiceClient) {
    this._baseClient = baseClient
    this.xrpc = xrpcService
    this.org = new OrgNS(this)
  }

  setHeader(key: string, value: string): void {
    this.xrpc.setHeader(key, value)
  }
}

export class OrgNS {
  _service: AtpServiceClient
  codestash: OrgCodestashNS

  constructor(service: AtpServiceClient) {
    this._service = service
    this.codestash = new OrgCodestashNS(service)
  }
}

export class OrgCodestashNS {
  _service: AtpServiceClient
  repo: OrgCodestashRepoNS

  constructor(service: AtpServiceClient) {
    this._service = service
    this.repo = new OrgCodestashRepoNS(service)
  }
}

export class OrgCodestashRepoNS {
  _service: AtpServiceClient

  constructor(service: AtpServiceClient) {
    this._service = service
  }

  getRepo(
    params?: OrgCodestashRepoGetRepo.QueryParams,
    opts?: OrgCodestashRepoGetRepo.CallOptions,
  ): Promise<OrgCodestashRepoGetRepo.Response> {
    return this._service.xrpc
      .call('org.codestash.repo.getRepo', params, undefined, opts)
      .catch((e) => {
        throw OrgCodestashRepoGetRepo.toKnownErr(e)
      })
  }
}
