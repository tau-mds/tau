import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import { and, db, eq, inArray, schema, sql } from "@tau/db";
import { ids } from "@tau/db/ids";
import { toast } from "@tau/ui";
import { assert } from "@tau/utils";

import { interviewRounds } from "~/lib/core/interview-rounds";
import { middleware } from "~/lib/middlewares";
import { period } from "~/lib/types";

export * as interviewRounds from "./interview-rounds";

export const queries = {
  interview_round: (id: ids.interview_round) =>
    queryOptions({
      queryKey: ["interviewRounds", id, "combined"],
      queryFn: (opts) =>
        interviewRound({
          data: { id: id },
          signal: opts.signal,
        }) as Promise<
          schema.interview_round & {
            interviewees: Array<schema.interviewee>;
            interviewers: Array<schema.interviewer>;
          }
        >,
    }),

  all: () =>
    queryOptions({
      queryKey: ["interviewRounds"],
      queryFn: (opts) =>
        indexAll({ signal: opts.signal }) as Promise<Array<schema.interview_round>>,
    }),
  id: (id: ids.interview_round) =>
    queryOptions({
      queryKey: ["interviewRounds", id],
      queryFn: (opts) =>
        round({
          data: { id },
          signal: opts.signal,
        }) as Promise<schema.interview_round>,
    }),

  interviewers: (id: ids.interview_round) =>
    queryOptions({
      queryKey: ["interviewRounds", id, "interviewers"],
      queryFn: (opts) =>
        interviewers({
          data: { id },
          signal: opts.signal,
        }) as Promise<Array<schema.interviewer>>,
    }),

  interviewees: (id: ids.interview_round) =>
    queryOptions({
      queryKey: ["interviewRounds", id, "interviewees"],
      queryFn: (opts) =>
        interviewees({
          data: { id },
          signal: opts.signal,
        }) as Promise<Array<schema.interviewee>>,
    }),
};

const interviewRound = createServerFn({ method: "GET" })
  .middleware([middleware.assertOrganizesRound])
  .validator(v.object({ id: ids.interview_round }))
  .handler(async ({ data, context }) => {
    const { round_id } = data;

    console.info(
      `Workspaceing interview round ${round_id} for organizer ID: ${context.organizerId}`,
    );

    const intervieweeData = await interviewees({ data: { id: round_id } });
    const interviewerData = await interviewers({ data: { id: round_id } });

    return {
      ...context.round,
      interviewees: intervieweeData,
      interviewers: interviewerData,
    };
  });

const indexAll = createServerFn({ method: "GET" })
  .middleware([middleware.organizer])
  .handler(async ({ context }) => {
    console.info(
      `Workspaceing interview rounds for organizer ID: ${context.organizerId}`,
    );

    const rounds = await db.query.interview_round.findMany({
      where: (round, op) => op.eq(round.organizer_id, context.organizerId),
    });

    return rounds;
  });

const round = createServerFn({ method: "GET" })
  .middleware([middleware.assertOrganizesRound])
  .handler(async ({ context }) => {
    console.info(
      `Workspaceing interview round ${context.round.id} for organizer ID: ${context.organizerId}`,
    );

    return context.round;
  });

const interviewers = createServerFn({ method: "GET" })
  .middleware([middleware.organizer])
  .validator(v.object({ id: ids.interview_round }))
  .handler(async ({ data }) => {
    const interviewers = await db.query.interviewer.findMany({
      where: (interviewer, op) => op.eq(interviewer.interview_round_id, data.id),
    });

    return interviewers;
  });

const interviewees = createServerFn({ method: "GET" })
  .middleware([middleware.organizer])
  .validator(v.object({ id: ids.interview_round }))
  .handler(async ({ data }) => {
    const interviewees = await db.query.interviewee.findMany({
      where: (interviewee, op) => op.eq(interviewee.interview_round_id, data.id),
    });

    return interviewees;
  });

// ------------ MUTATIONS ------------

const createPayload = v.object({
  title: v.string(),
  description: v.optional(v.string()),
  duration: v.pipe(v.number(), v.minValue(1)),
  period,
});
type createPayload = v.InferOutput<typeof createPayload>;

const create = createServerFn({ method: "POST" })
  .middleware([middleware.organizer])
  .validator(createPayload)
  .handler(async ({ data, context }) => {
    try {
      console.info(
        `Attempting to create an interview round for organizer ID: ${context.organizerId}`,
      );
      const result = await db.insert(schema.interview_round).values({
        id: ids.generate(ids.interview_round),
        title: data.title,
        description: data.description,
        organizer_id: context.organizerId as string & v.Brand<"orgz_id">,
        interview_duration: data.duration,
        start_date: new Date(data.period.start),
        end_date: new Date(data.period.end),
        status: interviewRounds.draft,
      });

      console.info(
        `Successfully created an interview round for organizer ID: ${context.organizerId}`,
      );
      return { success: true, affectedRows: result.rowsAffected };
    } catch (error) {
      console.error(
        `Database error creating interview rounds for organizer ${context.organizerId}:`,
        error,
      );
      throw new Error(
        `Failed to create interview round: ${error.message || "Database error"}`,
      );
    }
  });

export function useCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: createPayload) => create({ data }),
    onSettled: () => queryClient.invalidateQueries(queries.all()),
  });
}

const deletePayload = v.object({
  id: ids.interview_round,
});
type deletePayload = v.InferOutput<typeof deletePayload>;

const deleteFn = createServerFn({ method: "POST" }) // "DELETE" method can also be used, POST is common for server fns
  .middleware([middleware.assertOrganizesRound]) // Ensures the user owns the round
  .validator(deletePayload)
  .handler(async ({ data, context }) => {
    try {
      console.info(
        `Attempting to delete interview round ID: ${data.id} for organizer ID: ${context.organizerId}`,
      );

      // You might want to add checks here, e.g., only allow deletion if round is in 'draft' status
      // assert(context.round.status === interviewRounds.draft, "Only draft rounds can be deleted.");

      const result = await db.delete(schema.interview_round).where(
        and(
          eq(schema.interview_round.id, data.id),
          eq(schema.interview_round.organizer_id, context.organizerId), // Redundant due to middleware, but good for safety
        ),
      );

      if (result.rowsAffected === 0) {
        console.warn(
          `No interview round found with ID: ${data.id} for organizer ID: ${context.organizerId}, or it was already deleted.`,
        );
        // Consider throwing an error or returning a specific status if no rows were affected
        // throw new Error("Interview round not found or not authorized to delete.");
      } else {
        console.info(
          `Successfully deleted interview round ID: ${data.id} for organizer ID: ${context.organizerId}. Affected rows: ${result.rowsAffected}`,
        );
      }

      return { success: true, affectedRows: result.rowsAffected };
    } catch (error) {
      console.error(
        `Database error deleting interview round ID ${data.id} for organizer ${context.organizerId}:`,
        error,
      );
      throw new Error(
        `Failed to delete interview round: ${error.message || "Database error"}`,
      );
    }
  });

export function useDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: deletePayload) => deleteFn({ data }),
    onSuccess: (data, variables) => {
      // Invalidate queries to refetch data after deletion
      queryClient.invalidateQueries(queries.all());
      queryClient.invalidateQueries(queries.id(variables.id)); // Invalidate specific round query
      toast.success("Interview round deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting interview round:", error);
      toast.error(error.message || "Failed to delete interview round.");
    },
  });
}

const updatePayload = v.pipe(
  v.object({
    id: ids.interview_round,
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    duration: v.optional(v.pipe(v.number(), v.minValue(1))),
    period: v.optional(period),
  }),
  // v.check((p) => Object.keys(p).length > 1, "At least one field must be updated"),
);
type updatePayload = v.InferOutput<typeof updatePayload>;

const update = createServerFn({ method: "POST" })
  .middleware([middleware.assertOrganizesRound])
  .validator(updatePayload)
  .handler(async ({ data, context }) => {
    console.debug({ data });
    assert(
      context.round.status === interviewRounds.draft,
      "Round cannot be updated anymore",
    );

    console.log(
      `Attempting to update an interview round for organizer ID: ${context.organizerId}`,
    );

    const result = await db
      .update(schema.interview_round)
      .set({
        title: data.title,
        description: data.description,
        interview_duration: data.duration,
        ...(!data.period
          ? {}
          : {
              start_date: new Date(data.period.start),
              end_date: new Date(data.period.end),
            }),
      })
      .where(
        and(
          eq(schema.interview_round.id, data.id),
          eq(schema.interview_round.organizer_id, context.organizerId),
        ),
      );

    console.log(
      `Successfully updated interview round ID ${data.id} for organizer ID: ${context.organizerId}. Affected rows: ${result.rowsAffected}`,
    );
    return { success: true, affectedRows: result.rowsAffected };
  });

export function useUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: updatePayload) => update({ data }),
    onMutate: async (data) => {
      await queryClient.cancelQueries(queries.id(data.id));

      const snapshot = queryClient.getQueryData(queries.id(data.id).queryKey);
      queryClient.setQueryData(queries.id(data.id).queryKey, (oldData) => ({
        ...(oldData ?? {}),
        ...data,
      }));

      return { snapshot };
    },
    onError: (err, data, ctx) => {
      console.debug(err);
      toast.error("Failed to update interview round");
      return queryClient.setQueryData(queries.id(data.id).queryKey, ctx?.snapshot);
    },
    onSettled: (_, __, data) => {
      queryClient.invalidateQueries(queries.id(data.id));
    },
  });
}

const updateIntervieweesPayload = v.pipe(
  v.object({
    id: ids.interview_round,
    invited: v.array(v.pipe(v.string(), v.email())),
    revoked: v.array(v.pipe(v.string(), v.email())),
  }),
  v.check(
    (p) => p.invited.length + p.revoked.length > 1,
    "At least one interviewee must be modified",
  ),
);
type updateIntervieweesPayload = v.InferOutput<typeof updateIntervieweesPayload>;

const updateInterviewees = createServerFn({ method: "POST" })
  .middleware([middleware.assertOrganizesRound])
  .validator(updateIntervieweesPayload)
  .handler(async ({ data, context }) => {
    assert(
      context.round.status === interviewRounds.draft,
      "Interviewees cannot be added or removed further",
    );

    await db.batch([
      db
        .delete(schema.interviewee)
        .where(
          and(
            eq(schema.interviewee.interview_round_id, data.id),
            inArray(schema.interviewee.email, data.revoked),
          ),
        ),
      db
        .insert(schema.interviewee)
        .values(data.invited.map((email) => ({ interview_round_id: data.id, email }))),
    ]);
  });

export function useUpdateInterviewees() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: updateIntervieweesPayload) => updateInterviewees({ data }),
  });
}

const updateInterviewersPayload = v.pipe(
  v.object({
    id: ids.interview_round,
    updated: v.array(
      v.object({
        email: v.pipe(v.string(), v.email()),
        interviewsCount: v.optional(v.pipe(v.number(), v.minValue(1))),
      }),
    ),
    revoked: v.array(v.pipe(v.string(), v.email())),
  }),
  v.check(
    (p) => p.updated.length + p.revoked.length > 1,
    "At least one interviewer must be modified",
  ),
);
type updateInterviewersPayload = v.InferOutput<typeof updateInterviewersPayload>;

const updateInterviewers = createServerFn({ method: "POST" })
  .middleware([middleware.assertOrganizesRound])
  .validator(updateInterviewersPayload)
  .handler(async ({ data, context }) => {
    assert(context.round.status === interviewRounds.draft, "Cannot invite interviewers");

    await db.batch([
      db
        .delete(schema.interviewer)
        .where(
          and(
            eq(schema.interviewer.interview_round_id, data.id),
            inArray(schema.interviewer.email, data.revoked),
          ),
        ),
      db
        .insert(schema.interviewer)
        .values(
          data.updated.map((invitation) => ({
            interview_round_id: data.id,
            email: invitation.email,
            interviews_count: invitation.interviewsCount,
          })),
        )
        .onConflictDoUpdate({
          target: [schema.interviewer.interview_round_id, schema.interviewer.email],
          set: { interviews_count: sql<number>`excluded.interviews_count` },
        }),
    ]);
  });

export function useUpdateInterviewers() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: updateInterviewersPayload) => updateInterviewers({ data }),
  });
}

const schedule = createServerFn({ method: "POST" })
  .middleware([middleware.assertOrganizesRound])
  .handler(async ({ data, context }) => {
    assert(
      context.round.status === interviewRounds.draft,
      "Round must be draft before scheduling",
    );

    await db
      .update(schema.interview_round)
      .set({ status: interviewRounds.schedule })
      .where(
        and(
          eq(schema.interview_round.organizer_id, context.organizerId),
          eq(schema.interview_round.id, data.id),
          eq(schema.interview_round.status, interviewRounds.draft),
        ),
      );
  });

export function useSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: ids.interview_round }) => schedule({ data }),
    onMutate: async (data) => {
      await queryClient.cancelQueries(queries.id(data.id));

      const snapshot = queryClient.getQueryData(queries.id(data.id).queryKey);
      queryClient.setQueryData(queries.id(data.id).queryKey, (oldData) =>
        !oldData ? oldData : { ...oldData, status: interviewRounds.schedule },
      );

      return { snapshot };
    },
    onError: (_, data, ctx) =>
      queryClient.setQueryData(queries.id(data.id).queryKey, ctx?.snapshot),
  });
}

const open = createServerFn({ method: "POST" })
  .middleware([middleware.assertOrganizesRound])
  .handler(async ({ data, context }) => {
    assert(
      context.round.status === interviewRounds.schedule,
      "Round must be schedule before open",
    );

    await db
      .update(schema.interview_round)
      .set({ status: interviewRounds.open })
      .where(
        and(
          eq(schema.interview_round.organizer_id, context.organizerId),
          eq(schema.interview_round.id, data.id),
          eq(schema.interview_round.status, interviewRounds.schedule),
        ),
      );
  });

export function useOpen() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: ids.interview_round }) => open({ data }),
    onMutate: async (data) => {
      await queryClient.cancelQueries(queries.id(data.id));

      const snapshot = queryClient.getQueryData(queries.id(data.id).queryKey);

      queryClient.setQueryData(queries.id(data.id).queryKey, (oldData) =>
        !oldData ? oldData : { ...oldData, status: interviewRounds.open },
      );

      return { snapshot };
    },
    onError: (_, data, ctx) =>
      queryClient.setQueryData(queries.id(data.id).queryKey, ctx?.snapshot),
  });
}

const close = createServerFn({ method: "POST" })
  .middleware([middleware.assertOrganizesRound])
  .handler(async ({ data, context }) => {
    assert(
      context.round.status === interviewRounds.open,
      "Round must be open before close",
    );

    await db
      .update(schema.interview_round)
      .set({ status: interviewRounds.closed })
      .where(
        and(
          eq(schema.interview_round.organizer_id, context.organizerId),
          eq(schema.interview_round.id, data.id),
          eq(schema.interview_round.status, interviewRounds.open),
        ),
      );
  });

export function useClose() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: ids.interview_round }) => close({ data }),
    onMutate: async (data) => {
      await queryClient.cancelQueries(queries.id(data.id));

      const snapshot = queryClient.getQueryData(queries.id(data.id).queryKey);
      queryClient.setQueryData(queries.id(data.id).queryKey, (oldData) =>
        !oldData ? oldData : { ...oldData, status: interviewRounds.closed },
      );

      return { snapshot };
    },
    onError: (_, data, ctx) =>
      queryClient.setQueryData(queries.id(data.id).queryKey, ctx?.snapshot),
  });
}
