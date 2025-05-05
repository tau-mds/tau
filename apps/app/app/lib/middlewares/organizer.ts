import { createMiddleware } from "@tanstack/react-start";
import { middleware } from "~/lib/middlewares";
import { assert } from "@tau/utils";
import * as v from "valibot";
import { ids } from "@tau/db/ids";

export const organizer = createMiddleware()
	.middleware([middleware.auth])
	.server(async ({ context, next }) => {
		assert(!!context.session?.user.id, "Unauthorized: No user session");

		const organizerId = v.parse(ids.organizer, context.session.user.id);

		return next({
			context: { organizerId },
		});
	});
