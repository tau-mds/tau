import type { Context } from "hono";
import type * as v from "valibot";

export * as response from "./response";

export function ok<const T>(c: Context, data: T) {
  return c.json({ code: "ok", status: "completed", error: null, data }, 200);
}

export function created<const T>(c: Context, data: T) {
  return c.json(
    { code: "created", status: "completed", error: null, data },
    201,
  );
}

export function bad_request(c: Context, error: string) {
  return c.json(
    {
      code: "bad_request",
      status: "failed",
      data: null,
      error: { message: error },
    },
    400,
  );
}

export function validation<E extends v.GenericIssue>(
  c: Context,
  errors: E["issues"],
) {
  return c.json(
    {
      code: "validation",
      status: "failed",
      errors: errors?.map((i) => ({
        code: i.type,
        expected: i.expected,
        received: i.received,
        message: i.message,
        path: i.path,
      })),
      data: null,
    },
    400,
  );
}
