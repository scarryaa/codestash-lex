import { Keypair } from '@atproto/crypto';
import { AuthVerifier } from './auth-verifier';
import { ServerConfig, ServerConfigValues } from './config';
import * as plc from '@did-plc/lib';
import { Hydrator } from './hydration/hydrator';
import { DataPlaneClient } from './data-plane';
import { Views } from './views';
import { IdResolver } from '@atproto/identity';
import { CsyncClient } from './csync';
import AtpAgent from '@codestash-lex/api';
import { createServiceJwt } from '@atproto/xrpc-server';
import express from 'express';
import { CourierClient } from './courier';

export class AppContext {
  constructor(
    private opts: {
      cfg: ServerConfig;
      dataplane: DataPlaneClient;
      searchAgent: AtpAgent | undefined;
      hydrator: Hydrator;
      views: Views;
      signingKey: Keypair;
      idResolver: IdResolver;
      bsyncClient: CsyncClient;
      courierClient: CourierClient;
      authVerifier: AuthVerifier;
    },
  ) {}

  get cfg(): ServerConfig {
    return this.opts.cfg;
  }

  get dataplane(): DataPlaneClient {
    return this.opts.dataplane;
  }

  get searchAgent(): AtpAgent | undefined {
    return this.opts.searchAgent;
  }

  get hydrator(): Hydrator {
    return this.opts.hydrator;
  }

  get views(): Views {
    return this.opts.views;
  }

  get signingKey(): Keypair {
    return this.opts.signingKey;
  }

  get plcClient(): plc.Client {
    return new plc.Client(this.cfg.didPlcUrl);
  }

  get idResolver(): IdResolver {
    return this.opts.idResolver;
  }

  get bsyncClient(): CsyncClient {
    return this.opts.bsyncClient;
  }

  get courierClient(): CourierClient {
    return this.opts.courierClient;
  }

  get authVerifier(): AuthVerifier {
    return this.opts.authVerifier;
  }

  async serviceAuthJwt(aud: string) {
    const iss = this.cfg.serverDid;
    return createServiceJwt({
      iss,
      aud,
      keypair: this.signingKey,
    });
  }
}

export default AppContext;
