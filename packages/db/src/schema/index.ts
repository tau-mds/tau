export * as interview_round from "./interview_round";
export * as interviewee from "./interviewee";
export * as interviewer from "./interviewer";
export * as interview_slot from "./interview_slot";
export * as authSchema from "./auth-schema";

import { organizer } from "./auth-schema";
import { interviewRoundTable } from "./interview_round";
import { intervieweeTable } from "./interviewee";
import { interviewerTable } from "./interviewer";
import { interviewSlotTable } from "./interview_slot";

export const schema = {
  organizer: organizer,
  interview_round: interviewRoundTable,
  interviewee: intervieweeTable,
  interviewer: interviewerTable,
  interview_slot: interviewSlotTable,
};
