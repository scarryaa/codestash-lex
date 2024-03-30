/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  Client as XrpcClient,
  ServiceClient as XrpcServiceClient,
} from '@atproto/xrpc';
import { schemas } from './lexicons';
import { CID } from 'multiformats/cid';
import * as OrgCodestashActorDefs from './types/org/codestash/actor/defs';
import * as OrgCodestashActorGetProfile from './types/org/codestash/actor/getProfile';
import * as OrgCodestashActorProfile from './types/org/codestash/actor/profile';
import * as OrgCodestashPing from './types/org/codestash/ping';
import * as ComAtprotoAdminDefs from './types/com/atproto/admin/defs';
import * as ComAtprotoAdminDeleteAccount from './types/com/atproto/admin/deleteAccount';
import * as ComAtprotoAdminDisableAccountInvites from './types/com/atproto/admin/disableAccountInvites';
import * as ComAtprotoAdminDisableInviteCodes from './types/com/atproto/admin/disableInviteCodes';
import * as ComAtprotoAdminEnableAccountInvites from './types/com/atproto/admin/enableAccountInvites';
import * as ComAtprotoAdminGetAccountInfo from './types/com/atproto/admin/getAccountInfo';
import * as ComAtprotoAdminGetAccountInfos from './types/com/atproto/admin/getAccountInfos';
import * as ComAtprotoAdminGetInviteCodes from './types/com/atproto/admin/getInviteCodes';
import * as ComAtprotoAdminGetSubjectStatus from './types/com/atproto/admin/getSubjectStatus';
import * as ComAtprotoAdminSendEmail from './types/com/atproto/admin/sendEmail';
import * as ComAtprotoAdminUpdateAccountEmail from './types/com/atproto/admin/updateAccountEmail';
import * as ComAtprotoAdminUpdateAccountHandle from './types/com/atproto/admin/updateAccountHandle';
import * as ComAtprotoAdminUpdateAccountPassword from './types/com/atproto/admin/updateAccountPassword';
import * as ComAtprotoAdminUpdateSubjectStatus from './types/com/atproto/admin/updateSubjectStatus';
import * as ComAtprotoIdentityGetRecommendedDidCredentials from './types/com/atproto/identity/getRecommendedDidCredentials';
import * as ComAtprotoIdentityRequestPlcOperationSignature from './types/com/atproto/identity/requestPlcOperationSignature';
import * as ComAtprotoIdentityResolveHandle from './types/com/atproto/identity/resolveHandle';
import * as ComAtprotoIdentitySignPlcOperation from './types/com/atproto/identity/signPlcOperation';
import * as ComAtprotoIdentitySubmitPlcOperation from './types/com/atproto/identity/submitPlcOperation';
import * as ComAtprotoIdentityUpdateHandle from './types/com/atproto/identity/updateHandle';
import * as ComAtprotoLabelDefs from './types/com/atproto/label/defs';
import * as ComAtprotoLabelQueryLabels from './types/com/atproto/label/queryLabels';
import * as ComAtprotoLabelSubscribeLabels from './types/com/atproto/label/subscribeLabels';
import * as ComAtprotoModerationCreateReport from './types/com/atproto/moderation/createReport';
import * as ComAtprotoModerationDefs from './types/com/atproto/moderation/defs';
import * as ComAtprotoRepoApplyWrites from './types/com/atproto/repo/applyWrites';
import * as ComAtprotoRepoCreateRecord from './types/com/atproto/repo/createRecord';
import * as ComAtprotoRepoDeleteRecord from './types/com/atproto/repo/deleteRecord';
import * as ComAtprotoRepoDescribeRepo from './types/com/atproto/repo/describeRepo';
import * as ComAtprotoRepoGetRecord from './types/com/atproto/repo/getRecord';
import * as ComAtprotoRepoImportRepo from './types/com/atproto/repo/importRepo';
import * as ComAtprotoRepoListMissingBlobs from './types/com/atproto/repo/listMissingBlobs';
import * as ComAtprotoRepoListRecords from './types/com/atproto/repo/listRecords';
import * as ComAtprotoRepoPutRecord from './types/com/atproto/repo/putRecord';
import * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef';
import * as ComAtprotoRepoUploadBlob from './types/com/atproto/repo/uploadBlob';
import * as ComAtprotoServerActivateAccount from './types/com/atproto/server/activateAccount';
import * as ComAtprotoServerCheckAccountStatus from './types/com/atproto/server/checkAccountStatus';
import * as ComAtprotoServerConfirmEmail from './types/com/atproto/server/confirmEmail';
import * as ComAtprotoServerCreateAccount from './types/com/atproto/server/createAccount';
import * as ComAtprotoServerCreateAppPassword from './types/com/atproto/server/createAppPassword';
import * as ComAtprotoServerCreateInviteCode from './types/com/atproto/server/createInviteCode';
import * as ComAtprotoServerCreateInviteCodes from './types/com/atproto/server/createInviteCodes';
import * as ComAtprotoServerCreateSession from './types/com/atproto/server/createSession';
import * as ComAtprotoServerDeactivateAccount from './types/com/atproto/server/deactivateAccount';
import * as ComAtprotoServerDefs from './types/com/atproto/server/defs';
import * as ComAtprotoServerDeleteAccount from './types/com/atproto/server/deleteAccount';
import * as ComAtprotoServerDeleteSession from './types/com/atproto/server/deleteSession';
import * as ComAtprotoServerDescribeServer from './types/com/atproto/server/describeServer';
import * as ComAtprotoServerGetAccountInviteCodes from './types/com/atproto/server/getAccountInviteCodes';
import * as ComAtprotoServerGetServiceAuth from './types/com/atproto/server/getServiceAuth';
import * as ComAtprotoServerGetSession from './types/com/atproto/server/getSession';
import * as ComAtprotoServerListAppPasswords from './types/com/atproto/server/listAppPasswords';
import * as ComAtprotoServerRefreshSession from './types/com/atproto/server/refreshSession';
import * as ComAtprotoServerRequestAccountDelete from './types/com/atproto/server/requestAccountDelete';
import * as ComAtprotoServerRequestEmailConfirmation from './types/com/atproto/server/requestEmailConfirmation';
import * as ComAtprotoServerRequestEmailUpdate from './types/com/atproto/server/requestEmailUpdate';
import * as ComAtprotoServerRequestPasswordReset from './types/com/atproto/server/requestPasswordReset';
import * as ComAtprotoServerReserveSigningKey from './types/com/atproto/server/reserveSigningKey';
import * as ComAtprotoServerResetPassword from './types/com/atproto/server/resetPassword';
import * as ComAtprotoServerRevokeAppPassword from './types/com/atproto/server/revokeAppPassword';
import * as ComAtprotoServerUpdateEmail from './types/com/atproto/server/updateEmail';
import * as ComAtprotoSyncGetBlob from './types/com/atproto/sync/getBlob';
import * as ComAtprotoSyncGetBlocks from './types/com/atproto/sync/getBlocks';
import * as ComAtprotoSyncGetCheckout from './types/com/atproto/sync/getCheckout';
import * as ComAtprotoSyncGetHead from './types/com/atproto/sync/getHead';
import * as ComAtprotoSyncGetLatestCommit from './types/com/atproto/sync/getLatestCommit';
import * as ComAtprotoSyncGetRecord from './types/com/atproto/sync/getRecord';
import * as ComAtprotoSyncGetRepo from './types/com/atproto/sync/getRepo';
import * as ComAtprotoSyncListBlobs from './types/com/atproto/sync/listBlobs';
import * as ComAtprotoSyncListRepos from './types/com/atproto/sync/listRepos';
import * as ComAtprotoSyncNotifyOfUpdate from './types/com/atproto/sync/notifyOfUpdate';
import * as ComAtprotoSyncRequestCrawl from './types/com/atproto/sync/requestCrawl';
import * as ComAtprotoSyncSubscribeRepos from './types/com/atproto/sync/subscribeRepos';
import * as ComAtprotoTempCheckSignupQueue from './types/com/atproto/temp/checkSignupQueue';
import * as ComAtprotoTempFetchLabels from './types/com/atproto/temp/fetchLabels';
import * as ComAtprotoTempRequestPhoneVerification from './types/com/atproto/temp/requestPhoneVerification';

export * as OrgCodestashActorDefs from './types/org/codestash/actor/defs';
export * as OrgCodestashActorGetProfile from './types/org/codestash/actor/getProfile';
export * as OrgCodestashActorProfile from './types/org/codestash/actor/profile';
export * as OrgCodestashPing from './types/org/codestash/ping';
export * as ComAtprotoAdminDefs from './types/com/atproto/admin/defs';
export * as ComAtprotoAdminDeleteAccount from './types/com/atproto/admin/deleteAccount';
export * as ComAtprotoAdminDisableAccountInvites from './types/com/atproto/admin/disableAccountInvites';
export * as ComAtprotoAdminDisableInviteCodes from './types/com/atproto/admin/disableInviteCodes';
export * as ComAtprotoAdminEnableAccountInvites from './types/com/atproto/admin/enableAccountInvites';
export * as ComAtprotoAdminGetAccountInfo from './types/com/atproto/admin/getAccountInfo';
export * as ComAtprotoAdminGetAccountInfos from './types/com/atproto/admin/getAccountInfos';
export * as ComAtprotoAdminGetInviteCodes from './types/com/atproto/admin/getInviteCodes';
export * as ComAtprotoAdminGetSubjectStatus from './types/com/atproto/admin/getSubjectStatus';
export * as ComAtprotoAdminSendEmail from './types/com/atproto/admin/sendEmail';
export * as ComAtprotoAdminUpdateAccountEmail from './types/com/atproto/admin/updateAccountEmail';
export * as ComAtprotoAdminUpdateAccountHandle from './types/com/atproto/admin/updateAccountHandle';
export * as ComAtprotoAdminUpdateAccountPassword from './types/com/atproto/admin/updateAccountPassword';
export * as ComAtprotoAdminUpdateSubjectStatus from './types/com/atproto/admin/updateSubjectStatus';
export * as ComAtprotoIdentityGetRecommendedDidCredentials from './types/com/atproto/identity/getRecommendedDidCredentials';
export * as ComAtprotoIdentityRequestPlcOperationSignature from './types/com/atproto/identity/requestPlcOperationSignature';
export * as ComAtprotoIdentityResolveHandle from './types/com/atproto/identity/resolveHandle';
export * as ComAtprotoIdentitySignPlcOperation from './types/com/atproto/identity/signPlcOperation';
export * as ComAtprotoIdentitySubmitPlcOperation from './types/com/atproto/identity/submitPlcOperation';
export * as ComAtprotoIdentityUpdateHandle from './types/com/atproto/identity/updateHandle';
export * as ComAtprotoLabelDefs from './types/com/atproto/label/defs';
export * as ComAtprotoLabelQueryLabels from './types/com/atproto/label/queryLabels';
export * as ComAtprotoLabelSubscribeLabels from './types/com/atproto/label/subscribeLabels';
export * as ComAtprotoModerationCreateReport from './types/com/atproto/moderation/createReport';
export * as ComAtprotoModerationDefs from './types/com/atproto/moderation/defs';
export * as ComAtprotoRepoApplyWrites from './types/com/atproto/repo/applyWrites';
export * as ComAtprotoRepoCreateRecord from './types/com/atproto/repo/createRecord';
export * as ComAtprotoRepoDeleteRecord from './types/com/atproto/repo/deleteRecord';
export * as ComAtprotoRepoDescribeRepo from './types/com/atproto/repo/describeRepo';
export * as ComAtprotoRepoGetRecord from './types/com/atproto/repo/getRecord';
export * as ComAtprotoRepoImportRepo from './types/com/atproto/repo/importRepo';
export * as ComAtprotoRepoListMissingBlobs from './types/com/atproto/repo/listMissingBlobs';
export * as ComAtprotoRepoListRecords from './types/com/atproto/repo/listRecords';
export * as ComAtprotoRepoPutRecord from './types/com/atproto/repo/putRecord';
export * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef';
export * as ComAtprotoRepoUploadBlob from './types/com/atproto/repo/uploadBlob';
export * as ComAtprotoServerActivateAccount from './types/com/atproto/server/activateAccount';
export * as ComAtprotoServerCheckAccountStatus from './types/com/atproto/server/checkAccountStatus';
export * as ComAtprotoServerConfirmEmail from './types/com/atproto/server/confirmEmail';
export * as ComAtprotoServerCreateAccount from './types/com/atproto/server/createAccount';
export * as ComAtprotoServerCreateAppPassword from './types/com/atproto/server/createAppPassword';
export * as ComAtprotoServerCreateInviteCode from './types/com/atproto/server/createInviteCode';
export * as ComAtprotoServerCreateInviteCodes from './types/com/atproto/server/createInviteCodes';
export * as ComAtprotoServerCreateSession from './types/com/atproto/server/createSession';
export * as ComAtprotoServerDeactivateAccount from './types/com/atproto/server/deactivateAccount';
export * as ComAtprotoServerDefs from './types/com/atproto/server/defs';
export * as ComAtprotoServerDeleteAccount from './types/com/atproto/server/deleteAccount';
export * as ComAtprotoServerDeleteSession from './types/com/atproto/server/deleteSession';
export * as ComAtprotoServerDescribeServer from './types/com/atproto/server/describeServer';
export * as ComAtprotoServerGetAccountInviteCodes from './types/com/atproto/server/getAccountInviteCodes';
export * as ComAtprotoServerGetServiceAuth from './types/com/atproto/server/getServiceAuth';
export * as ComAtprotoServerGetSession from './types/com/atproto/server/getSession';
export * as ComAtprotoServerListAppPasswords from './types/com/atproto/server/listAppPasswords';
export * as ComAtprotoServerRefreshSession from './types/com/atproto/server/refreshSession';
export * as ComAtprotoServerRequestAccountDelete from './types/com/atproto/server/requestAccountDelete';
export * as ComAtprotoServerRequestEmailConfirmation from './types/com/atproto/server/requestEmailConfirmation';
export * as ComAtprotoServerRequestEmailUpdate from './types/com/atproto/server/requestEmailUpdate';
export * as ComAtprotoServerRequestPasswordReset from './types/com/atproto/server/requestPasswordReset';
export * as ComAtprotoServerReserveSigningKey from './types/com/atproto/server/reserveSigningKey';
export * as ComAtprotoServerResetPassword from './types/com/atproto/server/resetPassword';
export * as ComAtprotoServerRevokeAppPassword from './types/com/atproto/server/revokeAppPassword';
export * as ComAtprotoServerUpdateEmail from './types/com/atproto/server/updateEmail';
export * as ComAtprotoSyncGetBlob from './types/com/atproto/sync/getBlob';
export * as ComAtprotoSyncGetBlocks from './types/com/atproto/sync/getBlocks';
export * as ComAtprotoSyncGetCheckout from './types/com/atproto/sync/getCheckout';
export * as ComAtprotoSyncGetHead from './types/com/atproto/sync/getHead';
export * as ComAtprotoSyncGetLatestCommit from './types/com/atproto/sync/getLatestCommit';
export * as ComAtprotoSyncGetRecord from './types/com/atproto/sync/getRecord';
export * as ComAtprotoSyncGetRepo from './types/com/atproto/sync/getRepo';
export * as ComAtprotoSyncListBlobs from './types/com/atproto/sync/listBlobs';
export * as ComAtprotoSyncListRepos from './types/com/atproto/sync/listRepos';
export * as ComAtprotoSyncNotifyOfUpdate from './types/com/atproto/sync/notifyOfUpdate';
export * as ComAtprotoSyncRequestCrawl from './types/com/atproto/sync/requestCrawl';
export * as ComAtprotoSyncSubscribeRepos from './types/com/atproto/sync/subscribeRepos';
export * as ComAtprotoTempCheckSignupQueue from './types/com/atproto/temp/checkSignupQueue';
export * as ComAtprotoTempFetchLabels from './types/com/atproto/temp/fetchLabels';
export * as ComAtprotoTempRequestPhoneVerification from './types/com/atproto/temp/requestPhoneVerification';

export const COM_ATPROTO_MODERATION = {
  DefsReasonSpam: 'com.atproto.moderation.defs#reasonSpam',
  DefsReasonViolation: 'com.atproto.moderation.defs#reasonViolation',
  DefsReasonMisleading: 'com.atproto.moderation.defs#reasonMisleading',
  DefsReasonSexual: 'com.atproto.moderation.defs#reasonSexual',
  DefsReasonRude: 'com.atproto.moderation.defs#reasonRude',
  DefsReasonOther: 'com.atproto.moderation.defs#reasonOther',
  DefsReasonAppeal: 'com.atproto.moderation.defs#reasonAppeal',
};

export class AtpBaseClient {
  xrpc: XrpcClient = new XrpcClient();

  constructor() {
    this.xrpc.addLexicons(schemas);
  }

  service(serviceUri: string | URL): AtpServiceClient {
    return new AtpServiceClient(this, this.xrpc.service(serviceUri));
  }
}

export class AtpServiceClient {
  _baseClient: AtpBaseClient;
  xrpc: XrpcServiceClient;
  org: OrgNS;
  com: ComNS;

  constructor(baseClient: AtpBaseClient, xrpcService: XrpcServiceClient) {
    this._baseClient = baseClient;
    this.xrpc = xrpcService;
    this.org = new OrgNS(this);
    this.com = new ComNS(this);
  }

  setHeader(key: string, value: string): void {
    this.xrpc.setHeader(key, value);
  }
}

export class OrgNS {
  _service: AtpServiceClient;
  codestash: OrgCodestashNS;

  constructor(service: AtpServiceClient) {
    this._service = service;
    this.codestash = new OrgCodestashNS(service);
  }
}

export class OrgCodestashNS {
  _service: AtpServiceClient;
  actor: OrgCodestashActorNS;

  constructor(service: AtpServiceClient) {
    this._service = service;
    this.actor = new OrgCodestashActorNS(service);
  }

  ping(
    params?: OrgCodestashPing.QueryParams,
    opts?: OrgCodestashPing.CallOptions,
  ): Promise<OrgCodestashPing.Response> {
    return this._service.xrpc
      .call('org.codestash.ping', params, undefined, opts)
      .catch((e) => {
        throw OrgCodestashPing.toKnownErr(e);
      });
  }
}

export class OrgCodestashActorNS {
  _service: AtpServiceClient;
  profile: ProfileRecord;

  constructor(service: AtpServiceClient) {
    this._service = service;
    this.profile = new ProfileRecord(service);
  }

  getProfile(
    params?: OrgCodestashActorGetProfile.QueryParams,
    opts?: OrgCodestashActorGetProfile.CallOptions,
  ): Promise<OrgCodestashActorGetProfile.Response> {
    return this._service.xrpc
      .call('org.codestash.actor.getProfile', params, undefined, opts)
      .catch((e) => {
        throw OrgCodestashActorGetProfile.toKnownErr(e);
      });
  }
}

export class ProfileRecord {
  _service: AtpServiceClient;

  constructor(service: AtpServiceClient) {
    this._service = service;
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string;
    records: { uri: string; value: OrgCodestashActorProfile.Record }[];
  }> {
    const res = await this._service.xrpc.call('com.atproto.repo.listRecords', {
      collection: 'org.codestash.actor.profile',
      ...params,
    });
    return res.data;
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string;
    cid: string;
    value: OrgCodestashActorProfile.Record;
  }> {
    const res = await this._service.xrpc.call('com.atproto.repo.getRecord', {
      collection: 'org.codestash.actor.profile',
      ...params,
    });
    return res.data;
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: OrgCodestashActorProfile.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'org.codestash.actor.profile';
    const res = await this._service.xrpc.call(
      'com.atproto.repo.createRecord',
      undefined,
      {
        collection: 'org.codestash.actor.profile',
        rkey: 'self',
        ...params,
        record,
      },
      { encoding: 'application/json', headers },
    );
    return res.data;
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._service.xrpc.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'org.codestash.actor.profile', ...params },
      { headers },
    );
  }
}

export class ComNS {
  _service: AtpServiceClient;
  atproto: ComAtprotoNS;

  constructor(service: AtpServiceClient) {
    this._service = service;
    this.atproto = new ComAtprotoNS(service);
  }
}

export class ComAtprotoNS {
  _service: AtpServiceClient;
  admin: ComAtprotoAdminNS;
  identity: ComAtprotoIdentityNS;
  label: ComAtprotoLabelNS;
  moderation: ComAtprotoModerationNS;
  repo: ComAtprotoRepoNS;
  server: ComAtprotoServerNS;
  sync: ComAtprotoSyncNS;
  temp: ComAtprotoTempNS;

  constructor(service: AtpServiceClient) {
    this._service = service;
    this.admin = new ComAtprotoAdminNS(service);
    this.identity = new ComAtprotoIdentityNS(service);
    this.label = new ComAtprotoLabelNS(service);
    this.moderation = new ComAtprotoModerationNS(service);
    this.repo = new ComAtprotoRepoNS(service);
    this.server = new ComAtprotoServerNS(service);
    this.sync = new ComAtprotoSyncNS(service);
    this.temp = new ComAtprotoTempNS(service);
  }
}

export class ComAtprotoAdminNS {
  _service: AtpServiceClient;

  constructor(service: AtpServiceClient) {
    this._service = service;
  }

  deleteAccount(
    data?: ComAtprotoAdminDeleteAccount.InputSchema,
    opts?: ComAtprotoAdminDeleteAccount.CallOptions,
  ): Promise<ComAtprotoAdminDeleteAccount.Response> {
    return this._service.xrpc
      .call('com.atproto.admin.deleteAccount', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoAdminDeleteAccount.toKnownErr(e);
      });
  }

  disableAccountInvites(
    data?: ComAtprotoAdminDisableAccountInvites.InputSchema,
    opts?: ComAtprotoAdminDisableAccountInvites.CallOptions,
  ): Promise<ComAtprotoAdminDisableAccountInvites.Response> {
    return this._service.xrpc
      .call('com.atproto.admin.disableAccountInvites', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoAdminDisableAccountInvites.toKnownErr(e);
      });
  }

  disableInviteCodes(
    data?: ComAtprotoAdminDisableInviteCodes.InputSchema,
    opts?: ComAtprotoAdminDisableInviteCodes.CallOptions,
  ): Promise<ComAtprotoAdminDisableInviteCodes.Response> {
    return this._service.xrpc
      .call('com.atproto.admin.disableInviteCodes', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoAdminDisableInviteCodes.toKnownErr(e);
      });
  }

  enableAccountInvites(
    data?: ComAtprotoAdminEnableAccountInvites.InputSchema,
    opts?: ComAtprotoAdminEnableAccountInvites.CallOptions,
  ): Promise<ComAtprotoAdminEnableAccountInvites.Response> {
    return this._service.xrpc
      .call('com.atproto.admin.enableAccountInvites', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoAdminEnableAccountInvites.toKnownErr(e);
      });
  }

  getAccountInfo(
    params?: ComAtprotoAdminGetAccountInfo.QueryParams,
    opts?: ComAtprotoAdminGetAccountInfo.CallOptions,
  ): Promise<ComAtprotoAdminGetAccountInfo.Response> {
    return this._service.xrpc
      .call('com.atproto.admin.getAccountInfo', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoAdminGetAccountInfo.toKnownErr(e);
      });
  }

  getAccountInfos(
    params?: ComAtprotoAdminGetAccountInfos.QueryParams,
    opts?: ComAtprotoAdminGetAccountInfos.CallOptions,
  ): Promise<ComAtprotoAdminGetAccountInfos.Response> {
    return this._service.xrpc
      .call('com.atproto.admin.getAccountInfos', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoAdminGetAccountInfos.toKnownErr(e);
      });
  }

  getInviteCodes(
    params?: ComAtprotoAdminGetInviteCodes.QueryParams,
    opts?: ComAtprotoAdminGetInviteCodes.CallOptions,
  ): Promise<ComAtprotoAdminGetInviteCodes.Response> {
    return this._service.xrpc
      .call('com.atproto.admin.getInviteCodes', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoAdminGetInviteCodes.toKnownErr(e);
      });
  }

  getSubjectStatus(
    params?: ComAtprotoAdminGetSubjectStatus.QueryParams,
    opts?: ComAtprotoAdminGetSubjectStatus.CallOptions,
  ): Promise<ComAtprotoAdminGetSubjectStatus.Response> {
    return this._service.xrpc
      .call('com.atproto.admin.getSubjectStatus', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoAdminGetSubjectStatus.toKnownErr(e);
      });
  }

  sendEmail(
    data?: ComAtprotoAdminSendEmail.InputSchema,
    opts?: ComAtprotoAdminSendEmail.CallOptions,
  ): Promise<ComAtprotoAdminSendEmail.Response> {
    return this._service.xrpc
      .call('com.atproto.admin.sendEmail', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoAdminSendEmail.toKnownErr(e);
      });
  }

  updateAccountEmail(
    data?: ComAtprotoAdminUpdateAccountEmail.InputSchema,
    opts?: ComAtprotoAdminUpdateAccountEmail.CallOptions,
  ): Promise<ComAtprotoAdminUpdateAccountEmail.Response> {
    return this._service.xrpc
      .call('com.atproto.admin.updateAccountEmail', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoAdminUpdateAccountEmail.toKnownErr(e);
      });
  }

  updateAccountHandle(
    data?: ComAtprotoAdminUpdateAccountHandle.InputSchema,
    opts?: ComAtprotoAdminUpdateAccountHandle.CallOptions,
  ): Promise<ComAtprotoAdminUpdateAccountHandle.Response> {
    return this._service.xrpc
      .call('com.atproto.admin.updateAccountHandle', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoAdminUpdateAccountHandle.toKnownErr(e);
      });
  }

  updateAccountPassword(
    data?: ComAtprotoAdminUpdateAccountPassword.InputSchema,
    opts?: ComAtprotoAdminUpdateAccountPassword.CallOptions,
  ): Promise<ComAtprotoAdminUpdateAccountPassword.Response> {
    return this._service.xrpc
      .call('com.atproto.admin.updateAccountPassword', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoAdminUpdateAccountPassword.toKnownErr(e);
      });
  }

  updateSubjectStatus(
    data?: ComAtprotoAdminUpdateSubjectStatus.InputSchema,
    opts?: ComAtprotoAdminUpdateSubjectStatus.CallOptions,
  ): Promise<ComAtprotoAdminUpdateSubjectStatus.Response> {
    return this._service.xrpc
      .call('com.atproto.admin.updateSubjectStatus', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoAdminUpdateSubjectStatus.toKnownErr(e);
      });
  }
}

export class ComAtprotoIdentityNS {
  _service: AtpServiceClient;

  constructor(service: AtpServiceClient) {
    this._service = service;
  }

  getRecommendedDidCredentials(
    params?: ComAtprotoIdentityGetRecommendedDidCredentials.QueryParams,
    opts?: ComAtprotoIdentityGetRecommendedDidCredentials.CallOptions,
  ): Promise<ComAtprotoIdentityGetRecommendedDidCredentials.Response> {
    return this._service.xrpc
      .call(
        'com.atproto.identity.getRecommendedDidCredentials',
        params,
        undefined,
        opts,
      )
      .catch((e) => {
        throw ComAtprotoIdentityGetRecommendedDidCredentials.toKnownErr(e);
      });
  }

  requestPlcOperationSignature(
    data?: ComAtprotoIdentityRequestPlcOperationSignature.InputSchema,
    opts?: ComAtprotoIdentityRequestPlcOperationSignature.CallOptions,
  ): Promise<ComAtprotoIdentityRequestPlcOperationSignature.Response> {
    return this._service.xrpc
      .call(
        'com.atproto.identity.requestPlcOperationSignature',
        opts?.qp,
        data,
        opts,
      )
      .catch((e) => {
        throw ComAtprotoIdentityRequestPlcOperationSignature.toKnownErr(e);
      });
  }

  resolveHandle(
    params?: ComAtprotoIdentityResolveHandle.QueryParams,
    opts?: ComAtprotoIdentityResolveHandle.CallOptions,
  ): Promise<ComAtprotoIdentityResolveHandle.Response> {
    return this._service.xrpc
      .call('com.atproto.identity.resolveHandle', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoIdentityResolveHandle.toKnownErr(e);
      });
  }

  signPlcOperation(
    data?: ComAtprotoIdentitySignPlcOperation.InputSchema,
    opts?: ComAtprotoIdentitySignPlcOperation.CallOptions,
  ): Promise<ComAtprotoIdentitySignPlcOperation.Response> {
    return this._service.xrpc
      .call('com.atproto.identity.signPlcOperation', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoIdentitySignPlcOperation.toKnownErr(e);
      });
  }

  submitPlcOperation(
    data?: ComAtprotoIdentitySubmitPlcOperation.InputSchema,
    opts?: ComAtprotoIdentitySubmitPlcOperation.CallOptions,
  ): Promise<ComAtprotoIdentitySubmitPlcOperation.Response> {
    return this._service.xrpc
      .call('com.atproto.identity.submitPlcOperation', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoIdentitySubmitPlcOperation.toKnownErr(e);
      });
  }

  updateHandle(
    data?: ComAtprotoIdentityUpdateHandle.InputSchema,
    opts?: ComAtprotoIdentityUpdateHandle.CallOptions,
  ): Promise<ComAtprotoIdentityUpdateHandle.Response> {
    return this._service.xrpc
      .call('com.atproto.identity.updateHandle', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoIdentityUpdateHandle.toKnownErr(e);
      });
  }
}

export class ComAtprotoLabelNS {
  _service: AtpServiceClient;

  constructor(service: AtpServiceClient) {
    this._service = service;
  }

  queryLabels(
    params?: ComAtprotoLabelQueryLabels.QueryParams,
    opts?: ComAtprotoLabelQueryLabels.CallOptions,
  ): Promise<ComAtprotoLabelQueryLabels.Response> {
    return this._service.xrpc
      .call('com.atproto.label.queryLabels', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoLabelQueryLabels.toKnownErr(e);
      });
  }
}

export class ComAtprotoModerationNS {
  _service: AtpServiceClient;

  constructor(service: AtpServiceClient) {
    this._service = service;
  }

  createReport(
    data?: ComAtprotoModerationCreateReport.InputSchema,
    opts?: ComAtprotoModerationCreateReport.CallOptions,
  ): Promise<ComAtprotoModerationCreateReport.Response> {
    return this._service.xrpc
      .call('com.atproto.moderation.createReport', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoModerationCreateReport.toKnownErr(e);
      });
  }
}

export class ComAtprotoRepoNS {
  _service: AtpServiceClient;

  constructor(service: AtpServiceClient) {
    this._service = service;
  }

  applyWrites(
    data?: ComAtprotoRepoApplyWrites.InputSchema,
    opts?: ComAtprotoRepoApplyWrites.CallOptions,
  ): Promise<ComAtprotoRepoApplyWrites.Response> {
    return this._service.xrpc
      .call('com.atproto.repo.applyWrites', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoRepoApplyWrites.toKnownErr(e);
      });
  }

  createRecord(
    data?: ComAtprotoRepoCreateRecord.InputSchema,
    opts?: ComAtprotoRepoCreateRecord.CallOptions,
  ): Promise<ComAtprotoRepoCreateRecord.Response> {
    return this._service.xrpc
      .call('com.atproto.repo.createRecord', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoRepoCreateRecord.toKnownErr(e);
      });
  }

  deleteRecord(
    data?: ComAtprotoRepoDeleteRecord.InputSchema,
    opts?: ComAtprotoRepoDeleteRecord.CallOptions,
  ): Promise<ComAtprotoRepoDeleteRecord.Response> {
    return this._service.xrpc
      .call('com.atproto.repo.deleteRecord', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoRepoDeleteRecord.toKnownErr(e);
      });
  }

  describeRepo(
    params?: ComAtprotoRepoDescribeRepo.QueryParams,
    opts?: ComAtprotoRepoDescribeRepo.CallOptions,
  ): Promise<ComAtprotoRepoDescribeRepo.Response> {
    return this._service.xrpc
      .call('com.atproto.repo.describeRepo', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoRepoDescribeRepo.toKnownErr(e);
      });
  }

  getRecord(
    params?: ComAtprotoRepoGetRecord.QueryParams,
    opts?: ComAtprotoRepoGetRecord.CallOptions,
  ): Promise<ComAtprotoRepoGetRecord.Response> {
    return this._service.xrpc
      .call('com.atproto.repo.getRecord', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoRepoGetRecord.toKnownErr(e);
      });
  }

  importRepo(
    data?: ComAtprotoRepoImportRepo.InputSchema,
    opts?: ComAtprotoRepoImportRepo.CallOptions,
  ): Promise<ComAtprotoRepoImportRepo.Response> {
    return this._service.xrpc
      .call('com.atproto.repo.importRepo', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoRepoImportRepo.toKnownErr(e);
      });
  }

  listMissingBlobs(
    params?: ComAtprotoRepoListMissingBlobs.QueryParams,
    opts?: ComAtprotoRepoListMissingBlobs.CallOptions,
  ): Promise<ComAtprotoRepoListMissingBlobs.Response> {
    return this._service.xrpc
      .call('com.atproto.repo.listMissingBlobs', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoRepoListMissingBlobs.toKnownErr(e);
      });
  }

  listRecords(
    params?: ComAtprotoRepoListRecords.QueryParams,
    opts?: ComAtprotoRepoListRecords.CallOptions,
  ): Promise<ComAtprotoRepoListRecords.Response> {
    return this._service.xrpc
      .call('com.atproto.repo.listRecords', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoRepoListRecords.toKnownErr(e);
      });
  }

  putRecord(
    data?: ComAtprotoRepoPutRecord.InputSchema,
    opts?: ComAtprotoRepoPutRecord.CallOptions,
  ): Promise<ComAtprotoRepoPutRecord.Response> {
    return this._service.xrpc
      .call('com.atproto.repo.putRecord', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoRepoPutRecord.toKnownErr(e);
      });
  }

  uploadBlob(
    data?: ComAtprotoRepoUploadBlob.InputSchema,
    opts?: ComAtprotoRepoUploadBlob.CallOptions,
  ): Promise<ComAtprotoRepoUploadBlob.Response> {
    return this._service.xrpc
      .call('com.atproto.repo.uploadBlob', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoRepoUploadBlob.toKnownErr(e);
      });
  }
}

export class ComAtprotoServerNS {
  _service: AtpServiceClient;

  constructor(service: AtpServiceClient) {
    this._service = service;
  }

  activateAccount(
    data?: ComAtprotoServerActivateAccount.InputSchema,
    opts?: ComAtprotoServerActivateAccount.CallOptions,
  ): Promise<ComAtprotoServerActivateAccount.Response> {
    return this._service.xrpc
      .call('com.atproto.server.activateAccount', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerActivateAccount.toKnownErr(e);
      });
  }

  checkAccountStatus(
    params?: ComAtprotoServerCheckAccountStatus.QueryParams,
    opts?: ComAtprotoServerCheckAccountStatus.CallOptions,
  ): Promise<ComAtprotoServerCheckAccountStatus.Response> {
    return this._service.xrpc
      .call('com.atproto.server.checkAccountStatus', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoServerCheckAccountStatus.toKnownErr(e);
      });
  }

  confirmEmail(
    data?: ComAtprotoServerConfirmEmail.InputSchema,
    opts?: ComAtprotoServerConfirmEmail.CallOptions,
  ): Promise<ComAtprotoServerConfirmEmail.Response> {
    return this._service.xrpc
      .call('com.atproto.server.confirmEmail', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerConfirmEmail.toKnownErr(e);
      });
  }

  createAccount(
    data?: ComAtprotoServerCreateAccount.InputSchema,
    opts?: ComAtprotoServerCreateAccount.CallOptions,
  ): Promise<ComAtprotoServerCreateAccount.Response> {
    return this._service.xrpc
      .call('com.atproto.server.createAccount', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerCreateAccount.toKnownErr(e);
      });
  }

  createAppPassword(
    data?: ComAtprotoServerCreateAppPassword.InputSchema,
    opts?: ComAtprotoServerCreateAppPassword.CallOptions,
  ): Promise<ComAtprotoServerCreateAppPassword.Response> {
    return this._service.xrpc
      .call('com.atproto.server.createAppPassword', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerCreateAppPassword.toKnownErr(e);
      });
  }

  createInviteCode(
    data?: ComAtprotoServerCreateInviteCode.InputSchema,
    opts?: ComAtprotoServerCreateInviteCode.CallOptions,
  ): Promise<ComAtprotoServerCreateInviteCode.Response> {
    return this._service.xrpc
      .call('com.atproto.server.createInviteCode', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerCreateInviteCode.toKnownErr(e);
      });
  }

  createInviteCodes(
    data?: ComAtprotoServerCreateInviteCodes.InputSchema,
    opts?: ComAtprotoServerCreateInviteCodes.CallOptions,
  ): Promise<ComAtprotoServerCreateInviteCodes.Response> {
    return this._service.xrpc
      .call('com.atproto.server.createInviteCodes', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerCreateInviteCodes.toKnownErr(e);
      });
  }

  createSession(
    data?: ComAtprotoServerCreateSession.InputSchema,
    opts?: ComAtprotoServerCreateSession.CallOptions,
  ): Promise<ComAtprotoServerCreateSession.Response> {
    return this._service.xrpc
      .call('com.atproto.server.createSession', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerCreateSession.toKnownErr(e);
      });
  }

  deactivateAccount(
    data?: ComAtprotoServerDeactivateAccount.InputSchema,
    opts?: ComAtprotoServerDeactivateAccount.CallOptions,
  ): Promise<ComAtprotoServerDeactivateAccount.Response> {
    return this._service.xrpc
      .call('com.atproto.server.deactivateAccount', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerDeactivateAccount.toKnownErr(e);
      });
  }

  deleteAccount(
    data?: ComAtprotoServerDeleteAccount.InputSchema,
    opts?: ComAtprotoServerDeleteAccount.CallOptions,
  ): Promise<ComAtprotoServerDeleteAccount.Response> {
    return this._service.xrpc
      .call('com.atproto.server.deleteAccount', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerDeleteAccount.toKnownErr(e);
      });
  }

  deleteSession(
    data?: ComAtprotoServerDeleteSession.InputSchema,
    opts?: ComAtprotoServerDeleteSession.CallOptions,
  ): Promise<ComAtprotoServerDeleteSession.Response> {
    return this._service.xrpc
      .call('com.atproto.server.deleteSession', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerDeleteSession.toKnownErr(e);
      });
  }

  describeServer(
    params?: ComAtprotoServerDescribeServer.QueryParams,
    opts?: ComAtprotoServerDescribeServer.CallOptions,
  ): Promise<ComAtprotoServerDescribeServer.Response> {
    return this._service.xrpc
      .call('com.atproto.server.describeServer', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoServerDescribeServer.toKnownErr(e);
      });
  }

  getAccountInviteCodes(
    params?: ComAtprotoServerGetAccountInviteCodes.QueryParams,
    opts?: ComAtprotoServerGetAccountInviteCodes.CallOptions,
  ): Promise<ComAtprotoServerGetAccountInviteCodes.Response> {
    return this._service.xrpc
      .call('com.atproto.server.getAccountInviteCodes', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoServerGetAccountInviteCodes.toKnownErr(e);
      });
  }

  getServiceAuth(
    params?: ComAtprotoServerGetServiceAuth.QueryParams,
    opts?: ComAtprotoServerGetServiceAuth.CallOptions,
  ): Promise<ComAtprotoServerGetServiceAuth.Response> {
    return this._service.xrpc
      .call('com.atproto.server.getServiceAuth', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoServerGetServiceAuth.toKnownErr(e);
      });
  }

  getSession(
    params?: ComAtprotoServerGetSession.QueryParams,
    opts?: ComAtprotoServerGetSession.CallOptions,
  ): Promise<ComAtprotoServerGetSession.Response> {
    return this._service.xrpc
      .call('com.atproto.server.getSession', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoServerGetSession.toKnownErr(e);
      });
  }

  listAppPasswords(
    params?: ComAtprotoServerListAppPasswords.QueryParams,
    opts?: ComAtprotoServerListAppPasswords.CallOptions,
  ): Promise<ComAtprotoServerListAppPasswords.Response> {
    return this._service.xrpc
      .call('com.atproto.server.listAppPasswords', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoServerListAppPasswords.toKnownErr(e);
      });
  }

  refreshSession(
    data?: ComAtprotoServerRefreshSession.InputSchema,
    opts?: ComAtprotoServerRefreshSession.CallOptions,
  ): Promise<ComAtprotoServerRefreshSession.Response> {
    return this._service.xrpc
      .call('com.atproto.server.refreshSession', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerRefreshSession.toKnownErr(e);
      });
  }

  requestAccountDelete(
    data?: ComAtprotoServerRequestAccountDelete.InputSchema,
    opts?: ComAtprotoServerRequestAccountDelete.CallOptions,
  ): Promise<ComAtprotoServerRequestAccountDelete.Response> {
    return this._service.xrpc
      .call('com.atproto.server.requestAccountDelete', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerRequestAccountDelete.toKnownErr(e);
      });
  }

  requestEmailConfirmation(
    data?: ComAtprotoServerRequestEmailConfirmation.InputSchema,
    opts?: ComAtprotoServerRequestEmailConfirmation.CallOptions,
  ): Promise<ComAtprotoServerRequestEmailConfirmation.Response> {
    return this._service.xrpc
      .call('com.atproto.server.requestEmailConfirmation', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerRequestEmailConfirmation.toKnownErr(e);
      });
  }

  requestEmailUpdate(
    data?: ComAtprotoServerRequestEmailUpdate.InputSchema,
    opts?: ComAtprotoServerRequestEmailUpdate.CallOptions,
  ): Promise<ComAtprotoServerRequestEmailUpdate.Response> {
    return this._service.xrpc
      .call('com.atproto.server.requestEmailUpdate', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerRequestEmailUpdate.toKnownErr(e);
      });
  }

  requestPasswordReset(
    data?: ComAtprotoServerRequestPasswordReset.InputSchema,
    opts?: ComAtprotoServerRequestPasswordReset.CallOptions,
  ): Promise<ComAtprotoServerRequestPasswordReset.Response> {
    return this._service.xrpc
      .call('com.atproto.server.requestPasswordReset', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerRequestPasswordReset.toKnownErr(e);
      });
  }

  reserveSigningKey(
    data?: ComAtprotoServerReserveSigningKey.InputSchema,
    opts?: ComAtprotoServerReserveSigningKey.CallOptions,
  ): Promise<ComAtprotoServerReserveSigningKey.Response> {
    return this._service.xrpc
      .call('com.atproto.server.reserveSigningKey', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerReserveSigningKey.toKnownErr(e);
      });
  }

  resetPassword(
    data?: ComAtprotoServerResetPassword.InputSchema,
    opts?: ComAtprotoServerResetPassword.CallOptions,
  ): Promise<ComAtprotoServerResetPassword.Response> {
    return this._service.xrpc
      .call('com.atproto.server.resetPassword', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerResetPassword.toKnownErr(e);
      });
  }

  revokeAppPassword(
    data?: ComAtprotoServerRevokeAppPassword.InputSchema,
    opts?: ComAtprotoServerRevokeAppPassword.CallOptions,
  ): Promise<ComAtprotoServerRevokeAppPassword.Response> {
    return this._service.xrpc
      .call('com.atproto.server.revokeAppPassword', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerRevokeAppPassword.toKnownErr(e);
      });
  }

  updateEmail(
    data?: ComAtprotoServerUpdateEmail.InputSchema,
    opts?: ComAtprotoServerUpdateEmail.CallOptions,
  ): Promise<ComAtprotoServerUpdateEmail.Response> {
    return this._service.xrpc
      .call('com.atproto.server.updateEmail', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoServerUpdateEmail.toKnownErr(e);
      });
  }
}

export class ComAtprotoSyncNS {
  _service: AtpServiceClient;

  constructor(service: AtpServiceClient) {
    this._service = service;
  }

  getBlob(
    params?: ComAtprotoSyncGetBlob.QueryParams,
    opts?: ComAtprotoSyncGetBlob.CallOptions,
  ): Promise<ComAtprotoSyncGetBlob.Response> {
    return this._service.xrpc
      .call('com.atproto.sync.getBlob', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoSyncGetBlob.toKnownErr(e);
      });
  }

  getBlocks(
    params?: ComAtprotoSyncGetBlocks.QueryParams,
    opts?: ComAtprotoSyncGetBlocks.CallOptions,
  ): Promise<ComAtprotoSyncGetBlocks.Response> {
    return this._service.xrpc
      .call('com.atproto.sync.getBlocks', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoSyncGetBlocks.toKnownErr(e);
      });
  }

  getCheckout(
    params?: ComAtprotoSyncGetCheckout.QueryParams,
    opts?: ComAtprotoSyncGetCheckout.CallOptions,
  ): Promise<ComAtprotoSyncGetCheckout.Response> {
    return this._service.xrpc
      .call('com.atproto.sync.getCheckout', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoSyncGetCheckout.toKnownErr(e);
      });
  }

  getHead(
    params?: ComAtprotoSyncGetHead.QueryParams,
    opts?: ComAtprotoSyncGetHead.CallOptions,
  ): Promise<ComAtprotoSyncGetHead.Response> {
    return this._service.xrpc
      .call('com.atproto.sync.getHead', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoSyncGetHead.toKnownErr(e);
      });
  }

  getLatestCommit(
    params?: ComAtprotoSyncGetLatestCommit.QueryParams,
    opts?: ComAtprotoSyncGetLatestCommit.CallOptions,
  ): Promise<ComAtprotoSyncGetLatestCommit.Response> {
    return this._service.xrpc
      .call('com.atproto.sync.getLatestCommit', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoSyncGetLatestCommit.toKnownErr(e);
      });
  }

  getRecord(
    params?: ComAtprotoSyncGetRecord.QueryParams,
    opts?: ComAtprotoSyncGetRecord.CallOptions,
  ): Promise<ComAtprotoSyncGetRecord.Response> {
    return this._service.xrpc
      .call('com.atproto.sync.getRecord', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoSyncGetRecord.toKnownErr(e);
      });
  }

  getRepo(
    params?: ComAtprotoSyncGetRepo.QueryParams,
    opts?: ComAtprotoSyncGetRepo.CallOptions,
  ): Promise<ComAtprotoSyncGetRepo.Response> {
    return this._service.xrpc
      .call('com.atproto.sync.getRepo', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoSyncGetRepo.toKnownErr(e);
      });
  }

  listBlobs(
    params?: ComAtprotoSyncListBlobs.QueryParams,
    opts?: ComAtprotoSyncListBlobs.CallOptions,
  ): Promise<ComAtprotoSyncListBlobs.Response> {
    return this._service.xrpc
      .call('com.atproto.sync.listBlobs', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoSyncListBlobs.toKnownErr(e);
      });
  }

  listRepos(
    params?: ComAtprotoSyncListRepos.QueryParams,
    opts?: ComAtprotoSyncListRepos.CallOptions,
  ): Promise<ComAtprotoSyncListRepos.Response> {
    return this._service.xrpc
      .call('com.atproto.sync.listRepos', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoSyncListRepos.toKnownErr(e);
      });
  }

  notifyOfUpdate(
    data?: ComAtprotoSyncNotifyOfUpdate.InputSchema,
    opts?: ComAtprotoSyncNotifyOfUpdate.CallOptions,
  ): Promise<ComAtprotoSyncNotifyOfUpdate.Response> {
    return this._service.xrpc
      .call('com.atproto.sync.notifyOfUpdate', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoSyncNotifyOfUpdate.toKnownErr(e);
      });
  }

  requestCrawl(
    data?: ComAtprotoSyncRequestCrawl.InputSchema,
    opts?: ComAtprotoSyncRequestCrawl.CallOptions,
  ): Promise<ComAtprotoSyncRequestCrawl.Response> {
    return this._service.xrpc
      .call('com.atproto.sync.requestCrawl', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoSyncRequestCrawl.toKnownErr(e);
      });
  }
}

export class ComAtprotoTempNS {
  _service: AtpServiceClient;

  constructor(service: AtpServiceClient) {
    this._service = service;
  }

  checkSignupQueue(
    params?: ComAtprotoTempCheckSignupQueue.QueryParams,
    opts?: ComAtprotoTempCheckSignupQueue.CallOptions,
  ): Promise<ComAtprotoTempCheckSignupQueue.Response> {
    return this._service.xrpc
      .call('com.atproto.temp.checkSignupQueue', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoTempCheckSignupQueue.toKnownErr(e);
      });
  }

  fetchLabels(
    params?: ComAtprotoTempFetchLabels.QueryParams,
    opts?: ComAtprotoTempFetchLabels.CallOptions,
  ): Promise<ComAtprotoTempFetchLabels.Response> {
    return this._service.xrpc
      .call('com.atproto.temp.fetchLabels', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoTempFetchLabels.toKnownErr(e);
      });
  }

  requestPhoneVerification(
    data?: ComAtprotoTempRequestPhoneVerification.InputSchema,
    opts?: ComAtprotoTempRequestPhoneVerification.CallOptions,
  ): Promise<ComAtprotoTempRequestPhoneVerification.Response> {
    return this._service.xrpc
      .call('com.atproto.temp.requestPhoneVerification', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoTempRequestPhoneVerification.toKnownErr(e);
      });
  }
}
