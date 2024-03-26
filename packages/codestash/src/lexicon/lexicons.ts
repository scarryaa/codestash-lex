import { LexiconDoc, Lexicons } from '@atproto/lexicon'

export const schemaDict = {
    ComAtprotoRepoDefs: {
      lexicon: 1,
      id: 'org.codestash.repo.defs',
      defs: {
        statusAttr: {
          type: 'object',
          required: ['status'],
          properties: {
            status: {
              type: 'string',
              description: 'Status of the repository',
              enum: ['active', 'archived', 'deleted'],
            },
          },
        },
        repository: {
          type: 'object',
          required: ['name', 'owner', 'createdAt', 'updatedAt'],
          properties: {
            name: { type: 'string', description: 'Name of the repository' },
            owner: { type: 'string', description: 'Owner of the repository' },
            description: { type: 'string', description: 'Description of the repository' },
            createdAt: { type: 'string', format: 'datetime', description: 'Creation date of the repository' },
            updatedAt: { type: 'string', format: 'datetime', description: 'Last update date of the repository' },
            defaultBranch: { type: 'string', description: 'Default branch of the repository' },
            homepage: { type: 'string', format: 'uri', description: 'Homepage URL of the repository' },
            language: { type: 'string', description: 'Primary programming language of the repository' },
            license: { type: 'string', description: 'License of the repository' },
            stars: { type: 'integer', minimum: 0, description: 'Number of stars/favorites' },
            forks: { type: 'integer', minimum: 0, description: 'Number of forks' },
            watchers: { type: 'integer', minimum: 0, description: 'Number of watchers' },
          },
        },
        commit: {
          type: 'object',
          required: ['sha', 'message', 'author', 'timestamp'],
          properties: {
            sha: { type: 'string', description: 'Commit SHA' },
            message: { type: 'string', description: 'Commit message' },
            author: { type: 'string', description: 'Author of the commit' },
            timestamp: { type: 'string', format: 'datetime', description: 'Timestamp of the commit' },
          },
        },
        branch: {
          type: 'object',
          required: ['name', 'commitSHA'],
          properties: {
            name: { type: 'string', description: 'Name of the branch' },
            commitSHA: { type: 'string', description: 'SHA of the commit associated with the branch' },
          },
        },
        issue: {
          type: 'object',
          required: ['title', 'author', 'createdAt'],
          properties: {
            title: { type: 'string', description: 'Title of the issue' },
            author: { type: 'string', description: 'Author of the issue' },
            createdAt: { type: 'string', format: 'datetime', description: 'Creation date of the issue' },
            updatedAt: { type: 'string', format: 'datetime', description: 'Last update date of the issue' },
            status: { type: 'string', description: 'Status of the issue' },
            labels: { type: 'array', items: { type: 'string' }, description: 'Labels associated with the issue' },
          },
        },
        pullRequest: {
          type: 'object',
          required: ['title', 'author', 'createdAt', 'updatedAt', 'status'],
          properties: {
            title: { type: 'string', description: 'Title of the pull request' },
            author: { type: 'string', description: 'Author of the pull request' },
            createdAt: { type: 'string', format: 'datetime', description: 'Creation date of the pull request' },
            updatedAt: { type: 'string', format: 'datetime', description: 'Last update date of the pull request' },
            status: { type: 'string', description: 'Status of the pull request' },
            mergeable: { type: 'boolean', description: 'Mergeable status of the pull request' },
            labels: { type: 'array', items: { type: 'string' }, description: 'Labels associated with the pull request' },
          },
        },
      },
    },
  };
  
export const schemas: LexiconDoc[] = Object.values(schemaDict) as LexiconDoc[];
export const lexicons: Lexicons = new Lexicons(schemas);