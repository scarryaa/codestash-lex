import assert from 'node:assert'

export interface ServerConfigValues {
    port: number;
    serverDid: string;
    dataplaneUrls: string[];
    version?: string;
}

export class ServerConfig {
    private assignedPort?: number;
    constructor(private cfg: ServerConfigValues) { }

    assignPort(port: number) {
        assert(
            !this.cfg.port || this.cfg.port === port,
            'Conflicting port in config',
        )
        this.assignedPort = port;
    }

    get serverDid() {
        return this.cfg.serverDid || 'did:example:test';
    }

    get dataplaneUrls() {
        return this.cfg.dataplaneUrls || [];
    }

    get version() {
        return this.cfg.version;
    }

    get port() {
        return this.assignedPort || this.cfg.port
    }
}
