import { tags } from "typia";

import { ENV } from "./constants";
import { MinLength, Minimum } from "typia/lib/tags";

export type ValueOf<T> = T[keyof T];
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
}

export type Env = ValueOf<typeof ENV>;

export type PortNumber = tags.TagBase<{
  kind: "PortNumber";
  target: "number";
  value: undefined;
  validate: `$input < 65536 && $input > 0`;
}>;

export type NonEmptyString = string & MinLength<1>;
export type ZeroPositiveNumber = number & Minimum<0>;
export type PositiveNumber = number & Minimum<1>;
export type Nullable<T> = T | undefined;

export enum ExceptionKinds {
  controllerException = "controller_exception",
  serviceException = "service_exception",
  repositoryException = "repository_exception",
  domainException = "domain_exception",
}

export enum ControllerExceptionCodes {
  unknown = 1,
  validationFailed = 2,
}

export enum ServiceExceptionCodes {
  unknown = 1,
  validationFailed = 2,
}

export enum RepositoryExceptionCodes {
  unknown = 1,
  validationFailed = 2,
}

export enum DomainExceptionCodes {
  unknown = 1,
  validationFailed = 2,
}

export interface ControllerExceptionType {
  kind: ExceptionKinds.controllerException;
  code: ControllerExceptionCodes;
}

export interface ServiceExceptionType {
  kind: ExceptionKinds.serviceException;
  code: ServiceExceptionCodes;
}

export interface RepositoryExceptionType {
  kind: ExceptionKinds.repositoryException;
  code: RepositoryExceptionCodes;
}

export interface DomainExceptionType {
  kind: ExceptionKinds.domainException;
  code: DomainExceptionCodes;
}

export type ExceptionType =
  | ControllerExceptionType
  | ServiceExceptionType
  | RepositoryExceptionType
  | DomainExceptionType;
