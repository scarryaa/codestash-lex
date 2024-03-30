import { createServer } from './lexicon';
import express from 'express';
import cors from 'cors';
import { createHttpTerminator, HttpTerminator } from 'http-terminator';
import { AppContext } from './context';
import http from 'http';
import { ServerConfig } from './config';
import { Keypair } from '@atproto/crypto';
import events from 'events';
import { AddressInfo } from 'net';
import API, { blobResolver, health, wellKnown } from './api';
import { IdResolver } from '@atproto/identity';
import { AuthVerifier } from './auth-verifier';
import { createDataPlaneClient } from './data-plane/client';
import { Hydrator } from './hydration/hydrator';
import { Views } from './views';
import { ImageUriBuilder } from './image/uri';
import { authWithApiKey as csyncAuth, createCsyncClient } from './csync';
import { authWithApiKey as courierAuth, createCourierClient } from './courier';
import AtpAgent from '@codestash-lex/api';
import * as error from './error';
import { BlobDiskCache, ImageProcessingServer } from './image/server';

export * from './data-plane';
export type { ServerConfigValues } from './config';
export { ServerConfig } from './config';
export { Database } from './data-plane/server/db';
export { Redis } from './redis';
export { AppContext } from './context';
export { BackgroundQueue } from './data-plane/server/background';

export class CodestashAppView {
  public ctx: AppContext;
  public app: express.Application;
  public server?: http.Server;
  private terminator?: HttpTerminator;

  constructor(opts: { ctx: AppContext; app: express.Application }) {
    this.ctx = opts.ctx;
    this.app = opts.app;
  }

  static create(opts: {
    config: ServerConfig;
    signingKey: Keypair;
  }): CodestashAppView {
    const { config, signingKey } = opts;
    const app = express();
    app.use(cors());

    // used solely for handle resolution: identity lookups occur on dataplane
    const idResolver = new IdResolver({
      plcUrl: config.didPlcUrl,
      backupNameservers: config.handleResolveNameservers,
    });

    const searchAgent = config.searchUrl
      ? new AtpAgent({ service: config.searchUrl })
      : undefined;

    let imgProcessingServer: ImageProcessingServer | undefined;
    if (!config.cdnUrl) {
      const imgProcessingCache = new BlobDiskCache(config.blobCacheLocation);
      imgProcessingServer = new ImageProcessingServer(
        config,
        imgProcessingCache,
      );
    }

    const imgUriBuilder = new ImageUriBuilder(
      config.cdnUrl || `${config.publicUrl}/img`,
    );

    const dataplane = createDataPlaneClient(config.dataplaneUrls, {
      httpVersion: config.dataplaneHttpVersion,
      rejectUnauthorized: !config.dataplaneIgnoreBadTls,
    });

    const hydrator = new Hydrator(dataplane);
    const views = new Views(imgUriBuilder);

    const authVerifier = new AuthVerifier(dataplane, {
      ownDid: config.serverDid,
      modServiceDid: config.modServiceDid,
      adminPasses: config.adminPasswords,
    });

    const bsyncClient = createCsyncClient({
      baseUrl: config.csyncUrl,
      httpVersion: config.csyncHttpVersion ?? '2',
      nodeOptions: { rejectUnauthorized: !config.csyncIgnoreBadTls },
      interceptors: config.csyncApiKey ? [csyncAuth(config.csyncApiKey)] : [],
    });

    const courierClient = createCourierClient({
      baseUrl: config.courierUrl,
      httpVersion: config.courierHttpVersion ?? '2',
      nodeOptions: { rejectUnauthorized: !config.courierIgnoreBadTls },
      interceptors: config.courierApiKey
        ? [courierAuth(config.courierApiKey)]
        : [],
    });

    const ctx = new AppContext({
      cfg: config,
      dataplane,
      searchAgent,
      hydrator,
      views,
      signingKey,
      idResolver,
      bsyncClient,
      courierClient,
      authVerifier,
    });

    let server = createServer({
      validateResponse: config.debugMode,
      payload: {
        jsonLimit: 100 * 1024, // 100kb
        textLimit: 100 * 1024, // 100kb
        blobLimit: 5 * 1024 * 1024, // 5mb
      },
    });

    server = API(server, ctx);

    app.use(health.createRouter(ctx));
    app.use(wellKnown.createRouter(ctx));
    app.use(blobResolver.createRouter(ctx));
    if (imgProcessingServer) {
      app.use('/img', imgProcessingServer.app);
    }
    app.use(server.xrpc.router);
    app.use(error.handler);

    return new CodestashAppView({ app, ctx });
  }

  async start(): Promise<http.Server> {
    const server = this.app.listen(this.ctx.cfg.port);
    this.server = server;
    server.keepAliveTimeout = 90000;
    this.terminator = createHttpTerminator({ server });
    await events.once(server, 'listening');
    const { port } = server.address() as AddressInfo;
    this.ctx.cfg.assignPort(port);
    return server;
  }

  async destroy(): Promise<void> {
    await this.terminator?.terminate();
  }
}

export default CodestashAppView;
