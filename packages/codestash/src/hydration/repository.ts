import { DataPlaneClient } from '../data-plane/client';
import { HydrationMap, parseString, safeTakedownRef } from './util';
import simpleGit, { SimpleGit } from 'simple-git';

export type GitRepo = {
    url: string;
    localPath: string;
    latestCommitHash?: string;
};

export type GitRepos = HydrationMap<GitRepo>;

export class GitRepoHydrator {
    git: SimpleGit;

    constructor(public dataplane: DataPlaneClient) {
        // Initialize the simple-git instance
        this.git = simpleGit();
    }

    async cloneRepositories(repos: GitRepo[]): Promise<void[]> {
        const clonePromises = repos.map(async (repo) => {
            try {
                // Perform the actual cloning operation using simple-git
                console.log(`Cloning repository from ${repo.url} to ${repo.localPath}...`);
                await this.git.clone(repo.url, repo.localPath);
                console.log('Repository cloned successfully.');
            } catch (error) {
                console.error(`Error cloning repository ${repo.url}:`, error);
                throw error;
            }
        });

        return Promise.all(clonePromises);
    }

    async fetchLatestCommits(repos: GitRepo[]): Promise<GitRepos> {
        const updatedRepos: GitRepos = new HydrationMap<GitRepo>();

        for (const repo of repos) {
            try {
                // Fetch the latest commit hash using simple-git
                const logResult = await this.git.log({ repo: repo.localPath, maxCount: 1 });
                const latestCommitHash = logResult.latest?.hash;

                // Update the repo object with the latest commit hash
                const updatedRepo = { ...repo, latestCommitHash };
                updatedRepos.set(repo.url, updatedRepo);
            } catch (error) {
                console.error(`Error fetching latest commit for repository ${repo.url}:`, error);
            }
        }

        return updatedRepos;
    }
}