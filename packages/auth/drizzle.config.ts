import { connection } from "@tau/db";
import type { Config } from "drizzle-kit";

export default {
	verbose: true,
	schema: "./src/schema/*.ts",
	dialect: "turso",
	casing: "snake_case",
	out: "./.migrations",
	dbCredentials: connection(),
} satisfies Config;
