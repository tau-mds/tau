import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { db, schema } from "@tau/db";
import { ids } from "@tau/db/ids";
import { and, eq, isNull, not } from "drizzle-orm";
import * as v from "valibot";
import { authMiddleware } from "../middlewares/auth-middleware";
import { organizerMiddleware } from "../middlewares/organizer-middleware";
import { interviewerMiddleware } from "../middlewares/interviewer-middleware";
import { intervieweeMiddleware } from "../middlewares/interviewee-middleware";

export * from "./interviewee";

const ReserveInterviewValidator = v.object({
  roundId: v.string(),
  scheduled_time: v.string(),
  interviewer_email: v.pipe(v.string(), v.email()),
});

const reserveInterview = createServerFn({ method: "POST" })
  .middleware([intervieweeMiddleware])
  .validator(ReserveInterviewValidator)
  .handler(async ({ context, data }) => {
    const userId = context.session?.user?.id;

    if (!userId) {
      console.error(
        "Middleware failed to attach user or user ID in POST handler."
      );
      throw new Error("Unauthorized: Authentication context missing.");
    }
    const roundId: string & v.Brand<"ivro_id"> = data.roundId as string &
      v.Brand<"ivro_id">;

    const userEmail = context.session?.user?.email;

    const interviewer = await db.query.interviewer.findFirst({
      where: and(
        eq(schema.interviewer.interview_round_id, roundId),
        eq(schema.interviewer.email, data.interviewer_email)
      ),
    });

    if (!interviewer) {
      throw new Error("Inexistent interviewer!");
    }

    const alreadyResearved = await db
      .select()
      .from(schema.interview_slot)
      .where(
        and(
          eq(schema.interview_slot.interviewee_email, userEmail),
          eq(schema.interview_slot.interview_round_id, roundId)
        )
      );

    if (alreadyResearved.length > 0) {
      throw new Error("Unathorized: Already booked an interview!");
    }

    await db
      .update(schema.interview_slot)
      .set({
        interviewee_email: userEmail,
        assigned_at: new Date(),
      })
      .where(
        and(
          eq(schema.interview_slot.interviewer_email, data.interviewer_email),
          eq(schema.interview_slot.interview_round_id, roundId),
          eq(schema.interview_slot.start_at, new Date(data.scheduled_time)),
          isNull(schema.interview_slot.interviewee_email)
        )
      );

    const condition = and(
      eq(schema.interview_slot.interviewer_email, data.interviewer_email),
      eq(schema.interview_slot.interview_round_id, roundId),
      isNull(schema.interview_slot.interviewee_email)
    );

    const interviewerReservation = await db
      .select()
      .from(schema.interview_slot)
      .where(condition);

    if (interviewer?.interviews_count <= interviewerReservation.length) {
      await db.delete(schema.interview_slot).where(condition);
    }
  });
