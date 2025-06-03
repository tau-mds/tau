import type { schema } from "@tau/db";
import { addMinutes } from "date-fns";

export * as slot from "./slot";

export type positioned = schema.interview_slot & {
  position: {
    top: number;
    height: number;
    left: number;
    width: number;
    zIndex: number;
  };
};

export function end(start: Date, duration: number) {
  return addMinutes(start, duration);
}
