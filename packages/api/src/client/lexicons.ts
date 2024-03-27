/**
 * GENERATED CODE
 */

import { LexiconDoc, Lexicons } from '@atproto/lexicon';
export const schemaDict = {
OrgCodestashRepoDefs: {
  lexicon: 1,
  id: 'org.codestash.repo.defs',
  defs: {
    repository: {
      type: 'object',
      required: ["name","owner","description","createdAt","updatedAt"],
      properties: {
        name: {"type":"string"},
        owner: {"type":"string"},
        description: {"type":"string"},
        createdAt: {"type":"string","format":"datetime"},
        updatedAt: {"type":"string","format":"datetime"},
        defaultBranch: {"type":"string"},
        homepage: {"type":"string","format":"uri"},
        languages: {"type":"array","items":{"type":"string"}},
        license: {"type":"string"},
        stars: {"type":"integer","minimum":0},
        forks: {"type":"integer","minimum":0},
        watchers: {"type":"integer","minimum":0},
      },
    },
    commit: {
      type: 'object',
      required: ["sha","message","author","timestamp"],
      properties: {
        sha: {"type":"string"},
        message: {"type":"string"},
        author: {"type":"string"},
        timestamp: {"type":"string","format":"datetime"},
      },
    },
    branch: {
      type: 'object',
      required: ["name","commitSha"],
      properties: {
        name: {"type":"string"},
        commitSha: {"type":"string"},
      },
    },
    issue: {
      type: 'object',
      required: ["title","author","createdAt"],
      properties: {
        title: {"type":"string"},
        author: {"type":"string"},
        createdAt: {"type":"string","format":"datetime"},
        updatedAt: {"type":"string","format":"datetime"},
        status: {"type":"string"},
        labels: {"type":"array","items":{"type":"string"}},
      },
    },
    pullRequest: {
      type: 'object',
      required: ["title","author","createdAt","updatedAt","status"],
      properties: {
        title: {"type":"string"},
        author: {"type":"string"},
        createdAt: {"type":"string","format":"datetime"},
        updatedAt: {"type":"string","format":"datetime"},
        status: {"type":"string"},
        mergeable: {"type":"boolean"},
        labels: {"type":"array","items":{"type":"string"}},
      },
    },
  }
}};

export const schemas: LexiconDoc[] = Object.values(schemaDict) as LexiconDoc[];
export const lexicons: Lexicons = new Lexicons(schemas);
export const ids = {
    orgCodestashRepoDefs: 'org.codestash.repo.defs'
};
