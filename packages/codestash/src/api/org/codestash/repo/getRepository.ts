import { InvalidRequestError } from "@atproto/xrpc-server";
import { AppContext } from "../../../../context";
import { Server } from "../../../../lexicon";
import { createPipeline, noRules } from "../../../../pipeline";
import { HydrateCtx, HydrationState, Hydrator } from "../../../../hydration/hydrator";
import { Views } from "../../../../views";

export default function (server: Server, ctx: Context) {
    const getRepo = createPipeline(skeleton, hydration, noRules, presentation)
    server.org.codestash.repo.getRepo({
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ auth, params, req }) => {
            const { viewer, includeTakedowns } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({
                labelers,
                viewer,
                includeTakedowns
            });

            const result = await getRepo({ ...params, hydrateCtx }, ctx);
            // TODO fix
            const repoRev = await ctx.hydrator.xx.getRepoRevSafe(viewer);

            return {
                encoding: 'application/json',
                body: result,
                headers: resHeaders({
                    repoRev,
                    labelers: hydrateCtx.labelers,
                }),
            }
        },
    })
}

const skeleton = async (input: {
    ctx: Context
    params: Params
}): Promise<SkeletonState> => {
    const { ctx, params } = input;
    const [did] = await ctx.hydrator.repo.getDids([params.repository]);
    if (!did) {

        throw new InvalidRequestError("Repository not found")
    }
    return { did };
}

const hydration = async (input: {
    ctx: Context
    params: Params
    skeleton: SkeletonState
}) => {
    // Logic to hydrate repository data
}

const presentation = (input: {
    ctx: Context
    params: Params
    skeleton: SkeletonState
    hydration: HydrationState
}) => {
    const { ctx, params, skeleton, hydration } = input;
    const repository = ctx.views.repositoryDetailed(skeleton.did, hydration);
    if (!repository) {
        throw new InvalidRequestError("Repository not found");
    } else if (
        !params.hydrateCtx.includeTakedowns &&
        ctx.views.repositoryIsTakenDown(skeleton.did, hydration)) {
        throw new InvalidRequestError(
            "Repository has been taken down",
            "RepositoryTakedown"
        )
    }
    return repository;
}

type Context = {
    hydrator: Hydrator,
    views: Views
}

type Params = {
    hydrateCtx: HydrateCtx
}

type SkeletonState = { did: string };