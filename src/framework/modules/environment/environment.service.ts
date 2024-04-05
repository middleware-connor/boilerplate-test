import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { ENV } from "@/common/constants";
import { EnvironmentKey, EnvironmentVariable } from "./environment.validation";

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  get<T extends EnvironmentKey>(key: T): EnvironmentVariable[T] {
    const configValue = this.configService.get<EnvironmentVariable[T]>(key);
    if (configValue === undefined) {
      throw new Error(`Config is not exists: ${key}`);
    }
    return configValue;
  }

  isLocal(): boolean {
    return this.get("ENV") === ENV.local;
  }

  isDev(): boolean {
    return this.get("ENV") === ENV.dev;
  }

  isProduction(): boolean {
    return this.get("ENV") === ENV.prod;
  }
}
