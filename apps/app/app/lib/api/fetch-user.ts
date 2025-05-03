import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "../middlewares/auth-middleware";

export * as echo from "./echo";

export const fetchUser = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return context.session?.user;
	});
