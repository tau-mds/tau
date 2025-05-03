import * as t from "drizzle-orm/sqlite-core";
import { foreignKey, primaryKey } from "drizzle-orm/sqlite-core";
import { typedId } from "../lib/id";
import { interviewRoundTable } from "./interview_round";
import { ids } from "../ids";

export const intervieweeTable = t.sqliteTable(
	"interviewees",
	{
		email: t.text().notNull(),
		interview_round_id: typedId(ids.interviewee).notNull(),
	},
	(table) => {
		return [
			primaryKey({ columns: [table.email, table.interview_round_id] }),
			foreignKey({
				columns: [table.interview_round_id],
				foreignColumns: [interviewRoundTable.id],
			}),
		];
	},
);

export type Interviewee = typeof intervieweeTable.$inferSelect;
export type NewInterviewee = typeof intervieweeTable.$inferInsert;
