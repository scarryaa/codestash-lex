import { AtpAgent } from "./agent";

export class CodestashAgent extends AtpAgent {
    get org() {
        return this.api.org;
    }

    ping: typeof this.api.org.codestash.ping = (params, opts) =>
        this.api.org.codestash.ping(params, opts);

    getRepo: typeof this.api.org.codestash.repo.getRepository = (params, opts) =>
        this.api.org.codestash.repo.getRepository(params, opts);
}