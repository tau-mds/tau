import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { db, schema } from "@tau/db";
import { ids } from "@tau/db/ids";
import { and, eq, isNull } from "drizzle-orm";
import * as v from "valibot";
import { intervieweeMiddleware } from "../middlewares/interviewee-middleware";
import { resend, Email } from "@tau/email";
import { render } from "@react-email/components";

export * from "./interviewee";

const ReserveInterviewValidator = v.object({
  roundId: ids.interview_round,
  scheduled_time: v.string(),
  interviewer_email: v.pipe(v.string(), v.email()),
});

const reserveInterview = createServerFn({ method: "POST" })
  .middleware([intervieweeMiddleware])
  .validator(ReserveInterviewValidator)
  .handler(async ({ context, data }) => {
    const userId = context.session?.user?.id;
    const userEmail = context.session?.user?.email;

    if (!userId || !userEmail) {
      console.error(
        "Middleware failed to attach user or user ID/email in POST handler."
      );
      throw new Error("Unauthorized: Authentication context missing.");
    }

    const { roundId, scheduled_time, interviewer_email } = data;

    // Check if interviewer exists for the round
    const interviewer = await db.query.interviewer.findFirst({
      where: and(
        eq(schema.interviewer.interview_round_id, roundId),
        eq(schema.interviewer.email, interviewer_email)
      ),
    });

    if (!interviewer) {
      throw new Error("Inexistent interviewer!");
    }

    // Check if user already booked an interview in this round
    const alreadyReserved = await db
      .select()
      .from(schema.interview_slot)
      .where(
        and(
          eq(schema.interview_slot.interviewee_email, userEmail),
          eq(schema.interview_slot.interview_round_id, roundId)
        )
      );

    if (alreadyReserved.length > 0) {
      throw new Error("Conflict: Interview already booked!");
    }

    // Assign interview slot to the user
    const updated = await db
      .update(schema.interview_slot)
      .set({
        interviewee_email: userEmail,
        assigned_at: new Date(),
      })
      .where(
        and(
          eq(schema.interview_slot.interviewer_email, interviewer_email),
          eq(schema.interview_slot.interview_round_id, roundId),
          eq(schema.interview_slot.start_at, new Date(scheduled_time)),
          isNull(schema.interview_slot.interviewee_email)
        )
      );

    // Check remaining slots for interviewer
    const condition = and(
      eq(schema.interview_slot.interviewer_email, interviewer_email),
      eq(schema.interview_slot.interview_round_id, roundId),
      isNull(schema.interview_slot.interviewee_email)
    );

    const remainingSlots = await db
      .select()
      .from(schema.interview_slot)
      .where(condition);

    // If interviewer has no remaining slots, delete those slots
    if (interviewer.interviews_count <= remainingSlots.length) {
      await db.delete(schema.interview_slot).where(condition);
    }

    // Sending notification emails to the interviewer and interviewee!
    const interviewerJSX = Email.InterviewConfirmationEmail({
      recipientName: "None",
      interviewer: interviewer.email,
      candidate: userEmail,
      date: scheduled_time,
      role: "interviewer",
      time: scheduled_time,
      location: "NONE",
    });

    const interviewerHTML = render(interviewerJSX);

    const intervieweeJSX = Email.InterviewConfirmationEmail({
      recipientName: "None",
      interviewer: interviewer.email,
      candidate: userEmail,
      date: scheduled_time,
      role: "candidate",
      time: scheduled_time,
      location: "NONE",
    });

    const intervieweeHTML = render(intervieweeJSX);

    await resend.emails.send({
      from: "Răzvan <onboarding@resend.dev>",
      to: [interviewer.email],
      subject: "Interview Schedule Confirmation",
      html: interviewerHTML,
    });

    await resend.emails.send({
      from: "Răzvan <onboarding@resend.dev>",
      to: [userEmail],
      subject: "Interview Scheduling Confirmartion",
      html: intervieweeHTML,
    });

    return { success: true, updatedRows: updated.rowsAffected };
  });

export const queries = {
  reserveInterview: (input: {
    roundId: ids.interview_round;
    scheduled_time: string;
    interviewer_email: string;
  }) =>
    queryOptions({
      queryKey: [
        "interviewSlots",
        input.roundId,
        "reserve",
        input.interviewer_email,
        input.scheduled_time,
      ],
      queryFn: (opts) =>
        reserveInterview({
          data: input,
          signal: opts.signal,
        }),
    }),
};
