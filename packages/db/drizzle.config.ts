import type { Config } from "drizzle-kit";
import { env } from "./src/env";

export default {
  verbose: true,
  schema: "./src/schema/*.ts",
  dialect: "turso",
  casing: "snake_case",
  out: "./.migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
