import { db } from "@tau/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { reactStartCookies } from "better-auth/react-start";
import { resend, Email } from "@tau/email";
import { render } from "@react-email/components";
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
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },

  socialProviders: {
    discord: {
      clientId: (process.env["DISCORD_CLIENT_ID"] as string) || "",
      clientSecret: (process.env["DISCORD_CLIENT_SECRET"] as string) || "",
      overrideUserInfoOnSignIn: true,
    },
    github: {
      clientId: (process.env["GITHUB_CLIENT_ID"] as string) || "",
      clientSecret: (process.env["GITHUB_CLIENT_SECRET"] as string) || "",
      overrideUserInfoOnSignIn: true,
    },
  },
  plugins: [
    reactStartCookies(),

    magicLink({
      sendMagicLink: async ({ email, url }, request) => {
        // send email to user
        console.log(request);
        if (request == null || request.body == null) return;
        console.log("Sending magic link to email:", email);
        const body = await request.text();
        const parsedBody = JSON.parse(body);
        // console.log((request?.body as any)["role"])
        console.log(parsedBody);
        // console.log("Token:", token);
        console.log("URL:", url);
        let actualURL;
        if (process.env["DATABASE_CONN_TYPE"] == "local") {
          actualURL = "https://localhost:3000/api/auth" + url;
        } else {
          actualURL = url;
        }
        const mail = Email.AppointmentLinkEmail({
          recipientName: "Domnul Rizescu",
          magicLink: actualURL,
          role: parsedBody.role,
        });
        const html = await render(mail);
        await resend.emails.send({
          from: "Tau <onboarding@resend.dev>",
          to: [email],
          subject: "Interview Scheduling Invitation",
          html: html,
        });

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
