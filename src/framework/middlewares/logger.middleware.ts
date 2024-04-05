import { Request, Response } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: Request, res: Response, next: () => void) {
    const start = Date.now();
    const baseUrl = req.baseUrl;
    res.once("finish", () => {
      const latency = Date.now() - start;
      console.log(req.method, res.statusCode, baseUrl, latency + "ms", JSON.stringify(req.body, null, 2), req.query);
    });
    next();
  }
}
