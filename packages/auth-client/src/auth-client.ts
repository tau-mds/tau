// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// export type AuthClient = ReturnType<typeof createAuthClient>;

// This is the client-side auth client. It is used to interact with the auth server.
// export const {useSession} = createAuthClient({

export const authClient = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: "http://localhost:3000",
	plugins: [magicLinkClient()],
});
