import type { Config } from "drizzle-kit";
import { connection } from "./src/connection";

export default {
	verbose: true,
	schema: "./src/schema/*.ts",
	dialect: "turso",
	casing: "snake_case",
	out: "./.migrations",
	dbCredentials: connection(),
} satisfies Config;
