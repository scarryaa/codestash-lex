// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts,import_extension=.ts"
// @generated from file csync.proto (package csync, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { AddMuteOperationRequest, AddMuteOperationResponse, PingRequest, PingResponse, ScanMuteOperationsRequest, ScanMuteOperationsResponse } from "./csync_pb";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service csync.Service
 */
export const Service = {
  typeName: "csync.Service",
  methods: {
    /**
     * Sync
     *
     * @generated from rpc csync.Service.AddMuteOperation
     */
    addMuteOperation: {
      name: "AddMuteOperation",
      I: AddMuteOperationRequest,
      O: AddMuteOperationResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc csync.Service.ScanMuteOperations
     */
    scanMuteOperations: {
      name: "ScanMuteOperations",
      I: ScanMuteOperationsRequest,
      O: ScanMuteOperationsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Ping
     *
     * @generated from rpc csync.Service.Ping
     */
    ping: {
      name: "Ping",
      I: PingRequest,
      O: PingResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

