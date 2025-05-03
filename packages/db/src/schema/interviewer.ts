import * as t from "drizzle-orm/sqlite-core";
import { foreignKey, primaryKey } from "drizzle-orm/sqlite-core";
import { ids } from "../ids";
import { typedId } from "../lib/id";
import { interviewRoundTable } from "./interview_round";

export const interviewerTable = t.sqliteTable(
	"interviewers",
	{
		email: t.text().notNull(),
		interview_round_id: typedId(ids.interviewRound).notNull(),
		interviews_count: t.integer().notNull().default(1),
	},
	(table) => [
		primaryKey({ columns: [table.email, table.interview_round_id] }),
		foreignKey({
			columns: [table.interview_round_id],
			foreignColumns: [interviewRoundTable.id],
		}),
	],
);

export type Interviewer = typeof interviewerTable.$inferSelect;
export type NewInterviewer = typeof interviewerTable.$inferInsert;
