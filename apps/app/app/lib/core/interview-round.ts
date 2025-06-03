import type { schema } from "@tau/db";
import { assert } from "@tau/utils";
import * as v from "valibot";
import { newPeriod } from "../types";

export * as interviewRound from "./interview-round";

export const draft = "draft";
export const schedule = "schedule";
export const open = "open";
export const closed = "closed";

export const status = v.picklist([draft, schedule, open, closed]);
export type status = v.InferOutput<typeof status>;

export function from(value: schema.interview_round) {
  assert(!!value.interview_duration, "Interview duration is missing");

  return {
    id: value.id,
    organizerId: value.organizer_id,
    title: value.title,
    description: value.description,
    status: v.parse(status, value.status),
    duration: value.interview_duration,
    period: newPeriod({ start: value.start_date, end: value.end_date }),
    createdAt: value.created_at,
    updatedAt: value.updated_at,
  };
}

export type interviewRound = ReturnType<typeof from>;

export function editable(interviewRound: ReturnType<typeof from>) {
  return interviewRound.status === draft;
}
