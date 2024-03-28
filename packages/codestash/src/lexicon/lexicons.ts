/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { LexiconDoc, Lexicons } from '@atproto/lexicon'

export const schemaDict = {
  OrgCodestashPing: {
    lexicon: 1,
    id: 'org.codestash.ping',
    defs: {
      main: {
        type: 'query',
        description: 'Ping the server.',
        parameters: {
          type: 'params',
          properties: {
            message: {
              type: 'string',
              description: 'Message to send for ping.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Response message from the server.',
              },
            },
          },
        },
      },
    },
  },
  OrgCodestashRepoDefs: {
    lexicon: 1,
    id: 'org.codestash.repo.defs',
    defs: {
      repository: {
        type: 'object',
        required: ['name', 'owner', 'description', 'createdAt', 'updatedAt'],
        properties: {
          name: {
            type: 'string',
          },
          owner: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          createdAt: {
            type: 'string',
            format: 'datetime',
          },
          updatedAt: {
            type: 'string',
            format: 'datetime',
          },
          defaultBranch: {
            type: 'string',
          },
          homepage: {
            type: 'string',
            format: 'uri',
          },
          languages: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          license: {
            type: 'string',
          },
          stars: {
            type: 'integer',
            minimum: 0,
          },
          forks: {
            type: 'integer',
            minimum: 0,
          },
          watchers: {
            type: 'integer',
            minimum: 0,
          },
        },
      },
      commit: {
        type: 'object',
        required: ['sha', 'message', 'author', 'timestamp'],
        properties: {
          sha: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
          author: {
            type: 'string',
          },
          timestamp: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
      branch: {
        type: 'object',
        required: ['name', 'commitSha'],
        properties: {
          name: {
            type: 'string',
          },
          commitSha: {
            type: 'string',
          },
        },
      },
      issue: {
        type: 'object',
        required: ['title', 'author', 'createdAt'],
        properties: {
          title: {
            type: 'string',
          },
          author: {
            type: 'string',
          },
          createdAt: {
            type: 'string',
            format: 'datetime',
          },
          updatedAt: {
            type: 'string',
            format: 'datetime',
          },
          status: {
            type: 'string',
          },
          labels: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      pullRequest: {
        type: 'object',
        required: ['title', 'author', 'createdAt', 'updatedAt', 'status'],
        properties: {
          title: {
            type: 'string',
          },
          author: {
            type: 'string',
          },
          createdAt: {
            type: 'string',
            format: 'datetime',
          },
          updatedAt: {
            type: 'string',
            format: 'datetime',
          },
          status: {
            type: 'string',
          },
          mergeable: {
            type: 'boolean',
          },
          labels: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  OrgCodestashRepoGetRepo: {
    lexicon: 1,
    id: 'org.codestash.repo.getRepo',
    defs: {
      main: {
        type: 'query',
        description: 'Get detailed information about a repository.',
        parameters: {
          type: 'params',
          required: ['repo'],
          properties: {
            repo: {
              type: 'string',
              format: 'at-identifier',
              description: 'Handle or DID of repository to fetch.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'ref',
            ref: 'lex:org.codestash.repo.defs#repository',
          },
        },
      },
    },
  },
}
export const schemas: LexiconDoc[] = Object.values(schemaDict) as LexiconDoc[]
export const lexicons: Lexicons = new Lexicons(schemas)
export const ids = {
  OrgCodestashPing: 'org.codestash.ping',
  OrgCodestashRepoDefs: 'org.codestash.repo.defs',
  OrgCodestashRepoGetRepo: 'org.codestash.repo.getRepo',
}
