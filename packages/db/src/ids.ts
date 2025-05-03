import * as v from "valibot";
import { ulid as genUlid } from "ulid";

export function createId<const P extends string>(prefix: P) {
	const schema = v.pipe(v.string(), v.brand(`${prefix}_id`));
	return {
		schema,
		new: () => `${prefix}_${genUlid()}` as v.InferOutput<typeof schema>,
	};
}

export type InferId<Id extends ReturnType<typeof createId>> = v.InferOutput<Id["schema"]>;

export declare namespace ids {
	export type interviewRound = InferId<typeof ids.interviewRound>;
	export type interviewer = InferId<typeof ids.interviewer>;
	export type interviewee = InferId<typeof ids.interviewee>;
	export type organizer = InferId<typeof ids.organizer>;
	export type session = InferId<typeof ids.session>;
	export type account = InferId<typeof ids.account>;
	export type verification = InferId<typeof ids.verification>;
	export type interviewSlot = InferId<typeof ids.interviewSlot>;
}

export const ids = {
	interviewRound: createId("ivro"),
	interviewer: createId("iver"),
	interviewee: createId("ivee"),
	organizer: createId("orgz"),
	session: createId("sess"),
	account: createId("accn"),
	verification: createId("veri"),
	interviewSlot: createId("ivsl"),
};
