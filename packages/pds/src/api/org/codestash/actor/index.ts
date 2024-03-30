import { Server } from '../../../../lexicon';
import AppContext from '../../../../context';

import getProfile from './getProfile';

export default function (server: Server, ctx: AppContext) {
  getProfile(server, ctx);
}
