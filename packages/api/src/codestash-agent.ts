import { AtpAgent } from "./agent";

export class CodestashAgent extends AtpAgent {
    clone() {
        const inst = new CodestashAgent({
            service: this.service,
        })
        this.copyInto(inst)
        return inst
    }

    get org() {
        return this.api.org;
    }

    ping: typeof this.api.org.codestash.ping = (params, opts) =>
        this.api.org.codestash.ping(params, opts);

    getProfile: typeof this.api.org.codestash.actor.getProfile = (params, opts) =>
        this.api.org.codestash.actor.getProfile(params, opts);

    copyInto(inst: AtpAgent) {
        inst.session = this.session
        inst.labelersHeader = this.labelersHeader
        inst.proxyHeader = this.proxyHeader
        inst.pdsUrl = this.pdsUrl
        inst.api.xrpc.uri = this.pdsUrl || this.service
    }
}