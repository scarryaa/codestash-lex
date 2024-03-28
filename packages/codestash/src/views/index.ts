import { HydrationState } from "../hydration/hydrator";
import { Repository } from "../lexicon/types/org/codestash/repo/defs";

export class Views {
    constructor() { }
    // public imgUriBuilder: ImageUriBuilder

    // Repository

    repositoryIsTakenDown(did: string, state: HydrationState): boolean {
        if (state) return true;
        // TODO complete this
        return false;
    }

    repository(did: string, state: HydrationState): Repository | undefined {
        // const actor = ;
        // TODO complete this
    }

    //....
}