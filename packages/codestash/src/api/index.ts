import { AppContext } from '../context';
import { Server } from '../lexicon';
import getProfile from './org/codestash/actor/getProfile';

export * as health from './health';

export default function (server: Server, ctx: AppContext) {
    // org.codestash
    getProfile(server, ctx);
    return server;
}