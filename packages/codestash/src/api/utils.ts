type ResHeaderOpts = {
    repoRev: string | null
}

export const CODESTASH_REPO_REV = 'Codestash-Repo-Rev'

export const resHeaders = (
    opts: Partial<ResHeaderOpts>,
): Record<string, string> => {
    const headers = {}
    if (opts.repoRev) {
        headers[CODESTASH_REPO_REV] = opts.repoRev
    }
    return headers
}

export const clearlyBadCursor = (cursor?: string) => {
    // hallmark of v1 cursor, highly unlikely in v2 cursors based on time or rkeys
    return !!cursor?.includes('::')
}
