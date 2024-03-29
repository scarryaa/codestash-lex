import assert from 'node:assert'
import { envInt, envStr, envList, envBool } from '@atproto/common'

export const envToCfg = (env: ServerEnvironment): ServerConfig => {
    const serviceCfg: ServerConfig['service'] = {
        port: env.port ?? 2585,
        version: env.version ?? 'unknown',
        longPollTimeoutMs: env.longPollTimeoutMs ?? 10000,
    }

    assert(env.dbUrl, 'missing postgres url')
    const dbCfg: ServerConfig['db'] = {
        url: env.dbUrl,
        schema: env.dbSchema,
        poolSize: env.dbPoolSize,
        poolMaxUses: env.dbPoolMaxUses,
        poolIdleTimeoutMs: env.dbPoolIdleTimeoutMs,
        migrate: env.dbMigrate,
    }

    assert(env.apiKeys.length > 0, 'missing api keys')
    const authCfg: ServerConfig['auth'] = {
        apiKeys: new Set(env.apiKeys),
    }

    return {
        service: serviceCfg,
        db: dbCfg,
        auth: authCfg,
    }
}

export type ServerConfig = {
    service: ServiceConfig
    db: DatabaseConfig
    auth: AuthConfig
}

type ServiceConfig = {
    port: number
    version?: string
    longPollTimeoutMs: number
}

type DatabaseConfig = {
    url: string
    schema?: string
    poolSize?: number
    poolMaxUses?: number
    poolIdleTimeoutMs?: number
    migrate?: boolean
}

type AuthConfig = {
    apiKeys: Set<string>
}

export const readEnv = (): ServerEnvironment => {
    return {
        // service
        port: envInt('CSYNC_PORT'),
        version: envStr('CSYNC_VERSION'),
        longPollTimeoutMs: envInt('CSYNC_LONG_POLL_TIMEOUT_MS'),
        // database
        dbUrl: envStr('CSYNC_DB_POSTGRES_URL'),
        dbSchema: envStr('CSYNC_DB_POSTGRES_SCHEMA'),
        dbPoolSize: envInt('CSYNC_DB_POOL_SIZE'),
        dbPoolMaxUses: envInt('CSYNC_DB_POOL_MAX_USES'),
        dbPoolIdleTimeoutMs: envInt('CSYNC_DB_POOL_IDLE_TIMEOUT_MS'),
        dbMigrate: envBool('CSYNC_DB_MIGRATE'),
        // secrets
        apiKeys: envList('CSYNC_API_KEYS'),
    }
}

export type ServerEnvironment = {
    // service
    port?: number
    version?: string
    longPollTimeoutMs?: number
    // database
    dbUrl?: string
    dbSchema?: string
    dbPoolSize?: number
    dbPoolMaxUses?: number
    dbPoolIdleTimeoutMs?: number
    dbMigrate?: boolean
    // secrets
    apiKeys: string[]
}
