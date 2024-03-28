import { AtpAgent } from "./agent";

export class CodestashAgent extends AtpAgent {
    get org() {
        return this.api.org;
    }

    ping: typeof this.api.org.codestash.

        getRepo: typeof this.api.org.codestash.repo.getRepo = (params, opts) =>
            this.api.org.codestash.repo.getRepo(params, opts);
}