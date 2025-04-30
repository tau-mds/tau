import { drizzle } from "drizzle-orm/libsql/node";
import { env } from "./env";
import { schema } from "./schema";
// import * as schema from "./schema";
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

// console.dir(schema);

export const db = drizzle({
	connection: connection(),
	logger: {
		logQuery: (query, params) => console.info(`[DB Query] ${query} ${params}`),
	},
	schema,
	// schema: {
	// 	user,
	// }, // schema is optional, but recommended for type safety
	// relations,
});
