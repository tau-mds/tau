import { db } from "@tau/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";

// This is the server-side auth instance. It is used to interact with the auth server.
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite", // or "mysql", "sqlite"
	}),

	// Here we can add custom user fields
	user: {
		additionalFields: {},
	},
	emailAndPassword: {
		enabled: true,
	},
	plugins: [reactStartCookies()],
});
