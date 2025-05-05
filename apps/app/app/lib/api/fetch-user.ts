import { createServerFn } from "@tanstack/react-start";

import { middleware } from "~/lib/middlewares";

/** @deprecated please use `api.users.current` */
export const fetchUser = createServerFn({ method: "GET" })
	.middleware([middleware.auth])
	.handler(async ({ context }) => {
		return context.session?.user;
	});
