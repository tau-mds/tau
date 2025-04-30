import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import { db } from "@tau/db";

export * as echo from "./echo";

const handler = createServerFn({ method: "GET" })
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
	.handler(async () => {
		return "Hello, this is hardcoded, tho";
	});

export const queries = {
	plm: (data: Parameters<typeof handler>[0]["data"]) =>
		queryOptions({
			queryKey: ["echo"],
			queryFn: () => handler({ data }),
		}),
};
