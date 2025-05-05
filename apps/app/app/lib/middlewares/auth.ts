import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { type Session, auth as authServer } from "@tau/auth-server";

export const auth = createMiddleware().server(async ({ next }) => {
	const request = getWebRequest();
	if (!request) {
		return next({
			context: { session: null as Session | null },
		});
	}

	const session = await authServer.api.getSession({ headers: request.headers });
	return next({
		context: { session },
	});
});
