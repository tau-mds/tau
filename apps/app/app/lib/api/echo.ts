import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import { authMiddleware } from "../middlewares/auth-middleware";

export * as echo from "./echo";

const handler = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.validator(
		v.object({
			salute: v.picklist(["Hi", "Hello", "Hola"]),
			message: v.pipe(
				v.string(),
				v.minLength(1),
				v.maxLength(255),
				v.description("Message for echoing"),
			),
		}),
	)
	.handler(async ({ context }) => {
		context.session?.user;

		return "Hello, this is hardcoded, tho";
	});

export const queries = {
	plm: (data: Parameters<typeof handler>[0]["data"]) =>
		queryOptions({
			queryKey: ["echo"],
			queryFn: () => handler({ data }),
		}),
};
