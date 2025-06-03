import { relations, sql } from "drizzle-orm";
import { foreignKey, sqliteTable } from "drizzle-orm/sqlite-core";
import { ids } from "../ids";
import { id } from "../lib/id";
import { interview_round } from "./interview_round";
import { interviewee } from "./interviewee";
import { interviewer } from "./interviewer";

export const interview_slot = sqliteTable(
  "interview_slots",
  (t) => ({
    id: id(ids.interview_slot).primaryKey(),
    interview_round_id: id(ids.interview_round, { generate: false }).notNull(),
    interviewer_email: t.text().notNull(),
    interviewee_email: t.text(),
    start_at: t.integer({ mode: "timestamp" }).notNull(),
    created_at: t.integer({ mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    assigned_at: t.integer({ mode: "timestamp" }),
  }),
  (table) => [
    foreignKey({
      columns: [table.interview_round_id],
      foreignColumns: [interview_round.id],
    }),
    foreignKey({
      columns: [table.interviewer_email, table.interview_round_id],
      foreignColumns: [interviewer.email, interviewer.interview_round_id],
    }),
    foreignKey({
      columns: [table.interviewee_email, table.interview_round_id],
      foreignColumns: [interviewee.email, interviewee.interview_round_id],
    }),
  ],
);

export type interview_slot = typeof interview_slot.$inferSelect;
export type interview_slot_insert = typeof interview_slot.$inferInsert;

export const interview_slot_relations = relations(interview_slot, (r) => ({
  interviewer: r.one(interviewer, {
    fields: [interview_slot.interviewer_email],
    references: [interviewer.email],
  }),
}));
