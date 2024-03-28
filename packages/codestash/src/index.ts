import { createServer } from './lexicon';
import express from 'express';
import cors from 'cors';
import { createHttpTerminator, HttpTerminator } from 'http-terminator'
import { AppContext } from './context';
import http from 'http'
import { ServerConfig } from './config';
import { Keypair } from '@atproto/crypto'
import events from 'events'
import { AddressInfo } from 'net'

export class CodestashAppView {
    public ctx: AppContext;
    public app: express.Application;
    public server?: http.Server;
    private terminator?: HttpTerminator;

    constructor(opts: { ctx: AppContext, app: express.Application }) {
        this.ctx = opts.ctx;
        this.app = opts.app;
    }

    static create(opts: {
        config: ServerConfig;
        signingKey: Keypair;
    }): CodestashAppView {
        const { config, signingKey } = opts;
        const app = express();
        app.use(cors);

        const ctx = new AppContext({
            cfg: config
        })

        return new CodestashAppView({ app, ctx });
    }

    async start(): Promise<http.Server> {
        const server = this.app.listen(this.ctx.cfg.port)
        this.server = server
        server.keepAliveTimeout = 90000
        this.terminator = createHttpTerminator({ server })
        await events.once(server, 'listening')
        const { port } = server.address() as AddressInfo
        this.ctx.cfg.assignPort(port)
        return server
    }
}