import { IdResolver } from "@atproto/identity";
import { Database } from "../db";
import { ConnectRouter } from "@connectrpc/connect";
import profile from './profile'
import { Service } from "../../../proto/codestash_connect";

export default (db: Database, idResolver: IdResolver) =>
    (router: ConnectRouter) =>
        router.service(Service, {
            ...profile(db),
        })