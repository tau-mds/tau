import * as v from "valibot";
import { ulid as genUlid } from "ulid";

export function createId<const P extends string>(prefix: P) {
  const schema = v.pipe(v.string(), v.brand(`${prefix}_id`));
  return {
    schema,
    new: () => `${prefix}_${genUlid()}` as v.InferOutput<typeof schema>,
  };
}

export type InferId<Id extends ReturnType<typeof createId>> = v.InferOutput<
  Id["schema"]
>;

export const ids = {
  interviewRound: createId("ivro"),
  interviewer: createId("iver"),
  interviewee: createId("ivee"),
  organizer: createId("orgz"),
  interviewSlot: createId("ivsl"),
};
