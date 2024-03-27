import { ErrorResponseBody, defaultFetchHandler, errorResponseBody } from "@atproto/xrpc";
import { AtpBaseClient, AtpServiceClient } from "./client"
import { AtpAgentFetchHandler, AtpAgentFetchHandlerResponse, AtpAgentGlobalOpts, AtpAgentOpts, AtpPersistSessionHandler, AtpSessionData } from "./types";

export class AtpAgent {
    service: URL;
    api: AtpServiceClient;
    session?: AtpSessionData;
    labelersHeader: string[] = [];
    proxyHeader: string | undefined;
    pdsUrl: URL | undefined;

    protected _baseClient: AtpBaseClient;
    protected _persistSession?: AtpPersistSessionHandler;
    protected _refreshSessionPromise: Promise<void> | undefined;

    get com() {
        return this.api.org;
    }

    static fetch: AtpAgentFetchHandler | undefined = defaultFetchHandler;

    static configure(opts: AtpAgentGlobalOpts) {
        if (opts.fetch) {
            AtpAgent.fetch = opts.fetch;
        }
    }

    constructor(opts: AtpAgentOpts) {
        this.service = opts.service instanceof URL ? opts.service : new URL(opts.service);
        this._persistSession = opts.persistSession;

        this._baseClient = new AtpBaseClient();
        this._baseClient.xrpc.fetch = this._fetch.bind(this);
        this.api = this._baseClient.service(opts.service);
    }

    private _addHeaders(reqHeaders: Record<string, string>) {
        if (!reqHeaders.authorization && this.session?.accessJwt) {
            reqHeaders = {
                ...reqHeaders,
                authorization: `Bearer ${this.session.accessJwt}`,
            }
        }
        if (this.proxyHeader) {
            reqHeaders = {
                ...reqHeaders,
                'atproto-proxy': this.proxyHeader,
            }
        }
        reqHeaders = {
            ...reqHeaders
        }
        return reqHeaders
    }

    private async _fetch(
        reqUri: string,
        reqMethod: string,
        reqHeaders: Record<string, string>,
        reqBody: any,
    ): Promise<AtpAgentFetchHandlerResponse> {
        if (!AtpAgent.fetch) {
            throw new Error('AtpAgent fetch() method not configured')
        }

        // wait for any active session-refreshes to finish
        await this._refreshSessionPromise

        // send the request
        let res = await AtpAgent.fetch(
            reqUri,
            reqMethod,
            this._addHeaders(reqHeaders),
            reqBody,
        )

        // handle session-refreshes as needed
        if (isErrorResponse(res, ['ExpiredToken']) && this.session?.refreshJwt) {
            // attempt refresh
            await this.refreshSession()

            // resend the request with the new access token
            res = await AtpAgent.fetch(
                reqUri,
                reqMethod,
                this._addHeaders(reqHeaders),
                reqBody,
            )
        }

        return res
    }

    async refreshSession() {
        if (this._refreshSessionPromise) {
            return this._refreshSessionPromise
        }
        this._refreshSessionPromise = this._refreshSessionInner()
        try {
            await this._refreshSessionPromise
        } finally {
            this._refreshSessionPromise = undefined
        }
    }

    private async _refreshSessionInner() {
        if (!AtpAgent.fetch) {
            throw new Error('AtpAgent fetch() method not configured')
        }
        if (!this.session?.refreshJwt) {
            return
        }
    }
}

function isErrorResponse(
    res: AtpAgentFetchHandlerResponse,
    errorNames: string[],
): boolean {
    if (res.status !== 400) {
        return false
    }
    if (!isErrorObject(res.body)) {
        return false
    }
    return (
        typeof res.body.error === 'string' && errorNames.includes(res.body.error)
    )
}

function isErrorObject(v: unknown): v is ErrorResponseBody {
    return errorResponseBody.safeParse(v).success
}