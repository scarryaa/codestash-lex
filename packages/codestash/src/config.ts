import assert from 'node:assert'

export interface ServerConfigValues {
    // service
    version?: string
    debugMode?: boolean
    port?: number
    publicUrl?: string
    serverDid: string
    csyncHttpVersion?: '1.1' | '2'
    // external services
    dataplaneUrls: string[]
    dataplaneHttpVersion: ('1.1' | '2');
    dataplaneIgnoreBadTls?: boolean;
    csyncUrl: string
    csyncApiKey?: string
    csyncIgnoreBadTls?: boolean
    courierUrl: string
    courierApiKey?: string
    courierHttpVersion?: '1.1' | '2'
    courierIgnoreBadTls?: boolean
    searchUrl?: string
    cdnUrl?: string
    blobRateLimitBypassKey?: string
    blobRateLimitBypassHostname?: string
    // identity
    didPlcUrl: string
    handleResolveNameservers?: string[]
    // moderation and administration
    modServiceDid: string
    adminPasswords: string[]
    labelsFromIssuerDids?: string[]
    // misc/dev
    blobCacheLocation?: string
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

    static readEnv(overrides?: Partial<ServerConfigValues>) {
        const version = process.env.BSKY_VERSION || undefined
        const debugMode = process.env.NODE_ENV !== 'production'
        const publicUrl = process.env.CODESTASH_PUBLIC_URL || undefined
        const serverDid = process.env.BSKY_SERVER_DID || 'did:example:test'
        const envPort = parseInt(process.env.CODESTASH_PORT || '', 10)
        const port = isNaN(envPort) ? 2584 : envPort
        const didPlcUrl = process.env.BSKY_DID_PLC_URL || 'http://localhost:2582'
        const handleResolveNameservers = process.env.BSKY_HANDLE_RESOLVE_NAMESERVERS
            ? process.env.BSKY_HANDLE_RESOLVE_NAMESERVERS.split(',')
            : []
        const cdnUrl = process.env.BSKY_CDN_URL || process.env.BSKY_IMG_URI_ENDPOINT
        const blobCacheLocation = process.env.BSKY_BLOB_CACHE_LOC
        const searchUrl =
            process.env.BSKY_SEARCH_URL ||
            process.env.BSKY_SEARCH_ENDPOINT ||
            undefined
        let dataplaneUrls = overrides?.dataplaneUrls
        dataplaneUrls ??= process.env.BSKY_DATAPLANE_URLS
            ? process.env.BSKY_DATAPLANE_URLS.split(',')
            : []
        const dataplaneHttpVersion = process.env.BSKY_DATAPLANE_HTTP_VERSION || '2' as ("1.1" | "2")
        const dataplaneIgnoreBadTls =
            process.env.BSKY_DATAPLANE_IGNORE_BAD_TLS === 'true'
        const labelsFromIssuerDids = process.env.BSKY_LABELS_FROM_ISSUER_DIDS
            ? process.env.BSKY_LABELS_FROM_ISSUER_DIDS.split(',')
            : []
        const csyncUrl = process.env.BSKY_CSYNC_URL || undefined
        assert(csyncUrl)
        const csyncApiKey = process.env.BSKY_CSYNC_API_KEY || undefined
        const csyncHttpVersion = process.env.BSKY_CSYNC_HTTP_VERSION || '2'
        const csyncIgnoreBadTls = process.env.BSKY_CSYNC_IGNORE_BAD_TLS === 'true'
        assert(csyncHttpVersion === '1.1' || csyncHttpVersion === '2')
        const courierUrl = process.env.BSKY_COURIER_URL || undefined
        assert(courierUrl)
        const courierApiKey = process.env.BSKY_COURIER_API_KEY || undefined
        const courierHttpVersion = process.env.BSKY_COURIER_HTTP_VERSION || '2'
        const courierIgnoreBadTls =
            process.env.BSKY_COURIER_IGNORE_BAD_TLS === 'true'
        assert(courierHttpVersion === '1.1' || courierHttpVersion === '2')
        const blobRateLimitBypassKey =
            process.env.BSKY_BLOB_RATE_LIMIT_BYPASS_KEY || undefined
        // single domain would be e.g. "mypds.com", subdomains are supported with a leading dot e.g. ".mypds.com"
        const blobRateLimitBypassHostname =
            process.env.BSKY_BLOB_RATE_LIMIT_BYPASS_HOSTNAME || undefined
        assert(
            !blobRateLimitBypassKey || blobRateLimitBypassHostname,
            'must specify a hostname when using a blob rate limit bypass key',
        )
        const adminPasswords = envList(
            process.env.BSKY_ADMIN_PASSWORDS || process.env.BSKY_ADMIN_PASSWORD,
        )
        // const modServiceDid = process.env.MOD_SERVICE_DID
        // assert(modServiceDid)
        // assert(dataplaneUrls.length)
        // assert(dataplaneHttpVersion === '1.1' || dataplaneHttpVersion === '2')
        return new ServerConfig({
            version,
            debugMode,
            port,
            publicUrl,
            serverDid,
            dataplaneUrls,
            // @ts-ignore ignore string is not assignable to 1.1 or 2
            dataplaneHttpVersion,
            dataplaneIgnoreBadTls,
            searchUrl,
            didPlcUrl,
            labelsFromIssuerDids,
            handleResolveNameservers,
            cdnUrl,
            blobCacheLocation,
            csyncUrl,
            csyncApiKey,
            csyncHttpVersion,
            csyncIgnoreBadTls,
            courierUrl,
            courierApiKey,
            courierHttpVersion,
            courierIgnoreBadTls,
            blobRateLimitBypassKey,
            blobRateLimitBypassHostname,
            adminPasswords,
            // modServiceDid,
            ...stripUndefineds(overrides ?? {}),
        })
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
        return this.assignedPort || this.cfg.port;
    }

    get debugMode() {
        return !!this.cfg.debugMode;
    }

    get dataplaneHttpVersion(): '1.1' | '2' | undefined {
        return this.cfg.dataplaneHttpVersion;
    }

    get dataplaneIgnoreBadTls() {
        return this.cfg.dataplaneIgnoreBadTls
    }

    get adminPasswords() {
        return this.cfg.adminPasswords
    }

    get modServiceDid() {
        return this.cfg.modServiceDid
    }

    get publicUrl() {
        return this.cfg.publicUrl
    }

    get cdnUrl() {
        return this.cfg.cdnUrl
    }

    get csyncUrl() {
        return this.cfg.csyncUrl;
    }

    get csyncHttpVersion() {
        return this.cfg.csyncHttpVersion;
    }

    get csyncIgnoreBadTls() {
        return this.cfg.csyncIgnoreBadTls;
    }

    get csyncApiKey() {
        return this.cfg.csyncApiKey;
    }
}

function stripUndefineds(
    obj: Record<string, unknown>,
): Record<string, unknown> {
    const result = {}
    Object.entries(obj).forEach(([key, val]) => {
        if (val !== undefined) {
            result[key] = val
        }
    })
    return result
}

function envList(str: string | undefined): string[] {
    if (str === undefined || str.length === 0) return []
    return str.split(',')
}