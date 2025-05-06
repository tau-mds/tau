import { formatISO, isBefore } from "date-fns";
import * as v from "valibot";

/**
 * A validation schema for ISO 8601 date strings.
 *
 * - Validates that the value is a string.
 * - Ensures the string is a valid ISO date (e.g., "2023-05-04T12:00:00.000Z").
 * - Applies a `brand` named `"isoDate"` to distinguish it from regular strings at the type level.
 *
 * Useful for enforcing stricter typing when working with date strings throughout the codebase.
 */
export const isoDate = v.pipe(v.string(), v.isoDate(), v.brand("isoDate"));
export type isoDate = v.InferOutput<typeof isoDate>;

export function newIsoDate(value: Date | number | string) {
  return v.parse(isoDate, formatISO(value, { representation: "date" }));
}

/**
 * A validation schema for a date period object with `start` and `end` properties.
 *
 * - `start`: must be a valid ISO date string.
 * - `end`: must be a valid ISO date string.
 * - Additionally, the `start` date must be before the `end` date.
 */
export const period = v.pipe(
  v.object({
    start: isoDate,
    end: isoDate,
  }),
  v.check(({ start, end }) => isBefore(start, end), "Start date must be before end date"),
);
export type period = v.InferOutput<typeof period>;
