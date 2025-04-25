import { validator as vvalidator } from "hono-openapi/valibot";
import { response } from "./response";
import type * as v from "valibot";
import type { ValidationTargets } from "hono";

export function validator<
  T extends v.GenericSchema,
  Target extends keyof ValidationTargets,
>(target: Target, schema: T) {
  return vvalidator(target, schema, (res, c) => {
    if (res.success) {
      return;
    }

    if (res.issues.length === 0) {
      return response.bad_request(c, "Invalid request data");
    }

    return response.validation(c, res.issues);
  });
}
