import * as t from "drizzle-orm/sqlite-core";
import { typedId } from "../lib/id";
import { ids } from "../ids";

export const organizerTable = t.sqliteTable("organizers", {
  id: typedId(ids.organizer).primaryKey(),
  email: t.text().notNull().unique(),
  password: t.text().notNull(),
  first_name: t.text().notNull(),
  last_name: t.text().notNull(),
});

export type Organizer = typeof organizerTable.$inferSelect;
export type NewOrganizer = typeof organizerTable.$inferInsert;
