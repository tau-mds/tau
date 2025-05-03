import * as t from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { ids } from "../ids";
import { typedId } from "../lib/id";
import { organizer } from "./auth-schema";

export const interviewRoundTable = t.sqliteTable(
  "interview_rounds",
  {
    id: typedId(ids.interviewRound).primaryKey(),
    organizer_id: t.text().notNull(),
    title: t.text().notNull(),
    description: t.text(),
    interview_duration: t.integer(),
    status: t.text().notNull(),
    start_date: t.integer({ mode: "timestamp" }).notNull(),
    end_date: t.integer({ mode: "timestamp" }),
    created_at: t
      .integer({ mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updated_at: t
      .integer({ mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    t.foreignKey({
      columns: [table.organizer_id],
      foreignColumns: [organizer.id],
    }),
  ]
);

export type InterviewRound = typeof interviewRoundTable.$inferSelect;
export type NewInterviewRound = typeof interviewRoundTable.$inferInsert;
