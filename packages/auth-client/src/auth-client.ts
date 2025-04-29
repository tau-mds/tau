import { createAuthClient } from "better-auth/react";

export type AuthClient = ReturnType<typeof createAuthClient>;

// This is the client-side auth client. It is used to interact with the auth server.
// export const {useSession} = createAuthClient({
export const authClient: AuthClient = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: "http://localhost:3000",
});
