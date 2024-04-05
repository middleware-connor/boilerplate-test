import { TypedHeaders, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import * as Dto from "./health.controller.dto";

@ApiTags("[routes] health")
@Controller({
  path: "/health",
  version: "1",
})
export class HealthController {
  constructor() {}

  /**
   * 샘플용 Health Check Api
   *
   * @summary Sample Health Check
   */
  @TypedRoute.Get("/")
  public async get(
    @TypedHeaders() headers: Dto.V1.GET.Header,
  ): Promise<Dto.V1.GET.Response> {
    return {
      status: "ok"
    };
  }
}
