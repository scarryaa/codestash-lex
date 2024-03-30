import { Server } from '../lexicon';
import comAtproto from './com/atproto';
import appCodestash from './org/codestash';
import AppContext from '../context';

export default function (server: Server, ctx: AppContext) {
  comAtproto(server, ctx);
  appCodestash(server, ctx);
  return server;
}
