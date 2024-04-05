import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { LoggerMiddleware } from "./framework/middlewares/logger.middleware";
import { EnvironmentModule } from "./framework/modules/environment/environment.module";
import { HealthControllerModule } from "./controllers/health/health.controller.module";

@Global()
@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class GlobalServiceModule {}

export const CONTROLLER_MODULES = [
  HealthControllerModule,
  // Controller module 은 모두 여기 넣어주세요. 
];

@Module({
  imports: [
    GlobalServiceModule,
    ...CONTROLLER_MODULES,
    EnvironmentModule,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(userContext: MiddlewareConsumer) {
    userContext.apply(LoggerMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
  }
}
