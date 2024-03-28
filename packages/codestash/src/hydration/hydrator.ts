import { DataPlaneClient } from '../data-plane/client';
import { Repository } from './repo';

export class HydrateCtx {
    repository: Repository;
    viewer: string | null;
    includeTakedowns?: boolean;

    constructor(repository: Repository, viewer: string | null, includeTakedowns?: boolean) {
        this.repository = repository;
        this.viewer = viewer;
        this.includeTakedowns = includeTakedowns;
    }

    copy(viewer?: string | null, includeTakedowns?: boolean): HydrateCtx {
        return new HydrateCtx(this.repository, viewer ?? this.viewer, includeTakedowns ?? this.includeTakedowns);
    }
}

export type GitHydrateCtxVals = {
    repository: Repository;
    viewer: string | null;
    includeTakedowns?: boolean;
}


export type HydrationState = {
    ctx?: HydrateCtx; // Contextual information for Git operations
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
    constructor(public dataplane: DataPlaneClient) { }

    // org.codestash.repo.defs#repository
    async hydrateRepository(uri: string, includeTakedowns = false): Promise<Repository | undefined> {
        try {
            const repo = await this.getRepository(uri, includeTakedowns);
            return repo;
        } catch (error) {
            console.error('Error hydrating repo:', error);
            return undefined;
        }
    }

    private async getRepository(uri: string, includeTakedowns: boolean): Promise<Repository | undefined> {
        // Implement logic to fetch the repo from the data plane client
        // This method should handle fetching the repo data and returning it
        // If includeTakedowns is true, include takedown information in the repo object
        // Otherwise, exclude takedown information
        // Return undefined if the repo does not exist or if an error occurs
    }
}
