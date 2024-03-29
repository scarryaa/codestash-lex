import { AtUri, INVALID_HANDLE, normalizeDatetimeAlways } from '@atproto/syntax';
import { ProfileViewerState } from "../hydration/actor";
import { HydrationState } from "../hydration/hydrator";
import { ImageUriBuilder } from "../image/uri";
import { UserProfileBasic, UserProfileDetailed } from "../lexicon/types/org/codestash/actor/defs";
import { cidFromBlobJson } from './util';
import { ids } from '../lexicon/lexicons';

export class Views {
    constructor(public imgUriBuilder: ImageUriBuilder) { }

    // Actor

    actorIsTakendown(did: string, state: HydrationState): boolean {
        if (state.actors?.get(did)?.takedownRef) return true
        return false
    }

    profileDetailed(
        did: string,
        state: HydrationState,
    ): UserProfileDetailed | undefined {
        const actor = state.actors?.get(did)
        if (!actor) return
        const baseView = this.profile(did, state)
        if (!baseView) return
        const profileAggs = state.profileAggs?.get(did)
        return {
            ...baseView,
            banner: actor.profile?.banner
                ? this.imgUriBuilder.getPresetUri(
                    'banner',
                    did,
                    cidFromBlobJson(actor.profile.banner),
                )
                : undefined,
            followersCount: profileAggs?.followers,
            followsCount: profileAggs?.follows,
        }
    }

    profile(did: string, state: HydrationState): UserProfileBasic | undefined {
        const actor = state.actors?.get(did)
        if (!actor) return
        const basicView = this.profileBasic(did, state)
        if (!basicView) return
        return {
            ...basicView,
            description: actor.profile?.description || undefined,
            indexedAt: actor.sortedAt?.toISOString(),
        }
    }

    profileBasic(
        did: string,
        state: HydrationState,
    ): UserProfileBasic | undefined {
        const actor = state.actors?.get(did)
        if (!actor) return
        const profileUri = AtUri.make(
            did,
            ids.OrgCodestashActorProfile,
            'self',
        ).toString()
        return {
            did,
            handle: actor.handle ?? INVALID_HANDLE,
            avatar: actor.profile?.avatar
                ? this.imgUriBuilder.getPresetUri(
                    'avatar',
                    did,
                    cidFromBlobJson(actor.profile.avatar),
                )
                : undefined,
            bio: actor.profile?.bio,
        }
    }

    profileViewer(
        did: string,
        state: HydrationState,
    ): ProfileViewerState | undefined {
        const viewer = state.profileViewers?.get(did)
        if (!viewer) return
        return {
            following: viewer.following ? viewer.following : undefined,
            followedBy: viewer.followedBy ? viewer.followedBy : undefined,
        }
    }

    //....
}