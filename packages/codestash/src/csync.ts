import { Service } from './proto/csync_connect'
import {
    Code,
    ConnectError,
    PromiseClient,
    createPromiseClient,
    Interceptor,
} from '@connectrpc/connect'
import {
    createConnectTransport,
    ConnectTransportOptions,
} from '@connectrpc/connect-node'

export type CsyncClient = PromiseClient<typeof Service>

export const createCsyncClient = (
    opts: ConnectTransportOptions,
): CsyncClient => {
    const transport = createConnectTransport(opts)
    return createPromiseClient(Service, transport)
}

export { Code }

export const isBsyncError = (
    err: unknown,
    code?: Code,
): err is ConnectError => {
    if (err instanceof ConnectError) {
        return !code || err.code === code
    }
    return false
}

export const authWithApiKey =
    (apiKey: string): Interceptor =>
        (next) =>
            (req) => {
                req.header.set('authorization', `Bearer ${apiKey}`)
                return next(req)
            }
