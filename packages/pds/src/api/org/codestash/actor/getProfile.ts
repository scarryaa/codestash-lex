import { Server } from '../../../../lexicon';
import AppContext from '../../../../context';
import { OutputSchema } from '../../../../lexicon/types/org/codestash/actor/getProfile';
import {
  LocalViewer,
  LocalRecords,
  handleReadAfterWrite,
} from '../../../../read-after-write';
import { pipethrough } from '../../../../pipethrough';

const METHOD_NSID = 'org.codestash.actor.getProfile';

export default function (server: Server, ctx: AppContext) {
  const { codestashAppView } = ctx.cfg;
  if (!codestashAppView) return;
  server.org.codestash.actor.getProfile({
    auth: ctx.authVerifier.access,
    handler: async ({ req, auth }) => {
      const requester = auth.credentials.did;
      const res = await pipethrough(ctx, req, requester);
      if (!requester) {
        return res;
      }
      return handleReadAfterWrite(
        ctx,
        METHOD_NSID,
        requester,
        res,
        getProfileMunge,
      );
    },
  });
}

const getProfileMunge = async (
  localViewer: LocalViewer,
  original: OutputSchema,
  local: LocalRecords,
  requester: string,
): Promise<OutputSchema> => {
  if (!local.profile) return original;
  if (original.did !== requester) return original;
  return localViewer.updateProfileDetailed(original, local.profile.record);
};
