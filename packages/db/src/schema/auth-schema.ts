import { sqliteTable } from "drizzle-orm/sqlite-core";
import { ids } from "../ids";
import { id } from "../lib/id";

export const organizer = sqliteTable("organizer", (t) => ({
  id: id(ids.organizer).primaryKey(),
  name: t.text().notNull(),
  email: t.text().notNull().unique(),
  emailVerified: t.integer({ mode: "boolean" }).notNull(),
  image: t.text(),
  createdAt: t.integer({ mode: "timestamp" }).notNull(),
  updatedAt: t.integer({ mode: "timestamp" }).notNull(),
}));

export type organizer = typeof organizer.$inferSelect;

export const session = sqliteTable("session", (t) => ({
  id: id(ids.session).primaryKey(),
  expiresAt: t.integer({ mode: "timestamp" }).notNull(),
  token: t.text().notNull().unique(),
  createdAt: t.integer({ mode: "timestamp" }).notNull(),
  updatedAt: t.integer({ mode: "timestamp" }).notNull(),
  ipAddress: t.text(),
  userAgent: t.text(),

  userId: id(ids.organizer, { generate: false })
    .notNull()
    .references(() => organizer.id, { onDelete: "cascade" }),
}));

export type session = typeof session.$inferSelect;

export const account = sqliteTable("account", (t) => ({
  id: id(ids.account).primaryKey(),
  accountId: t.text().notNull(),
  providerId: t.text().notNull(),
  userId: id(ids.organizer, { generate: false })
    .notNull()
    .references(() => organizer.id, { onDelete: "cascade" }),
  accessToken: t.text(),
  refreshToken: t.text(),
  idToken: t.text(),
  accessTokenExpiresAt: t.integer({ mode: "timestamp" }),
  refreshTokenExpiresAt: t.integer({ mode: "timestamp" }),
  scope: t.text(),
  password: t.text(),
  createdAt: t.integer({ mode: "timestamp" }).notNull(),
  updatedAt: t.integer({ mode: "timestamp" }).notNull(),
}));

export type account = typeof account.$inferSelect;

export const verification = sqliteTable("verification", (t) => ({
  id: id(ids.verification).primaryKey(),
  identifier: t.text().notNull(),
  value: t.text().notNull(),
  expiresAt: t.integer({ mode: "timestamp" }).notNull(),
  createdAt: t.integer({ mode: "timestamp" }),
  updatedAt: t.integer({ mode: "timestamp" }),
}));

export type verification = typeof verification.$inferSelect;
