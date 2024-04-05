import path from "path";
import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { EnvironmentService } from "./environment.service";
import { ENV } from "@/common/constants";
import { validate } from "./environment.validation";

function getEnvFilePath() {
  return path.join(process.cwd(), `/env/.env.${process.env.NODE_ENV ?? ENV.local}`);
}

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [getEnvFilePath()],
      isGlobal: true,
      cache: true,
      validate,
    }),
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
