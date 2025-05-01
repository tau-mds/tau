import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import * as v from "valibot";
import {
  db,
  interviewRoundTable,
  intervieweeTable,
  interviewerTable,
  interviewSlotTable,
} from "@tau/db";
import { eq } from "drizzle-orm";
import { auth } from "@tau/auth-server";

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
  end_date: string | null;
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

const InterviewRoundValidator = v.object({
  title: v.string("Title must be a string"),
  description: v.optional(v.string("Description must be a string")),
  interview_duration: v.optional(v.number("Duration must be a number")),
  start_date: v.string("Start date must be a string"),
  end_date: v.optional(v.string("End date must be a string")),
});

const RoundIdValidator = v.object({
  roundId: v.string("Round ID must be a string"),
});

// Helper function to get authenticated user ID or throw Unauthorized error
const getAuthenticatedUserId = async (): Promise<string> => {
  const request = getWebRequest();
  if (!request) {
    console.error("getWebRequest() returned null during authentication check");
    throw new Error(
      "Server error: Could not access request context for authentication."
    );
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const authenticatedUser = session?.user;

  if (!authenticatedUser || !authenticatedUser.id) {
    console.warn("Access denied: Authentication failed.");
    throw new Error("Unauthorized: Please log in.");
  }

  return authenticatedUser.id;
};

const getInterviewRoundOrganizerPreviewHandler = createServerFn({
  method: "GET",
})
  .validator(RoundIdValidator)
  .handler<InterviewRoundViewData>(async ({ data, context }: any) => {
    const userId = await getAuthenticatedUserId();
    const { roundId } = data;
    console.log(
      `Fetching interview round preview for organizer ID: ${userId}, Round ID: ${roundId}`
    );

    try {
      const roundDrizzle = await db.query.interviewRoundTable.findOne({
        where: (rounds, { eq, and }) =>
          and(eq(rounds.id, roundId), eq(rounds.organizer_id, userId)),
      });

      if (!roundDrizzle) {
        console.warn(
          `Round not found or access denied: ID ${roundId}, Organizer ${userId}`
        );
        throw new Error("Interview round not found or access denied.");
      }

      const interviewersDrizzle = await db.query.interviewerTable.findMany({
        where: eq(interviewerTable.interview_round_id, roundDrizzle.id),
      });

      const intervieweeAssignedDrizzle =
        await db.query.intervieweeTable.findMany({
          where: eq(intervieweeTable.interview_round_id, roundDrizzle.id),
        });

      const interviewSlotsAssignedDrizzle =
        await db.query.interviewSlotTable.findMany({
          where: eq(interviewSlotTable.interview_round_id, roundDrizzle.id),
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
}).handler<InterviewRoundData[]>(async (context: any) => {
  const userId = await getAuthenticatedUserId();
  console.log(`Fetching interview rounds for organizer ID: ${userId}`);

  try {
    const usersRoundsDrizzle = await db
      .select({
        id: interviewRoundTable.id,
        title: interviewRoundTable.title,
        description: interviewRoundTable.description,
        interview_duration: interviewRoundTable.interview_duration,
        status: interviewRoundTable.status,
        start_date: interviewRoundTable.start_date,
        end_date: interviewRoundTable.end_date,
        created_at: interviewRoundTable.created_at,
        updated_at: interviewRoundTable.updated_at,
      })
      .from(interviewRoundTable)
      .where(eq(interviewRoundTable.organizer_id, userId));

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
  .validator(InterviewRoundValidator)
  .handler<{ lastInsertRowId: number }>(async ({ data, context }: any) => {
    const userId = await getAuthenticatedUserId();
    console.log(
      `Attempting to create an interview round for organizer ID: ${userId}`
    );

    const intervieRoundDTO: InterviewRoundDTO = data;

    try {
      const result = await db.insert(interviewRoundTable).values({
        title: intervieRoundDTO.title,
        description: intervieRoundDTO.description,
        organizer_id: userId,
        interview_duration: intervieRoundDTO.interview_duration,
        status: "created",
        start_date: new Date(intervieRoundDTO.start_date),
        end_date: intervieRoundDTO.end_date
          ? new Date(intervieRoundDTO.end_date)
          : null,
      });

      console.log(
        `Successfully created an interview round for organizer ID: ${userId}`
      );

      return result;
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

export const queries = {
  userInterviewRounds: () =>
    queryOptions<InterviewRoundData[]>({
      queryKey: ["userInterviewRounds", "authenticated"],
      queryFn: () => getHostedInterviewRoundsHandler({}),
    }),

  interviewRoundView: (roundId: string) =>
    queryOptions<InterviewRoundViewData>({
      queryKey: ["interivewRoundView", roundId, "authenticated"],
      queryFn: () =>
        getInterviewRoundOrganizerPreviewHandler({ data: { roundId } }),
    }),
};

export const mutations = {
  createInterviewRound: createInterviewRoundHandler,
};
