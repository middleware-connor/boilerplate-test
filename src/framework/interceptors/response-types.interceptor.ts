import { map } from "rxjs";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";

export class ResponseTypesInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((responseBody) => {
        if (typeof responseBody === "string") {
          return JSON.parse(responseBody);
        }
        return responseBody;
      }),
    );
  }
}
