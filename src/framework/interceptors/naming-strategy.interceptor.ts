import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

export class NamingStrategyInterceptor implements NestInterceptor {
  constructor() {}

  private convertHttpRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    request.body = camelcaseKeys(request.body);
  }

  private convertHttpResponse(next: CallHandler) {
    return next.handle().pipe(
      map((responseBody) => {
        return snakecaseKeys(responseBody);
      }),
    );
  }
  intercept(context: ExecutionContext, next: CallHandler) {
    this.convertHttpRequest(context);
    return this.convertHttpResponse(next);
  }
}
