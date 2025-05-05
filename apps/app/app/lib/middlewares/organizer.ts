import { createMiddleware } from "@tanstack/react-start";
import * as v from "valibot";
import { getWebRequest } from "vinxi/http";

import { auth } from "@tau/auth-server";
import { ids } from "@tau/db/ids";
import { assert } from "@tau/utils";

export const organizer = createMiddleware().server(async ({ next }) => {
	const request = getWebRequest();
	assert(!!request, "Cannot get request");

	const session = await auth.api.getSession({ headers: request.headers });

	assert(!!session?.user.id, "Unauthorized: No user session");
	const organizerId = v.parse(ids.organizer, session.user.id);

	return next({
		context: { session, organizerId },
	});
});
