import pinoHttp from 'pino-http'
import { subsystemLogger } from '@atproto/common'

export const dbLogger: ReturnType<typeof subsystemLogger> =
    subsystemLogger('csync:db')
export const httpLogger: ReturnType<typeof subsystemLogger> =
    subsystemLogger('csync')

export const loggerMiddleware = pinoHttp({
    logger: httpLogger,
    redact: {
        paths: ['req.headers.authorization'],
    },
    serializers: {
        err: (err) => {
            return {
                code: err?.code,
                message: err?.message,
            }
        },
    },
})
