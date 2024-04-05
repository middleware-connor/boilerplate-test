import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
/* eslint-disable @typescript-eslint/no-floating-promises */
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";
import { EnvironmentService } from "./framework/modules/environment/environment.service";
import { NamingStrategyInterceptor } from "./framework/interceptors/naming-strategy.interceptor";
import { ResponseTypesInterceptor } from "./framework/interceptors/response-types.interceptor";

(async () => {
  const expressAdapter = new ExpressAdapter();
  expressAdapter.get("/", (req, res) => {
    res.send();
  });
  const app = await NestFactory.create<NestExpressApplication>(AppModule, expressAdapter, { cors: true });

  app.useGlobalInterceptors(
    new NamingStrategyInterceptor(),
    new ResponseTypesInterceptor(), // 가장 마지막에 위치할 것
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 변환을 활성화
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  const environmentService: EnvironmentService = app.get<EnvironmentService>(EnvironmentService);

  app.setGlobalPrefix("/api");
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: "v",
  });

  const port = environmentService.get("SERVER_PORT");
  const hostname = environmentService.get("HOSTNAME");

  console.log(`Start server: hostname: ${hostname}, port: ${port}`);
  await app.listen(port, hostname);
})();
