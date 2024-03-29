import { InvalidRequestError } from "@atproto/xrpc-server";
import { AppContext } from "../../../../context";
import { Server } from "../../../../lexicon";
import { createPipeline, noRules } from "../../../../pipeline";
import { QueryParams } from '../../../../lexicon/types/org/codestash/repo/getRepo'
import { HydrateCtx, HydrationState, Hydrator } from "../../../../hydration/hydrator";
import { Views } from "../../../../views";
import { DataPlaneClient } from "../../../../data-plane";
import { resHeaders } from "../../../utils";

export default function (server: Server, ctx: AppContext) {
    const getRepository = createPipeline(skeleton, hydration, noRules, presentation)
    server.org.codestash.repo.getRepo({
        // @ts-ignore TODO investigate this
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ auth, params, req }) => {
            const { viewer, includeTakedowns } = ctx.authVerifier.parseCreds(auth);
            const hydrateCtx = await ctx.hydrator.createContext({
                viewer,
                includeTakedowns,
            });

            const result = await getRepository({ ...params, hydrateCtx }, ctx);
            const repoRev = await ctx.hydrator.getRepoRevSafe(params.repository);

            return {
                encoding: 'application/json',
                body: result,
                headers: resHeaders({
                    repoRev,
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
    // Fetching repository ID based on repository URI
    const url = await ctx.dataplane.getURL({});
    if (!url) {
        throw new InvalidRequestError("Repository not found");
    }
    return { url: url.url };
}

const hydration = async (inputs: {
    ctx: Context
    params: Params
    skeleton: SkeletonState
}) => {
    const { ctx, params, skeleton } = inputs;
    // Hydrating repository details based on repository ID
    return await ctx.hydrator.hydrateRepositories(
        [skeleton.url],
        params.hydrateCtx.copy({ includeTakedowns: true }),
    );
}

const presentation = (input: {
    ctx: Context
    params: Params
    skeleton: SkeletonState
    hydration: HydrationState
}) => {
    const { ctx, params, skeleton, hydration } = input;
    // Fetching and validating repository details for presentation
    const repository = ctx.views.repository(skeleton.url, hydration);
    if (!repository) {
        throw new InvalidRequestError("Repository not found");
    } else if (
        !params.hydrateCtx.includeTakedowns &&
        ctx.views.repositoryIsTakenDown(skeleton.url, hydration)
    ) {
        throw new InvalidRequestError(
            "Repository has been taken down",
            "RepositoryTakedown"
        );
    }
    return repository;
}

// Typings
type Context = {
    dataplane: DataPlaneClient,
    hydrator: Hydrator,
    views: Views
}

type Params = QueryParams & {
    hydrateCtx: HydrateCtx;
}

type SkeletonState = { url: string };
