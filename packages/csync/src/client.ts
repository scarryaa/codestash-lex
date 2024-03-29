import {
    Interceptor,
    PromiseClient,
    createPromiseClient,
} from '@connectrpc/connect'
import {
    ConnectTransportOptions,
    createConnectTransport,
} from '@connectrpc/connect-node'
import { Service } from './proto/csync_connect'

export type CsyncClient = PromiseClient<typeof Service>

export const createClient = (opts: ConnectTransportOptions): CsyncClient => {
    const transport = createConnectTransport(opts)
    return createPromiseClient(Service, transport)
}

export const authWithApiKey =
    (apiKey: string): Interceptor =>
        (next) =>
            (req) => {
                req.header.set('authorization', `Bearer ${apiKey}`)
                return next(req)
            }
