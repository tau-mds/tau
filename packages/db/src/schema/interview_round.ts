import { sql } from "drizzle-orm";
import { foreignKey, sqliteTable } from "drizzle-orm/sqlite-core";
import { ids } from "../ids";
import { organizer } from "./auth-schema";
import { id } from "../lib/id";

export const interview_round = sqliteTable(
  "interview_rounds",
  (t) => ({
    id: id(ids.interview_round).primaryKey(),
    organizer_id: id(ids.organizer, { generate: false }).notNull(),
    title: t.text().notNull(),
    description: t.text(),
    interview_duration: t.integer(),
    status: t.text().notNull(),
    start_date: t.integer({ mode: "timestamp" }).notNull(),
    end_date: t.integer({ mode: "timestamp" }),
    created_at: t.integer({ mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    updated_at: t
      .integer({ mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
      .$onUpdateFn(() => new Date()),
  }),
  (table) => [
    foreignKey({
      columns: [table.organizer_id],
      foreignColumns: [organizer.id],
    }),
  ],
);

export type interview_round = typeof interview_round.$inferSelect;
export type interview_round_insert = typeof interview_round.$inferInsert;
