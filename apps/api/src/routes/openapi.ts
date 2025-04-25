import { Hono } from "hono";
import { openAPISpecs } from "hono-openapi";

import pkg from "package.json";
import { url } from "~/lib/url";

export namespace OpenapiApi {
  export function register(routes: Hono) {
    return new Hono().get("/", (c, next) =>
      openAPISpecs(routes, {
        documentation: {
          info: {
            title: pkg.name,
            description: pkg.description,
            version: pkg.version,
          },
          servers: [
            { url: url(), description: "Local Server" },
            { url: "https://api.tau.com", description: "Production" },
          ],
          components: {
            securitySchemes: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
              },
            },
          },
          security: [{ bearerAuth: [] }],
        },
      })(c, next),
    );
  }
}
