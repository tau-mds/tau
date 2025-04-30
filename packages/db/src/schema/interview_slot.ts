import * as t from "drizzle-orm/sqlite-core";
import { foreignKey } from "drizzle-orm/sqlite-core";
import { typedId } from "../lib/id";
import { interviewRoundTable } from "./interview_round";
import { ids } from "../ids";
import { sql } from "drizzle-orm";
import { interviewerTable } from "./interviewer";
import { intervieweeTable } from "./interviewee";

export const interviewSlotTable = t.sqliteTable(
  "interview_slots",
  {
    id: typedId(ids.interviewSlot).primaryKey(),
    interview_round_id: typedId(ids.interviewRound).notNull(),
    interviewer_email: t.text().notNull(),
    interviewee_email: t.text(),
    start_at: t.integer({ mode: "timestamp" }).notNull(),
    created_at: t
      .integer({ mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    assigned_at: t.integer({ mode: "timestamp" }),
  },
  (table) => {
    return [
      foreignKey({
        columns: [table.interview_round_id],
        foreignColumns: [interviewRoundTable.id],
      }),

      foreignKey({
        columns: [table.interviewer_email, table.interview_round_id],
        foreignColumns: [
          interviewerTable.email,
          interviewerTable.interview_round_id,
        ],
      }),

      foreignKey({
        columns: [table.interviewee_email],
        foreignColumns: [intervieweeTable.email],
      }),
    ];
  }
);

export type InterviewerSlot = typeof interviewSlotTable.$inferSelect;
export type NewInterviewerSlot = typeof interviewSlotTable.$inferInsert;
