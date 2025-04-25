import * as t from "drizzle-orm/sqlite-core";
import { createId, type InferId, typedId } from "../lib/id";

export const id = createId("foo");
export type id = InferId<typeof id>;

export const table = t.sqliteTable("foo", {
  id: typedId(id).primaryKey(),
  bar: t.text(),
});
export type Fields = typeof table.$inferSelect;
