import { Keypair } from '@atproto/crypto';
import { AuthVerifier } from './auth-verifier';
import { ServerConfig, ServerConfigValues } from './config';
import { Hydrator } from './hydration/hydrator';
import { DataPlaneClient } from './data-plane';
import { Views } from './views';

export class AppContext {
    constructor(
        private opts: {
            cfg: ServerConfig;
            dataplane: DataPlaneClient;
            authVerifier: AuthVerifier;
            signingKey: Keypair;
            hydrator: Hydrator;
            views: Views;
        }) { }

    get cfg(): ServerConfig {
        return this.opts.cfg;
    }

    get dataplane(): DataPlaneClient {
        return this.opts.dataplane;
    }

    get serverDid(): string {
        return this.cfg.serverDid || 'did:example:test';
    }

    get authVerifier(): AuthVerifier {
        return this.opts.authVerifier;
    }

    get hydrator(): Hydrator {
        return this.opts.hydrator;
    }

    get views(): Views {
        return this.opts.views;
    }
}
