/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  createServer as createXrpcServer,
  Server as XrpcServer,
  Options as XrpcOptions,
  AuthVerifier,
  StreamAuthVerifier,
} from '@atproto/xrpc-server'
import { schemas } from './lexicons'
import * as OrgCodestashPing from './types/org/codestash/ping'
import * as OrgCodestashRepoGetRepo from './types/org/codestash/repo/getRepo'

export function createServer(options?: XrpcOptions): Server {
  return new Server(options)
}

export class Server {
  xrpc: XrpcServer
  org: OrgNS

  constructor(options?: XrpcOptions) {
    this.xrpc = createXrpcServer(schemas, options)
    this.org = new OrgNS(this)
  }
}

export class OrgNS {
  _server: Server
  codestash: OrgCodestashNS

  constructor(server: Server) {
    this._server = server
    this.codestash = new OrgCodestashNS(server)
  }
}

export class OrgCodestashNS {
  _server: Server
  repo: OrgCodestashRepoNS

  constructor(server: Server) {
    this._server = server
    this.repo = new OrgCodestashRepoNS(server)
  }

  ping<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      OrgCodestashPing.Handler<ExtractAuth<AV>>,
      OrgCodestashPing.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'org.codestash.ping' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }
}

export class OrgCodestashRepoNS {
  _server: Server

  constructor(server: Server) {
    this._server = server
  }

  getRepo<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      OrgCodestashRepoGetRepo.Handler<ExtractAuth<AV>>,
      OrgCodestashRepoGetRepo.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'org.codestash.repo.getRepo' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }
}

type SharedRateLimitOpts<T> = {
  name: string
  calcKey?: (ctx: T) => string
  calcPoints?: (ctx: T) => number
}
type RouteRateLimitOpts<T> = {
  durationMs: number
  points: number
  calcKey?: (ctx: T) => string
  calcPoints?: (ctx: T) => number
}
type HandlerOpts = { blobLimit?: number }
type HandlerRateLimitOpts<T> = SharedRateLimitOpts<T> | RouteRateLimitOpts<T>
type ConfigOf<Auth, Handler, ReqCtx> =
  | Handler
  | {
      auth?: Auth
      opts?: HandlerOpts
      rateLimit?: HandlerRateLimitOpts<ReqCtx> | HandlerRateLimitOpts<ReqCtx>[]
      handler: Handler
    }
type ExtractAuth<AV extends AuthVerifier | StreamAuthVerifier> = Extract<
  Awaited<ReturnType<AV>>,
  { credentials: unknown }
>
