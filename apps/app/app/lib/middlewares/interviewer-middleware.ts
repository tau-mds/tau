import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { type Session, auth } from "@tau/auth-server";
import { db, schema, and, eq } from "@tau/db";

export const interviewerMiddleware = createMiddleware().server(
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
      throw new Error("Forbidden: Interview round is not in schedule status");
    }

    const interviewer = await db.query.interviewer.findFirst({
      where: and(
        eq(schema.interviewer.interview_round_id, roundId),
        eq(schema.interviewer.email, session.user.email),
      ),
    });

    if (!interviewer) {
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
