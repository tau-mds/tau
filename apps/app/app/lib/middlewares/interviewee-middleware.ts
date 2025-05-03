import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { type Session, auth } from "@tau/auth-server";
import { db, schema } from "@tau/db";
import { and, eq } from "drizzle-orm";

export const organizerMiddleware = createMiddleware().server(
	async ({ next, data }: any) => {
		const request = getWebRequest();

		if (!request) {
			throw new Error("Unauthorized: No request found");
		}

		const session: Session | null = await auth.api.getSession({
			headers: request.headers,
		});

		if (!session?.user?.id) {
			throw new Error("Unauthorized: No user session");
		}

		const roundId = data?.roundId;

		if (!roundId) {
			throw new Error("Bad Request: Missing roundId");
		}

		const round = await db.query.interview_round.findFirst({
			where: eq(schema.interview_round.id, roundId),
		});

		if (!round) {
			throw new Error("Not Found: Interview round does not exist");
		}

		if (round.status !== "schedule") {
			throw new Error("Forbidden: You do not own this interview round");
		}

		const interviewee = await db.query.interviewee.findFirst({
			where: and(
				eq(schema.interviewee.interview_round_id, roundId),
				eq(schema.interviewee.email, session.user.email),
			),
		});

		if (interviewee) {
			throw new Error("Forbidden: You are not invited to this interview round");
		}

		// Authorized, continue with context
		return next({
			context: {
				session,
			},
		});
	},
);
