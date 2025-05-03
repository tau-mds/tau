import { createMiddleware } from "@tanstack/react-start";
import { db, schema } from "@tau/db";
import { eq } from "drizzle-orm";
import { getWebRequest } from "@tanstack/react-start/server";
import { type Session, auth } from "@tau/auth-server";

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

    const userId = session.user.id;
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

    if (round.organizer_id !== userId) {
      throw new Error("Forbidden: You do not own this interview round");
    }

    // Authorized, continue with context
    return next({
      context: {
        session,
      },
    });
  }
);
