import { INestiaConfig } from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./src/app.module";
import { VersioningType } from "@nestjs/common";
import { ExpressAdapter } from "@nestjs/platform-express";

const NESTIA_CONFIG: INestiaConfig = {
  input: async () => {
    const expressAdapter = new ExpressAdapter();
    const app = await NestFactory.create(AppModule, expressAdapter);
    app.setGlobalPrefix("api");
    app.enableVersioning({
      type: VersioningType.URI,
      prefix: "v",
    });
    return app;
  },
  swagger: {
    output: "docs/swagger.json",
    beautify: true,
    security: {
      bearer: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "LOCAL",
      },
      {
        url: "https://dev.middleware.torder.co.kr",
        description: "DEV",
      },
      {
        url: "https://middleware.torder.co.kr",
        description: "PROD",
      },
    ],
  },
  output: "src/api",
  distribute: "packages/api",
};
export default NESTIA_CONFIG;
