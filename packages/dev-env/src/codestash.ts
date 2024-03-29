import getPort from 'get-port'
import * as ui8 from 'uint8arrays'
import * as codestash from '@codestash-lex/codestash'
import { AtpAgent } from '@codestash-lex/api'
import { Secp256k1Keypair } from '@atproto/crypto'
import { BackgroundQueue } from '@codestash-lex/codestash'
import { Client as PlcClient } from '@did-plc/lib'
import { CodestashConfig } from './types'
import { ADMIN_PASSWORD, EXAMPLE_LABELER } from './const'

export * from '@atproto/bsky'

export class TestCodestash {
    constructor(
        public url: string,
        public port: number,
        public db: codestash.Database,
        public server: codestash.CodestashAppView,
        public dataplane: codestash.DataPlaneServer,
        public csync: codestash.MockCsync,
        public sub: codestash.RepoSubscription,
    ) { }

    static async create(cfg: CodestashConfig): Promise<TestCodestash> {
        const serviceKeypair = await Secp256k1Keypair.create()
        const plcClient = new PlcClient(cfg.plcUrl)

        const port = cfg.port || (await getPort())
        const url = `http://localhost:${port}`
        const serverDid = await plcClient.createDid({
            signingKey: serviceKeypair.did(),
            rotationKeys: [serviceKeypair.did()],
            handle: 'bsky.test',
            pds: `http://localhost:${port}`,
            signer: serviceKeypair,
        })

        // shared across server, ingester, and indexer in order to share pool, avoid too many pg connections.
        const db = new codestash.Database({
            url: cfg.dbPostgresUrl,
            schema: cfg.dbPostgresSchema,
            poolSize: 10,
        })

        const dataplanePort = await getPort()
        const dataplane = await codestash.DataPlaneServer.create(
            db,
            dataplanePort,
            cfg.plcUrl,
        )

        const bsyncPort = await getPort()
        const bsync = await codestash.MockCsync.create(db, bsyncPort)

        const config = new codestash.ServerConfig({
            version: 'unknown',
            port,
            didPlcUrl: cfg.plcUrl,
            publicUrl: 'https://bsky.public.url',
            serverDid,
            dataplaneUrls: [`http://localhost:${dataplanePort}`],
            dataplaneHttpVersion: '1.1',
            csyncUrl: `http://localhost:${bsyncPort}`,
            csyncHttpVersion: '1.1',
            courierUrl: 'https://fake.example',
            modServiceDid: cfg.modServiceDid ?? 'did:example:invalidMod',
            labelsFromIssuerDids: [EXAMPLE_LABELER],
            ...cfg,
            adminPasswords: [ADMIN_PASSWORD],
        })

        // Separate migration db in case migration changes some connection state that we need in the tests, e.g. "alter database ... set ..."
        const migrationDb = new codestash.Database({
            url: cfg.dbPostgresUrl,
            schema: cfg.dbPostgresSchema,
        })
        if (cfg.migration) {
            await migrationDb.migrateToOrThrow(cfg.migration)
        } else {
            await migrationDb.migrateToLatestOrThrow()
        }
        await migrationDb.close()

        // api server
        const server = codestash.CodestashAppView.create({
            config,
            signingKey: serviceKeypair,
        })

        const sub = new codestash.RepoSubscription({
            service: cfg.repoProvider,
            db,
            idResolver: dataplane.idResolver,
            background: new BackgroundQueue(db),
        })

        await server.start()
        sub.run()

        return new TestCodestash(url, port, db, server, dataplane, bsync, sub)
    }

    get ctx(): codestash.AppContext {
        return this.server.ctx
    }

    getClient() {
        const agent = new AtpAgent({ service: this.url })
        return agent
    }

    adminAuth(): string {
        const [password] = this.ctx.cfg.adminPasswords
        return (
            'Basic ' +
            ui8.toString(ui8.fromString(`admin:${password}`, 'utf8'), 'base64pad')
        )
    }

    adminAuthHeaders() {
        return {
            authorization: this.adminAuth(),
        }
    }

    async close() {
        await this.server.destroy()
        await this.csync.destroy()
        await this.dataplane.destroy()
        await this.sub.destroy()
        await this.db.close()
    }
}
