import { subsystemLogger } from '@atproto/common'

export const logger: ReturnType<typeof subsystemLogger> =
    subsystemLogger('codestash:image')

export default logger
