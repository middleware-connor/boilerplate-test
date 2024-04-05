import path from "path";
import { ENV } from "@/common/constants";
import { Env, PortNumber } from "@/common/types";
import typia from "typia";

export const getEnvFilePath = (): string =>
  path.join(process.cwd(), `/env/.env.${process.env.NODE_ENV ?? ENV.local}`);

export interface EnvironmentVariable {
  ENV: Env;
  HOSTNAME: string;
  SERVER_PORT: number & PortNumber;
}

export type EnvironmentKey = keyof EnvironmentVariable;

export function validate(config: Record<keyof EnvironmentVariable, unknown>): EnvironmentVariable {
  const convertedConfig: Record<keyof EnvironmentVariable, unknown> = {
    ...config,
    SERVER_PORT: Number(config.SERVER_PORT),
  };
  const result = typia.validate<EnvironmentVariable>(convertedConfig);
  if (!result.success) {
    throw result.errors;
  }

  return result.data;
}
