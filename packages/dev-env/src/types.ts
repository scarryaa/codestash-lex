import * as pds from '@atproto/pds';
import * as codestash from '@codestash-lex/codestash';
import * as bsync from '@atproto/bsync';
import * as ozone from '@atproto/ozone';
import { ExportableKeypair, Keypair } from '@atproto/crypto';

export type PlcConfig = {
  port?: number;
  version?: string;
};

export type PdsConfig = Partial<pds.ServerEnvironment> & {
  didPlcUrl: string;
  migration?: string;
};

export type CodestashConfig = Partial<codestash.ServerConfig> & {
  plcUrl: string;
  repoProvider: string;
  dbPostgresUrl: string;
  dbPostgresSchema: string;
  redisHost: string;
  pdsPort: number;
  migration?: string;
};

export type BsyncConfig = Partial<bsync.ServerEnvironment> & {
  dbUrl: string;
};

export type OzoneConfig = Partial<ozone.OzoneEnvironment> & {
  plcUrl: string;
  appviewUrl: string;
  appviewDid: string;
  dbPostgresUrl: string;
  migration?: string;
  signingKey?: ExportableKeypair;
  imgInvalidator?: ozone.ImageInvalidator;
};

export type TestServerParams = {
  dbPostgresUrl: string;
  dbPostgresSchema: string;
  pds: Partial<PdsConfig>;
  plc: Partial<PlcConfig>;
  bsky: Partial<CodestashConfig>;
  ozone: Partial<OzoneConfig>;
};

export type DidAndKey = {
  did: string;
  key: Keypair;
};
