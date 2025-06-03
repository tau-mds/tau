import { addHours, eachHourOfInterval, format, startOfDay } from "date-fns";

export * as constants from "./constants";

export const DAY_START = 8;
export const DAY_END = 20;
export const DAY_HOURS = eachHourOfInterval({
  start: addHours(startOfDay(new Date()), DAY_START),
  end: addHours(startOfDay(new Date()), DAY_END - 1),
});

export const TIME_ZONE = format(new Date(), "O");
