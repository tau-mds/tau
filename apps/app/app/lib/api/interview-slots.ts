import { createServerFn } from "@tanstack/react-start";
import { middleware } from "../middlewares";
import { db, type schema } from "@tau/db";
import type { ids } from "@tau/db/ids";
import { queryOptions } from "@tanstack/react-query";

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
