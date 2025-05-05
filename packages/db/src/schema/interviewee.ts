import { foreignKey, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core";
import { ids } from "../ids";
import { interview_round } from "./interview_round";
import { id } from "../lib/id";

export const interviewee = sqliteTable(
	"interviewees",
	(t) => ({
		email: t.text().notNull(),
		interview_round_id: id(ids.interview_round, { generate: false }).notNull(),
	}),
	(table) => [
		primaryKey({ columns: [table.email, table.interview_round_id] }),
		foreignKey({
			columns: [table.interview_round_id],
			foreignColumns: [interview_round.id],
		}),
	],
);

export type interviewee = typeof interviewee.$inferSelect;
export type interviewee_insert = typeof interviewee.$inferInsert;
