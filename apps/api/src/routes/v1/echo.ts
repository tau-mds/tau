import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import * as v from "valibot";

import { response } from "~/lib/response";
import { openapi } from "~/lib/openapi";
import { validator } from "~/lib/validator";
import { db, foo } from "@tau/db";

export namespace EchoApi {
  export const request = v.object({
    salute: v.picklist(["Hi", "Hello", "Hola"]),
    message: v.pipe(
      v.string(),
      v.minLength(1),
      v.maxLength(255),
      v.description("Message for echoing"),
    ),
  });
  export type request = v.InferOutput<typeof request>;

  const route = describeRoute({
    tags: ["echo"],
    operationId: "echo",
    method: "post",
    path: "/v1/echo",
    security: [{ bearerAuth: [] }],
    responses: {
      ...openapi.ok(
        v.object({
          message: v.pipe(v.string(), v.description("The echoed message")),
        }),
        "Ba o mers",
      ),
      ...openapi.validation(),
    },
  });

  export const register = new Hono().post(
    "/",
    route,
    validator("json", request),
    async (c) => {
      const body = c.req.valid("json");
      const res = await db
        .select({ id: foo.table.id, bar: foo.table.bar })
        .from(foo.table)
        .then((r) => r[0]);
      return response.ok(c, {
        message: `${body.salute}, ${body.message}, ${res?.id}`,
      });
    },
  );
}
