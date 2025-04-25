import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { describeRoute } from "hono-openapi";

import { response } from "~/lib/response";
import { openapi } from "~/lib/openapi";

export * as error from "./errors";

export function common() {
  return describeRoute({
    responses: {
      ...openapi.unauthorized(),
      ...openapi.too_many_requests(),
      ...openapi.internal_server_error(),
    },
  });
}

export const handle: ErrorHandler = (err, c) => {
  if (err instanceof HTTPException) {
    console.error("HTTP Error:", err);
    return response.bad_request(c, "Invalid request");
  }

  console.error("Unhandled error:", err);
  return response.bad_request(c, "Internal server error");
};
