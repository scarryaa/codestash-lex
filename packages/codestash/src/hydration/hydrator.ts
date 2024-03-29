import { DataPlaneClient } from '../data-plane/client';
import { Repositories } from './repository';
import { RepositoryHydrator } from './repository';
import { HydrationMap, parseString } from './util';

export class HydrateCtx {
    viewer = this.vals.viewer;
    includeTakedowns = this.vals.includeTakedowns;

    constructor(private vals: HydrateCtxVals) { }

    copy<V extends Partial<HydrateCtxVals>>(vals?: V): HydrateCtx & V {
        return new HydrateCtx({ ...this.vals, ...vals }) as HydrateCtx & V
    }
}

export type HydrateCtxVals = {
    viewer: string | null;
    includeTakedowns?: boolean;
}

export type HydrationState = {
    ctx?: HydrateCtx; // Contextual information for Git operations
    repositories: Repositories; // Repositories
    // contributors?: Contributor[]; // Contributors or actors in the repository
    // commits?: Commit[]; // Commits made to the repository
    // branches?: Branch[]; // Branches in the repository
    // tags?: Tag[]; // Tags assigned to specific commits
    // remotes?: Remote[]; // Remote repositories linked to this repository
    // issues?: Issue[]; // Issues associated with the repository
    // pullRequests?: PullRequest[]; // Pull requests made to the repository
    // forks?: Fork[]; // Forks of the repository
    // watchers?: Watcher[]; // Users watching or following the repository
    // stargazers?: Stargazer[]; // Users who have starred the repository
    // subscribers?: Subscriber[]; // Users subscribed to notifications for the repository
    // releases?: Release[]; // Releases published for the repository
    // wiki?: WikiPage[]; // Wiki pages associated with the repository
    // license?: License; // License information for the repository
    // topics?: string[]; // Topics or tags associated with the repository
    // dependencies?: Dependency[]; // Dependencies of the repository
    // settings?: RepositorySettings; // Settings/configuration for the repository
    // activities?: Activity[]; // Recent activities or events related to the repository
}

export class Hydrator {
    repository: RepositoryHydrator;

    constructor(public dataplane: DataPlaneClient) {
        this.repository = new RepositoryHydrator(dataplane);
    }

    async getRepoRevSafe(url: string | null): Promise<string | null> {
        if (!url) return null
        try {
            const res = await this.dataplane.getLatestRev({ repositoryUrl: url })
            return parseString(res.rev) ?? null
        } catch {
            return null
        }
    }

    async hydrateRepositories(
        uris: string[],
        ctx: HydrateCtx,
    ): Promise<HydrationState> {
        const viewer = ctx.viewer;
        if (!viewer) {
            return {
                repositories: new HydrationMap(),
            };
        }

        const [repositories] = await Promise.all([
            this.repository.getRepositories(uris)
        ])

        const filteredRepositories: Repositories = new HydrationMap();
        repositories.forEach((repository) => {
            if (repository?.owner === viewer) {
                filteredRepositories.set(repository.url, repository);
            }
        });

        return {
            ctx,
            repositories: filteredRepositories,
        };
    }

    async createContext(vals: HydrateCtxVals) {
        return new HydrateCtx({
            viewer: vals.viewer,
            includeTakedowns: vals.includeTakedowns,
        })
    }
}
