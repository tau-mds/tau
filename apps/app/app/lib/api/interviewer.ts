import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { db, schema } from "@tau/db";
import { ids } from "@tau/db/ids";
import { and, eq } from "drizzle-orm";
import * as v from "valibot";
import { authMiddleware } from "../middlewares/auth-middleware";
import { organizerMiddleware } from "../middlewares/organizer-middleware";
import { interviewerMiddleware } from "../middlewares/interviewer-middleware";

export * from "./interviewer";

const ScheduleValidator = v.object({
  roundId: v.string("Round ID must be a string"),
  schedule_times: v.array(v.string()),
});

const scheduleInterview = createServerFn({ method: "POST" })
  .validator(ScheduleValidator)
  .middleware([interviewerMiddleware])
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

    const scheduled_interviews = data.schedule_times.map((schedule) => {
      return {
        id: ids.interviewSlot.new(),
        interview_round_id: roundId,
        interviewer_email: userEmail,
        start_at: new Date(schedule),
        assigned_at: null,
      };
    });

    await db.insert(schema.interview_slot).values(scheduled_interviews);
  });
