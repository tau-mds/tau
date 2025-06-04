import { queryOptions, useMutation } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { db, schema } from "@tau/db";
import { ids } from "@tau/db/ids";
import * as v from "valibot";
import { interviewerMiddleware } from "../middlewares/interviewer-middleware";

export * from "./interviewer";

const ScheduleValidator = v.object({
  roundId: ids.interview_round,
  schedule_times: v.array(v.string()),
});

const scheduleInterview = createServerFn({ method: "POST" })
  .validator(ScheduleValidator)
  .middleware([interviewerMiddleware])
  .handler(async ({ context, data }) => {
    const userId = context.session?.user?.id;
    const userEmail = context.session?.user?.email;

    if (!userId || !userEmail) {
      console.error("Middleware failed to attach user or user ID/email in POST handler.");
      throw new Error("Unauthorized: Authentication context missing.");
    }

    const { roundId, schedule_times } = data;

    const scheduledInterviews = schedule_times.map((schedule) => ({
      id: ids.generate(ids.interview_slot),
      interview_round_id: roundId,
      interviewer_email: userEmail,
      start_at: new Date(schedule),
      assigned_at: null,
    }));

    await db.insert(schema.interview_slot).values(scheduledInterviews);

    return { success: true, insertedCount: scheduledInterviews.length };
  });

export const queries = {
  scheduleInterview: (input: {
    roundId: ids.interview_round;
    schedule_times: string[];
  }) =>
    queryOptions({
      queryKey: ["interviewSlots", input.roundId, "schedule"],
      queryFn: (opts) =>
        scheduleInterview({
          data: input,
          signal: opts.signal,
        }),
    }),
};

export const mutations = {
  scheduleInterview: () =>
    useMutation({
      mutationFn: (input: {
        roundId: ids.interview_round;
        schedule_times: string[];
      }) => scheduleInterview({ data: input }),
    }),
};

// Export the hook like in interview-rounds
export function useScheduleInterview() {
  return useMutation({
    mutationFn: (input: {
      roundId: ids.interview_round;
      schedule_times: string[];
    }) => scheduleInterview({ data: input }),
  });
}
