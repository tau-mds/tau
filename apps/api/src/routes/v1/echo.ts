import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/valibot";
import * as v from "valibot";
// import { z } from "zod";

// import { result } from "~/lib/result";

function jsonContent<T extends v.GenericSchema>(
	schema: T,
	description: string,
	example?: unknown,
) {
	return {
		content: {
			"application/json": { schema: resolver(schema), example },
		},
		description,
	};
}

// const safeParseSchema: v.GenericSchema<v.SafeParseResult<any>> = v.object({
// 	typed: v.boolean(),
// 	success: v.boolean(),
// 	issues: v.array(
// 		v.object({
// 			kind: v.string(),
// 			type: v.string(),
// 			expected: v.nullable(v.string()),
// 			received: v.string(),
// 			message: v.string(),
// 			path: v.optional(v.array(v.lazy(() => safeParseSchema))),
// 		}),
// 	),
// });

function validationError<T extends v.GenericSchema>(_: T) {
	// @ts-ignore
	const res: v.GenericSchema<v.SafeParseResult<T>> = v.object({
		typed: v.boolean(),
		output: v.unknown(),
		success: v.boolean(),
		issues: v.array(
			v.object({
				kind: v.string(),
				type: v.string(),
				expected: v.nullable(v.string()),
				received: v.string(),
				message: v.string(),
				path: v.optional(v.array(v.lazy(() => res))),
			}),
		),
	});
	return res;
}

export namespace EchoApi {
	const request = v.object({
		message: v.pipe(
			v.string(),
			v.minLength(1),
			v.maxLength(255),
			v.description("Message for echoing"),
		),
	});
	// const request = z.object({
	// 	message: z.string().min(1).max(255),
	// });

	const response = v.pipe(
		v.object({
			message: v.pipe(v.string(), v.description("The echoed message")),
		}),
	);

	const route = describeRoute({
		tags: ["echo"],
		operationId: "echo",
		method: "post",
		path: "/v1/echo",
		summary: "Echo message",
		description: "Echo a sent message.",
		security: [{ bearerAuth: [] }],
		responses: {
			200: jsonContent(response, ""),
			400: jsonContent(
				validationError(request),
				"Validation errors",
				v.safeParse(request, { message: "" }),
			),

			// {
			// 	content: {
			// 		"application/json": {
			// 			schema: result(response),
			// 			example: { data: { message: "Hello, world" } },
			// 		},
			// 	},
			// },
			// 400: jsonContent(request["~run"]({ value: {} }, ""), "Errors"),
		},
	});

	export const register = new Hono().post("/", route, validator("json", request), (c) => {
		console.debug("called");
		const body = c.req.valid("json");
		return c.json({ data: { message: `Hello, ${body.message}` } }, 201);
	});
}
