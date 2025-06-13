// External packages
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import * as v from "valibot";

// Internal packages
import { db, type schema } from "@tau/db";
import { ids } from "@tau/db/ids";

// local files
import { middleware } from "~/lib/middlewares";

export * as interviewSlots from "./interview-slots";

export const queries = {
  /**
   * Fetches all interview slots for a given interview round.
   *
   * @param id - The ID of the interview round.
   * @returns A query options object for fetching:
   * - Slot `id` (branded as `"ivsl_id"`)
   * - `start_at` timestamp
   * - Associated `interviewer` object
   *
   * The query function calls the server-side `ofRound` handler, which:
   * - Requires the user to organize the given round
   * - Queries `interview_slot` table with the matching `interview_round_id`
   * - Includes interviewer details in the response
   */
  ofRound: (id: ids.interview_round) =>
    queryOptions({
      queryKey: ["interviewSlots", id],
      queryFn: (opts) =>
        ofRound({ data: { id }, signal: opts.signal }) as Promise<
          Array<
            { id: string & v.Brand<"ivsl_id">; start_at: Date } & {
              interviewer: schema.interviewer;
            }
          >
        >,
    }),

  /**
   * Fetches interview slots for a specific round and interviewer.
   *
   * @param roundId - The ID of the interview round.
   * @param interviewerEmail - The email address of the interviewer.
   * @returns A query options object for fetching:
   * - A list of `schema.interview_slot` objects associated with both the round and interviewer.
   *
   * The query function calls the server-side `ofRoundAndInterviewer` handler, which:
   * - Requires authentication (`middleware.auth`)
   * - Validates `roundId` and `interviewerEmail`
   * - Queries the `interview_slot` table using both values
   * - Orders results by `start_at` in ascending order
   */
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
