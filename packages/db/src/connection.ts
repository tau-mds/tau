import { drizzle } from "drizzle-orm/libsql/node";
import { env } from "./env";
// import { relations } from "./relations";

export function connection() {
	if (env.DATABASE_CONN_TYPE === "local") {
		return { url: "file:../../tau.db" } as const;
	}

	return {
		url: env.DATABASE_URL,
		authToken: env.DATABASE_AUTH_TOKEN,
	} as const;
}

export const db = drizzle({
	connection: connection(),
	logger: {
		logQuery: (query, params) => console.info(`[DB Query] ${query} ${params}`),
	},
	// relations,
});
