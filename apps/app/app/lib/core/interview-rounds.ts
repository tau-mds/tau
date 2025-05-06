import type { schema } from "@tau/db";
import * as v from "valibot";

export * as interviewRounds from "./interview-rounds";

export const draft = "draft";
export const schedule = "schedule";
export const open = "open";
export const closed = "closed";

export const status = v.picklist([draft, schedule, open, closed]);
export type status = v.InferOutput<typeof status>;

export function editable(interviewRound: schema.interview_round) {
  return interviewRound.status === draft;
}
