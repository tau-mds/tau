import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { db, schema } from "@tau/db";
import { ids } from "@tau/db/ids";
import { and, eq } from "drizzle-orm";
import * as v from "valibot";
import { authMiddleware } from "../middlewares/auth-middleware";
import { organizerMiddleware } from "../middlewares/organizer-middleware";

export * as organizer from "./organizer";

interface InterviewRoundData {
  id: string;
  title: string;
  description: string | null;
  interview_duration: number | null;
  status: string;
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

interface InterviewRoundDTO {
  title: string;
  description: string | null;
  interview_duration: number | null;
  start_date: string;
  end_date: string;
}

interface InterviewRoundViewData {
  preview: InterviewRoundData;
  interviewers: { email: string; interview_count: number }[];
  interviewees: string[];
  time_slots: {
    interviewer: string;
    interviewee: string | null;
    start_date: number;
  }[];
}

const InterviewRoundCreateValidator = v.object({
  roundId: v.string("Round ID must be a string"),
  interview_round: v.object({
    title: v.string("Title must be a string"),
    description: v.optional(v.string("Description must be a string")),
    interview_duration: v.optional(v.number("Duration must be a number")),
    start_date: v.string("Start date must be a string"),
    end_date: v.optional(v.string("End date must be a string")),
  }),
});

const InteriviewRoundUpdateValidator = v.object({
  roundId: v.string("Round ID must be a string"),
  interview_round: v.object({
    id: v.string("Round ID must be a string"),
    title: v.optional(v.string("Title must be a string")),
    description: v.optional(v.string("Description must be a string")),
    interview_duration: v.optional(v.number("Duration must be a number")),
    start_date: v.optional(v.string("Start date must be a string")),
    end_date: v.optional(v.string("End date must be a string")),
  }),
});

const RoundIdValidator = v.object({
  roundId: v.string("Round ID must be a string"),
});

const EmailListValidator = v.object({
  roundId: v.string("Round ID must be a string"),
  emails: v.array(v.pipe(v.string(), v.email("Invalid email format"))),
});

const InterviewerListValidator = v.object({
  roundId: v.string("Round ID must be a string"),
  interviewers: v.array(
    v.object({
      email: v.pipe(v.string(), v.email("Invalid email format")),
      count: v.number("The interview number must be a number"),
    })
  ),
});

const getInterviewRoundOrganizerPreviewHandler = createServerFn({
  method: "GET",
})
  .middleware([organizerMiddleware])
  .validator(RoundIdValidator)
  .handler<InterviewRoundViewData>(async ({ data, context }) => {
    const userId = context.session?.user?.id;

    if (!userId) {
      console.error(
        "Middleware failed to attach user or user ID in GET preview handler."
      );
      throw new Error("Unauthorized: Authentication context missing.");
    }

    const roundId = data.roundId as string & v.Brand<"ivro_id">;
    console.log(
      `Workspaceing interview round preview for organizer ID: ${userId}, Round ID: ${roundId}`
    );

    try {
      const roundDrizzle = await db.query.interview_round.findFirst({
        where: (rounds, { eq, and }) =>
          and(eq(rounds.id, roundId), eq(rounds.organizer_id, userId)),
      });

      if (!roundDrizzle) {
        console.warn(
          `Round not found or access denied: ID ${roundId}, Organizer ${userId}`
        );
        throw new Error("Interview round not found or access denied.");
      }

      const interviewersDrizzle = await db.query.interviewer.findMany({
        where: eq(schema.interviewer.interview_round_id, roundDrizzle.id),
      });

      const intervieweeAssignedDrizzle = await db.query.interviewee.findMany({
        where: eq(
          schema.interviewee.interview_round_id,
          roundDrizzle.id as string & v.Brand<"ivro_id">
        ),
      });

      const interviewSlotsAssignedDrizzle =
        await db.query.interview_slot.findMany({
          where: eq(schema.interview_slot.interview_round_id, roundDrizzle.id),
        });

      const previewSerializable: InterviewRoundData = JSON.parse(
        JSON.stringify(roundDrizzle)
      );
      delete (previewSerializable as any).organizer_id;

      const interviewersMapped: InterviewRoundViewData["interviewers"] =
        interviewersDrizzle.map((interviewer) => ({
          email: interviewer.email,
          interview_count: interviewer.interviews_count,
        }));

      const intervieweesMapped: InterviewRoundViewData["interviewees"] =
        intervieweeAssignedDrizzle.map((interviewee) => interviewee.email);

      const timeSlotsMapped: InterviewRoundViewData["time_slots"] =
        interviewSlotsAssignedDrizzle.map((slot) => ({
          interviewer: slot.interviewer_email,
          interviewee: slot.interviewee_email,
          start_date: slot.start_at.getTime(),
        }));

      const previewData: InterviewRoundViewData = {
        preview: previewSerializable,
        interviewers: interviewersMapped,
        interviewees: intervieweesMapped,
        time_slots: timeSlotsMapped,
      };

      const finalSerializableData: InterviewRoundViewData = JSON.parse(
        JSON.stringify(previewData)
      );

      console.log(`Successfully fetched preview data for round ID: ${roundId}`);
      return finalSerializableData;
    } catch (error: any) {
      console.error(
        `Database error fetching preview for organizer ${userId}, Round ID ${roundId}:`,
        error
      );
      throw new Error(
        `Failed to retrieve interview round preview: ${
          error.message || "Database error"
        }`
      );
    }
  });

const getHostedInterviewRoundsHandler = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler<InterviewRoundData[]>(async ({ context }) => {
    const userId = context.session?.user?.id;

    if (!context.session?.user) {
      console.error(
        "Middleware failed to attach user or user ID in GET list handler."
      );
      throw new Error("Unauthorized: Authentication context missing.");
    }

    console.log(`Workspaceing interview rounds for organizer ID: ${userId}`);

    try {
      const usersRoundsDrizzle = await db
        .select({
          id: schema.interview_round.id,
          title: schema.interview_round.title,
          description: schema.interview_round.description,
          interview_duration: schema.interview_round.interview_duration,
          status: schema.interview_round.status,
          start_date: schema.interview_round.start_date,
          end_date: schema.interview_round.end_date,
          created_at: schema.interview_round.created_at,
          updated_at: schema.interview_round.updated_at,
        })
        .from(schema.interview_round)
        .where(eq(schema.interview_round.organizer_id, userId as string));

      const usersRoundsSerializable: InterviewRoundData[] = JSON.parse(
        JSON.stringify(usersRoundsDrizzle)
      );

      console.log(
        `Successfully fetched ${usersRoundsSerializable.length} interview rounds for organizer ${userId}`
      );

      return usersRoundsSerializable;
    } catch (error) {
      console.error(
        `Database error fetching interview rounds for organizer ${userId}:`,
        error
      );
      throw new Error(
        "Failed to retrieve interview rounds due to a server error."
      );
    }
  });

const createInterviewRoundHandler = createServerFn({ method: "POST" })
  .middleware([organizerMiddleware])
  .validator(InterviewRoundCreateValidator)
  .handler(async ({ data, context }: any) => {
    const userId = context.session?.user?.id;

    if (!userId) {
      console.error(
        "Middleware failed to attach user or user ID in POST handler."
      );
      throw new Error("Unauthorized: Authentication context missing.");
    }

    console.log(
      `Attempting to create an interview round for organizer ID: ${userId}`
    );

    const intervieRoundDTO: InterviewRoundDTO = data.interview_round;

    try {
      const newId = ids.interviewRound.new();
      const result = await db.insert(schema.interview_round).values({
        id: newId,
        title: intervieRoundDTO.title,
        description: intervieRoundDTO.description,
        organizer_id: userId,
        interview_duration: intervieRoundDTO.interview_duration,
        status: "created",
        start_date: new Date(intervieRoundDTO.start_date),
        end_date: new Date(intervieRoundDTO.end_date),
      });

      console.log(
        `Successfully created an interview round for organizer ID: ${userId}`
      );
      return { success: true, affectedRows: result.rowsAffected };
    } catch (error: any) {
      console.error(
        `Database error creating interview rounds for organizer ${userId}:`,
        error
      );
      throw new Error(
        `Failed to create interview round: ${error.message || "Database error"}`
      );
    }
  });

const updateInteriviewRound = createServerFn({ method: "POST" })
  .middleware([organizerMiddleware])
  .validator(InteriviewRoundUpdateValidator)
  .handler(async ({ data, context }: any) => {
    const userId = context.session?.user?.id;

    if (!userId) {
      console.error(
        "Middleware failed to attach user or user ID in POST handler."
      );
      throw new Error("Unauthorized: Authentication context missing.");
    }

    console.log(
      `Attempting to update an interview round for organizer ID: ${userId}`
    );

    const interviewRoundDTO = data.interview_round;

    const updateData: Partial<typeof schema.interview_round.$inferInsert> = {};

    if (
      interviewRoundDTO.title !== undefined &&
      interviewRoundDTO.title !== null
    ) {
      updateData.title = interviewRoundDTO.title;
    }
    if (
      interviewRoundDTO.description !== undefined &&
      interviewRoundDTO.description !== null
    ) {
      updateData.description = interviewRoundDTO.description;
    }
    if (
      interviewRoundDTO.interview_duration !== undefined &&
      interviewRoundDTO.interview_duration !== null
    ) {
      updateData.interview_duration = interviewRoundDTO.interview_duration;
    }
    if (
      interviewRoundDTO.start_date !== undefined &&
      interviewRoundDTO.start_date !== null
    ) {
      const startDate = new Date(interviewRoundDTO.start_date);
      if (!isNaN(startDate.getTime())) {
        updateData.start_date = startDate;
      } else {
        console.warn(
          "Received invalid start_date format:",
          interviewRoundDTO.start_date
        );
        throw new Error("Invalid start date format.");
      }
    }
    if (
      interviewRoundDTO.end_date !== undefined &&
      interviewRoundDTO.end_date !== null
    ) {
      const endDate = new Date(interviewRoundDTO.end_date);
      if (!isNaN(endDate.getTime())) {
        updateData.end_date = endDate;
      } else {
        console.warn(
          "Received invalid end_date format:",
          interviewRoundDTO.end_date
        );
        throw new Error("Invalid end date format.");
      }
    }

    if (Object.keys(updateData).length === 0) {
      console.log(`No update data provided for interview round.`);
    }

    try {
      const result = await db
        .update(schema.interview_round)
        .set(updateData)
        .where(
          and(
            eq(schema.interview_round.id, interviewRoundDTO.id),
            eq(schema.interview_round.organizer_id, userId)
          )
        );

      console.log(
        `Successfully updated interview round ID ${interviewRoundDTO.id} for organizer ID: ${userId}. Affected rows: ${result.rowsAffected}`
      );

      return { success: true, affectedRows: result.rowsAffected };
    } catch (error: any) {
      console.error(
        `Database error updating interview round ID ${interviewRoundDTO.id} for organizer ${userId}:`,
        error
      );
      throw new Error(
        `Failed to update interview round: ${error.message || "Database error"}`
      );
    }
  });

const setIntervieweeListInInterviewRound = createServerFn({ method: "POST" })
  .middleware([organizerMiddleware])
  .validator(EmailListValidator)
  .handler(async ({ data, context }) => {
    const userId = context.session?.user?.id;

    if (!userId) {
      console.error(
        "Middleware failed to attach user or user ID in POST handler."
      );
      throw new Error("Unauthorized: Authentication context missing.");
    }
    const roundId: string & v.Brand<"ivro_id"> = data.roundId as string &
      v.Brand<"ivro_id">;

    const existingEmails = await db
      .select()
      .from(schema.interviewee)
      .where(eq(schema.interviewee.interview_round_id, roundId));

    existingEmails.forEach(async (interivee) => {
      if (!data.emails.includes(interivee.email)) {
        try {
          await db
            .delete(schema.interviewee)
            .where(
              and(
                eq(schema.interviewee.email, interivee.email),
                eq(schema.interviewee.interview_round_id, roundId)
              )
            );
        } catch (error) {
          throw new Error("Error deleting an interviewee!");
        }
      }
    });

    data.emails.forEach(async (email: string) => {
      try {
        const isSaved = await db
          .select()
          .from(schema.interviewee)
          .where(
            and(
              eq(schema.interviewee.email, email),
              eq(schema.interviewee.interview_round_id, roundId)
            )
          );
        if (isSaved.length <= 0) {
          await db.insert(schema.interviewee).values({
            email: email,
            interview_round_id: roundId,
          });
        }
      } catch (error) {
        throw new Error("Error inserting in database!");
      }
    });
  });

const setInterviewerListInInterviewRound = createServerFn({ method: "POST" })
  .middleware([organizerMiddleware])
  .validator(InterviewerListValidator)
  .handler(async ({ data, context }) => {
    const userId = context.session?.user?.id;

    if (!userId) {
      console.error(
        "Middleware failed to attach user or user ID in POST handler."
      );
      throw new Error("Unauthorized: Authentication context missing.");
    }
    const roundId: string & v.Brand<"ivro_id"> = data.roundId as string &
      v.Brand<"ivro_id">;

    const existingEmails = await db
      .select()
      .from(schema.interviewee)
      .where(eq(schema.interviewee.interview_round_id, roundId));

    existingEmails.forEach(async (inter) => {
      if (
        !data.interviewers.some(
          (interviewer) => interviewer.email == inter.email
        )
      ) {
        try {
          await db
            .delete(schema.interviewer)
            .where(
              and(
                eq(schema.interviewer.email, inter.email),
                eq(schema.interviewer.interview_round_id, roundId)
              )
            );
        } catch (error) {
          throw new Error("Error deleting an interviewee!");
        }
      }
    });

    data.interviewers.forEach(
      async (interviewer: { email: string; count: number }) => {
        try {
          const isSaved = await db
            .select()
            .from(schema.interviewer)
            .where(
              and(
                eq(schema.interviewer.email, interviewer.email),
                eq(schema.interviewer.interview_round_id, roundId)
              )
            );
          if (isSaved.length <= 0) {
            await db.insert(schema.interviewer).values({
              email: interviewer.email,
              interview_round_id: roundId,
              interviews_count: interviewer.count,
            });
          }
        } catch (error) {
          throw new Error("Error inserting in database!");
        }
      }
    );
  });

const scheduleInterviewRound = createServerFn({ method: "POST" })
  .middleware([organizerMiddleware])
  .validator(RoundIdValidator)
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
    try {
      await db
        .update(schema.interview_round)
        .set({ status: "schedule" })
        .where(
          and(
            eq(schema.interview_round.id, roundId),
            eq(schema.interview_round.status, "created")
          )
        );
    } catch (error) {
      throw new Error(
        "Error updateing the status of an interview round in `started`"
      );
    }
  });

const openInterviewRound = createServerFn({ method: "POST" })
  .middleware([organizerMiddleware])
  .validator(RoundIdValidator)
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

    try {
      await db
        .update(schema.interview_round)
        .set({ status: "open" })
        .where(
          and(
            eq(schema.interview_round.id, roundId),
            eq(schema.interview_round.status, "schedule")
          )
        );
    } catch (error) {
      throw new Error(
        "Error updateing the status of an interview round in `started`"
      );
    }
  });

const stopInterviewRound = createServerFn({ method: "POST" })
  .middleware([organizerMiddleware])
  .validator(RoundIdValidator)
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

    try {
      await db
        .update(schema.interview_round)
        .set({ status: "ended" })
        .where(eq(schema.interview_round.id, roundId));
    } catch (error) {
      throw new Error(
        "Error updateing the status of an interview round in `ended`"
      );
    }
  });

export const queries = {
  userInterviewRounds: () =>
    queryOptions<InterviewRoundData[]>({
      queryKey: ["userInterviewRounds"],
      queryFn: () => getHostedInterviewRoundsHandler({}),
    }),

  interviewRoundView: (roundId: string) =>
    queryOptions<InterviewRoundViewData>({
      queryKey: ["interivewRoundView", roundId],
      queryFn: () =>
        getInterviewRoundOrganizerPreviewHandler({ data: { roundId } }),
    }),
};

export const mutations: any = {
  createInterviewRound: createInterviewRoundHandler,
  updateInterviewRound: updateInteriviewRound,
  setIntervieweeList: setIntervieweeListInInterviewRound,
  setInterviewerList: setInterviewerListInInterviewRound,
  scheduleInterviewRound: scheduleInterviewRound,
  openInterviewRound: openInterviewRound,
  endInterviewRound: stopInterviewRound,
};
