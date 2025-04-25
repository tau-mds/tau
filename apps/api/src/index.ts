import { serve } from "@hono/node-server";
import { log } from "@tau/utils";
import { Hono } from "hono";

import { env } from "~/env";
import { logger } from "~/lib/middleware/logger";
import { requestId } from "~/lib/middleware/req-id";
import { error } from "~/lib/middleware/errors";

import { DocumentsApi } from "~/routes/docs";
import { OpenapiApi } from "~/routes/openapi";
import { EchoApi } from "~/routes/v1/echo";

const app = new Hono();

const routes = app
  .use(error.common())
  .route(
    "/v1",
    new Hono().use(requestId()).use(logger()).route("/echo", EchoApi.register),
  )
  .onError(error.handle);
export type routes = typeof routes;

app.route("/docs", DocumentsApi.route);
app.route("/openapi.json", OpenapiApi.register(routes));

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  log.info(`Server is running on http://localhost:${info.port}`);
});
