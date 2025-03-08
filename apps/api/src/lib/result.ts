import * as v from "valibot";
import { resolver } from "hono-openapi/valibot";

import { z } from "zod";
import { resolver as resolverz } from "hono-openapi/zod";

export function result<T extends v.GenericSchema>(schema: T) {
	return resolver(v.object({ data: schema }));
}

export function resultz<T extends z.ZodTypeAny>(schema: T) {
	return resolverz(z.object({ data: schema }));
}
