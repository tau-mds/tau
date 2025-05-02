import { db } from "@tau/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { reactStartCookies } from "better-auth/react-start";
// import { string as valibotString, minLength } from "valibot"; // add valibot import

// This is the server-side auth instance. It is used to interact with the auth server.
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite", // or "mysql", "sqlite"
	}),
	user: {
		modelName: "organizer",
		additionalFields: {
			// name: {},
			// id: {
			// 	type: "string",
			// 	required: true,
			// 	// validator: valibotString([minLength(1)]), // use valibot validator
			// },
		},
	},
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, url, token }, request) => {
			console.log(user, url, token);
		},
	},
	account: {
		accountLinking: {
			enabled: true,
		},
	},
	socialProviders: {
		discord: {
			clientId: (process.env.DISCORD_CLIENT_ID as string) || "1367818396065861652",
			clientSecret:
				(process.env.DISCORD_CLIENT_SECRET as string) ||
				"dN8hXnj0KFUG_TiUc-CI2l3N-wYu7Lh_",
		},
	},
	plugins: [
		reactStartCookies(),

		magicLink({
			sendMagicLink: async ({ email, url }) => {
				// send email to user
				console.log("Sending magic link to email:", email);
				// console.log("Token:", token);
				console.log("URL:", url);
				// console.log("Request:", request);
			},
			generateToken(email) {
				// Generate a token for the user
				// This is a simple example, you can use any token generation method
				return `${email}-${new Date().getTime()}`;
			},
		}),
	],
	// databaseHooks: {
	// 	user: {
	// 		create: {
	// 			before: async (user, context) => {
	// 				// If a custom id is provided in context, use it
	// 				if (context?.customId) {
	// 					return { data: { ...user, id: context.customId } };
	// 				}
	// 				// Otherwise, proceed as normal
	// 				return;
	// 			},
	// 		},
	// 	},
	// },
});

export type Session = typeof auth.$Infer.Session;
