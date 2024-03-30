import http from 'http';
import events from 'events';
import express from 'express';
import { ConnectRouter } from '@connectrpc/connect';
import { expressConnectMiddleware } from '@connectrpc/connect-express';
import { Database } from '../server/db';
import { Service } from '../../proto/csync_connect';
import assert from 'assert';

export class MockCsync {
  constructor(public server: http.Server) {}

  static async create(db: Database, port: number) {
    const app = express();
    const routes = createRoutes(db);
    app.use(expressConnectMiddleware({ routes }));
    const server = app.listen(port);
    await events.once(server, 'listening');
    return new MockCsync(server);
  }

  async destroy() {
    return new Promise<void>((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

const createRoutes = (db: Database) => (router: ConnectRouter) =>
  router.service(Service, {
    async scanMuteOperations() {
      throw new Error('not implemented');
    },

    async ping() {
      return {};
    },
  });
