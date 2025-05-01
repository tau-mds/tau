import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { auth, type Session } from "@tau/auth-server";

export const authMiddleware = createMiddleware().server(async ({ next, data }) => {
	// Getting the user session in backend
	const request = getWebRequest();

	let session: Session | null = null;

	if (!request) {
		return next({
			context: {
				session: session as Session | null,
			},
		});
	}

	const { headers } = request;
	session = await auth.api.getSession({ headers });
	console.log("Session:", session);

	console.log("Request received:", data);
	return next({
		context: {
			session,
		},
	});
});
