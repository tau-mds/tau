import { foreignKey, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core";
import { ids } from "../ids";
import { interview_round } from "./interview_round";
import { id } from "../lib/id";

export const interviewer = sqliteTable(
	"interviewers",
	(t) => ({
		email: t.text().notNull(),
		interview_round_id: id(ids.interview_round, { generate: false }).notNull(),
		interviews_count: t.integer().notNull().default(1),
	}),
	(table) => [
		primaryKey({ columns: [table.email, table.interview_round_id] }),
		foreignKey({
			columns: [table.interview_round_id],
			foreignColumns: [interview_round.id],
		}),
	],
);

export type interviewer = typeof interviewer.$inferSelect;
export type interviewer_insert = typeof interviewer.$inferInsert;
