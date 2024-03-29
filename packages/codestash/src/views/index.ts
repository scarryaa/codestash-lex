import { HydrationState } from "../hydration/hydrator";
import { ImageUriBuilder } from "../image/uri";
import { Repository } from "../lexicon/types/org/codestash/repo/defs";

export class Views {
    constructor(public imgUriBuilder: ImageUriBuilder) { }

    // Repository

    repositoryIsTakenDown(url: string, state: HydrationState): boolean {
        if (state.repositories?.get(url)?.takedownRef) return true;
        return false;
    }

    repository(uri: string, state: HydrationState): Repository | undefined {
        const repository = state.repositories.get(uri);
        if (!repository) return;
        const basicView = this.repositoryBasic(uri, state);
        if (!basicView) return;
        return {
            ...basicView,
            description: repository.description,
            indexedAt: repository.sortedAt,
        }
    }

    repositoryBasic(
        uri: string,
        state: HydrationState
    ): Repository | undefined {
        const repository = state.repositories.get(uri);
        if (!repository) return;

        return {
            url: uri,
            createdAt: repository.createdAt,
            description: repository.description,
            name: repository.name,
            owner: repository.owner,
            updatedAt: repository.updatedAt,
            defaultBranch: repository.defaultBranch,
            forks: repository.forks,
            homepage: repository.homepage,
            languages: repository.languages,
            license: repository.license,
            stars: repository.stars,
            watcher: repository.watchers
        }
    }

    //....
}