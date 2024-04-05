import {
  ControllerExceptionCodes,
  DomainExceptionCodes,
  ExceptionKinds,
  ExceptionType,
  RepositoryExceptionCodes,
  ServiceExceptionCodes,
} from "./types";
import { getEnumKeyByEnumValue } from "./utils";

type ExceptionTargetEnums =
  | typeof ControllerExceptionCodes
  | typeof ServiceExceptionCodes
  | typeof RepositoryExceptionCodes
  | typeof DomainExceptionCodes;
class Exception extends Error {
  protected type: ExceptionType;
  protected enum: ExceptionTargetEnums;

  constructor(
    exceptionType: ExceptionType & {
      enum: ExceptionTargetEnums;
    },
    error: Error,
  );
  constructor(
    exceptionType: ExceptionType & {
      enum: ExceptionTargetEnums;
    },
    message: string,
  );
  constructor(
    exceptionType: ExceptionType & {
      enum: ExceptionTargetEnums;
    },
    title: string,
    message: string,
  );
  constructor(
    exceptionType: ExceptionType & {
      enum: ExceptionTargetEnums;
    },
    unknown: any,
  );
  constructor(
    exceptionType: ExceptionType & {
      enum: ExceptionTargetEnums;
    },
    arg1?: any,
    arg2?: any,
  ) {
    super();

    this.type = exceptionType;
    this.enum = exceptionType.enum;

    if (arg1 instanceof Error) {
      super.name = this.generateErrorName(arg1.name);
      super.message = arg1.message;
    } else if (typeof arg1 === "string" && typeof arg2 === "string") {
      super.name = this.generateErrorName(arg1);
      super.message = arg1;
    } else if (typeof arg1 === "string" && arg2 === undefined) {
      super.name = this.generateErrorName(null);
      super.message = arg1;
    } else {
      super.name = this.generateErrorName(null);
      super.message = JSON.stringify(arg1);
    }
  }

  generateErrorName(name: string | null) {
    if (name == null) {
      return `[${getEnumKeyByEnumValue(this.enum, this.type.code)}]<${this.type.kind}:${this.type.code}>`;
    }
    return `[${getEnumKeyByEnumValue(this.enum, this.type.code)}]<${this.type.kind}:${this.type.code}>: ${name}`;
  }

  // protected generateErrorName(name: string | null) {
  //   if (name == null) {
  //     return `[${this.type.kind}](${this.type.code})`;
  //   }
  //   return `[${this.type.kind}](${this.type.code}): ${name}`;
  // }
}

export class ControllerException extends Exception {
  constructor(code: ControllerExceptionCodes, error: Error);
  constructor(code: ControllerExceptionCodes, message: string);
  constructor(code: ControllerExceptionCodes, title: string, message: string);
  constructor(code: ControllerExceptionCodes, unknown: any);
  constructor(code: ControllerExceptionCodes, arg1?: any, arg2?: any) {
    super(
      {
        kind: ExceptionKinds.controllerException,
        code: code,
        enum: ControllerExceptionCodes,
      },
      arg1,
      arg2,
    );
  }
}

export class ServiceException extends Exception {
  constructor(code: ServiceExceptionCodes, error: Error);
  constructor(code: ServiceExceptionCodes, message: string);
  constructor(code: ServiceExceptionCodes, title: string, message: string);
  constructor(code: ServiceExceptionCodes, unknown: any);
  constructor(code: ServiceExceptionCodes, arg1?: any, arg2?: any) {
    super(
      {
        kind: ExceptionKinds.serviceException,
        code: code,
        enum: ServiceExceptionCodes,
      },
      arg1,
      arg2,
    );
  }
}

export class RepositoryException extends Exception {
  constructor(code: RepositoryExceptionCodes, error: Error);
  constructor(code: RepositoryExceptionCodes, message: string);
  constructor(code: RepositoryExceptionCodes, title: string, message: string);
  constructor(code: RepositoryExceptionCodes, unknown: any);
  constructor(code: RepositoryExceptionCodes, arg1?: any, arg2?: any) {
    super(
      {
        kind: ExceptionKinds.repositoryException,
        code: code,
        enum: RepositoryExceptionCodes,
      },
      arg1,
      arg2,
    );
  }
}

export class DomainException extends Exception {
  constructor(code: DomainExceptionCodes, error: Error);
  constructor(code: DomainExceptionCodes, message: string);
  constructor(code: DomainExceptionCodes, title: string, message: string);
  constructor(code: DomainExceptionCodes, unknown: any);
  constructor(code: DomainExceptionCodes, arg1?: any, arg2?: any) {
    super(
      {
        kind: ExceptionKinds.domainException,
        code: code,
        enum: DomainExceptionCodes,
      },
      arg1,
      arg2,
    );
  }
}
