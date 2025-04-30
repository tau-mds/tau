import { createAPIFileRoute } from "@tanstack/react-start/api";
import { auth } from "@tau/auth-server"; // import your auth instance

export const APIRoute = createAPIFileRoute("/api/auth/$")({
	GET: ({ request }) => {
		return auth.handler(request);
	},
	POST: ({ request }) => {
		return auth.handler(request);
	},
});
