import { createServerFn } from "@tanstack/react-start";
import { middleware } from "../middlewares";
import { db, type schema } from "@tau/db";
import { ids } from "@tau/db/ids";
import { queryOptions } from "@tanstack/react-query";
import * as v from "valibot";

export * as interviewSlots from "./interview-slots";

export const queries = {
  ofRound: (id: ids.interview_round) =>
    queryOptions({
      queryKey: ["interviewSlots", id],
      queryFn: (opts) =>
        ofRound({ data: { id }, signal: opts.signal }) as Promise<
          Array<
            schema.interview_slot & {
              interviewer: schema.interviewer;
            }
          >
        >,
    }),

  ofRoundAndInterviewer: (roundId: ids.interview_round, interviewerEmail: string) =>
    queryOptions({
      queryKey: ["interviewSlots", roundId, "interviewer", interviewerEmail],
      queryFn: (opts) =>
        ofRoundAndInterviewer({
          data: { roundId, interviewerEmail },
          signal: opts.signal,
        }) as Promise<Array<schema.interview_slot>>,
    }),
};

const ofRound = createServerFn({ method: "GET" })
  .middleware([middleware.assertOrganizesRound])
  .handler(async ({ context }) => {
    const slots = await db.query.interview_slot.findMany({
      columns: { id: true, start_at: true },
      with: { interviewer: true },
      where: (slot, op) => op.eq(slot.interview_round_id, context.round.id),
    });

    return slots;
  });

const ofRoundAndInterviewer = createServerFn({ method: "GET" })
  .middleware([middleware.auth])
  .validator(
    v.object({
      roundId: ids.interview_round,
      interviewerEmail: v.pipe(v.string(), v.email()),
    }),
  )
  .handler(async ({ data }) => {
    const slots = await db.query.interview_slot.findMany({
      where: (slot, op) =>
        op.and(
          op.eq(slot.interview_round_id, data.roundId),
          op.eq(slot.interviewer_email, data.interviewerEmail),
        ),
      orderBy: (slot, op) => op.asc(slot.start_at),
    });

    return slots;
  });
