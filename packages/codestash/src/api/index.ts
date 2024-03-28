import { AppContext } from '../context';
import { Server } from '../lexicon';
import getRepository from './org/codestash/repo/getRepo';

export * as health from './health';

export default function (server: Server, ctx: AppContext) {
    // org.codestash
    getRepository(server, ctx);
}