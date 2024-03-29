import { IdResolver } from "@atproto/identity";
import { Database } from "../db";
import { ConnectRouter } from "@connectrpc/connect";
import repository from "./repository";
import { Service } from "../../../proto/codestash_connect";

export default (db: Database, idResolver: IdResolver) =>
    (router: ConnectRouter) =>
        router.service(Service, {
            ...repository(db),
        })