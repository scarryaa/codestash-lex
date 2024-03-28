import { ServerConfig, ServerConfigValues } from './config'; // Import ServerConfigValues

export class AppContext {
    constructor(private opts: {
        cfg: ServerConfig;
    }) { }

    get cfg(): ServerConfig {
        return this.opts.cfg;
    }

    get serverDid(): string {
        return this.cfg.serverDid || 'did:example:test';
    }

    get dataplaneUrls(): string[] {
        return this.cfg.dataplaneUrls || [];
    }
}
