import { reqId } from "@tau/utils";
import { createMiddleware } from "hono/factory";

export const REQ_ID = "req_id";
const REQ_ID_HEADER = "Tau-Request-Id";

// biome-ignore format:
export const requestId = () =>
  createMiddleware(async (c, next) => {
    const id = reqId();
    c.set(REQ_ID, id);
    c.res.headers.set(REQ_ID_HEADER, id);

    await next();
  });
