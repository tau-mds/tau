import { createMiddleware } from "@tanstack/react-start";
import * as v from "valibot";

import { db } from "@tau/db";
import { ids } from "@tau/db/ids";
import { assert } from "@tau/utils";

import { organizer } from "./organizer";

export const assertOrganizesRound = createMiddleware()
  .middleware([organizer])
  .validator(v.looseObject({ id: ids.interview_round }))
  .server(async ({ context, data, next }) => {
    const round = await db.query.interview_round.findFirst({
      where: (round, op) =>
        // op.and(
        op.eq(round.id, data.id),
      // op.eq(round.organizer_id, context.organizerId)),
    });
    assert(!!round, "Round could not be found");

    return next({ context: { round } });
  });
