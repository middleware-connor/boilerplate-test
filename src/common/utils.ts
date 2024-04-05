import { either as E, option as O } from "fp-ts";
import typia, { IValidation } from "typia";
import crypto from "crypto";
import { NonEmptyString } from "./types";

export function getEnumKeyByEnumValue(myEnum: any, enumValue: any): string | null {
  const keys = Object.keys(myEnum).find((key) => myEnum[key] === enumValue);
  return keys ?? null;
}

export function eitherGetOrThrow<E, A>(arg: E.Either<E, A>): A {
  if (E.isLeft(arg)) {
    throw arg.left;
  }
  return arg.right;
}

export function optionGetOrUndefined<T>(optionValue: O.Option<T>): T | undefined {
  return O.isNone(optionValue) ? undefined : optionValue.value;
}

export namespace Option {
  /**
   * transformer 사용을 위해서는 validation 함수에 직접적으로 interface 가 입력되어야 하므로
   * Generic 함수 안에서 typia.validate 함수를 호출 할 수 없음
   */
  export function fromValidation<T>(result: typia.IValidation<T>): O.Option<T> {
    if (!result.success) {
      return O.none;
    }
    return O.some(result.data);
  }
}

export function hashPassword(password: NonEmptyString, salt: NonEmptyString) {
  const hash = crypto.createHash("sha256");
  hash.update(`${password}${salt}`);
  return hash.digest("hex");
}
