import { connection } from "@tau/db";
import { drizzle } from "drizzle-orm/libsql/node";

export const authDb = drizzle({
	connection: connection(),
});
