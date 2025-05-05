import { ulid as genUlid } from "ulid";
import * as v from "valibot";

export * as ids from "./ids";

function createId<const P extends string>(prefix: P) {
	const schema = v.pipe(v.string(), v.brand(`${prefix}_id`));
	return Object.assign(schema, { prefix }) as typeof schema & { readonly prefix: P };
}

export type type = ReturnType<typeof createId>;
export type Infer<Id extends type> = v.InferOutput<Id>;

export function generate<const T extends type>(id: T) {
	return `${id.prefix}_${genUlid()}` as Infer<T>;
}

export const interview_round = createId("ivro");
export type interview_round = Infer<typeof interview_round>;

export const interviewer = createId("iver");
export type interviewer = Infer<typeof interviewer>;

export const interviewee = createId("ivee");
export type interviewee = Infer<typeof interviewee>;

export const organizer = createId("orgz");
export type organizer = Infer<typeof organizer>;

export const session = createId("sess");
export type session = Infer<typeof session>;

export const account = createId("accn");
export type account = Infer<typeof account>;

export const verification = createId("veri");
export type verification = Infer<typeof verification>;

export const interview_slot = createId("ivsl");
export type interview_slot = Infer<typeof interview_slot>;
