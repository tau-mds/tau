import { drizzle } from "drizzle-orm/libsql/node";
import { env } from "./env";
import { log } from "@tau/utils";
// import { relations } from "./relations";

export const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
  logger: {
    logQuery: (query, params) => log.info(`[DB Query] ${query} ${params}`),
  },
  // relations,
});
