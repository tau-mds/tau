import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { type Session, auth } from "@tau/auth-server";

/** @deprecated please use `middleware.auth` */
export const authMiddleware = createMiddleware().server(async ({ next }) => {
	// Getting the user session in backend
	const request = getWebRequest();

	let session: Session | null = null;

	if (!request) {
		return next({
			context: {
				session: null as Session | null,
			},
		});
	}

	const { headers } = request;
	session = await auth.api.getSession({ headers });

	return next({
		context: {
			session,
		},
	});
});
