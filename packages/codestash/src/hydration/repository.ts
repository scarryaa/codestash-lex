import { DataPlaneClient } from '../data-plane/client';
import { Repository } from '../lexicon/types/org/codestash/repo/defs';
import { GetRepositoriesResponse } from '../proto/codestash_pb';
import { HydrationMap, parseString, safeTakedownRef } from './util';
import simpleGit, { SimpleGit } from 'simple-git';

export type Repositories = HydrationMap<Repository>;

export class RepositoryHydrator {
    git: SimpleGit;

    constructor(public dataplane: DataPlaneClient) {
        // Initialize the simple-git instance
        this.git = simpleGit();
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

    // async cloneRepositories(repos: Repository[]): Promise<void[]> {
    //     const clonePromises = repos.map(async (repo) => {
    //         try {
    //             // Perform the actual cloning operation using simple-git
    //             console.log(`Cloning repository from ${repo.url} to ${repo.localPath}...`);
    //             await this.git.clone(repo.url, "localPath");
    //             console.log('Repository cloned successfully.');
    //         } catch (error) {
    //             console.error(`Error cloning repository ${repo.url}:`, error);
    //             throw error;
    //         }
    //     });

    //     return Promise.all(clonePromises);
    // }

    // async fetchLatestCommits(repos: Repository[]): Promise<Repositories> {
    //     const updatedRepos: Repositories = new HydrationMap<Repository>();

    //     for (const repo of repos) {
    //         try {
    //             // Fetch the latest commit hash using simple-git
    //             const logResult = await this.git.log({ repo: repo.localPath, maxCount: 1 });
    //             const latestCommitHash = logResult.latest?.hash;

    //             // Update the repo object with the latest commit hash
    //             const updatedRepo: Repository = { ...repo, latestCommitHash };
    //             updatedRepos.set(repo.url, updatedRepo);
    //         } catch (error) {
    //             console.error(`Error fetching latest commit for repository ${repo.url}:`, error);
    //         }
    //     }

    //     return updatedRepos;
    // }

    async getDids(handleOrDids: string[]): Promise<(string | undefined)[]> {
        const handles = handleOrDids.filter((actor) => !actor.startsWith('did:'))
        const res = handles.length
            ? await this.dataplane.getDidsByHandles({ handles })
            : { dids: [] }
        const didByHandle = handles.reduce((acc, cur, i) => {
            const did = res.dids[i]
            if (did && did.length > 0) {
                return acc.set(cur, did)
            }
            return acc
        }, new Map() as Map<string, string>)
        return handleOrDids.map((id) =>
            id.startsWith('did:') ? id : didByHandle.get(id),
        )
    }

    async getRepositories(uris: string[]): Promise<Repository[]> {
        try {
            const response: GetRepositoriesResponse = await this.dataplane.getRepositories({ uris });

            // Access the list of records from the response
            const recordsList = response.repositories;

            // Map the fetched data to Repository objects
            const repositories: Repository[] = recordsList.map(repository => ({
                name: repository.name,
                owner: repository.owner,
                description: repository.description,
                createdAt: repository.createdAt ? repository.createdAt.toJsonString() : '',
                updatedAt: repository.updatedAt ? repository.updatedAt.toJsonString() : '',
                url: repository.url,
                defaultBranch: repository.defaultBranch || '',
                forks: repository.forks || 0,
                homepage: repository.homepage || '',
                languages: repository.languages || [],
                license: repository.license || '',
                stars: repository.stars || 0,
                watchers: repository.watchers || 0
            }));



            return repositories;
        } catch (error) {
            console.error('Error fetching repositories:', error);
            throw error;
        }
    }
}