import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import { getWebRequest } from "@tanstack/react-start/server";
import { authClient } from "@tau/auth-client";
import { auth } from "@tau/auth-server";
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
		// // Getting the user session
		// const request = getWebRequest();
		// if (!request) {
		// 	return "No request found";
		// }

		// const { headers } = request;
		// const session = await auth.api.getSession({ headers });
		// console.log(session);

		return "Hello, this is hardcoded, tho";
	});

export const queries = {
	plm: (data: Parameters<typeof handler>[0]["data"]) =>
		queryOptions({
			queryKey: ["echo"],
			queryFn: () => handler({ data }),
		}),
};
