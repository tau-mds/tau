import { authClient } from "../../../../../packages/auth-client/src/index";

export async function inviteUser(
	email: string,
	interviewId: string,
): Promise<{ success: boolean; error?: string }> {
	if (!email || !interviewId) {
		return { success: false, error: "Email and interviewId are required." };
	}

	// Simple email validation
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return { success: false, error: "Invalid email address." };
	}

	try {
		await authClient.signIn.magicLink({
			email,
			callbackURL: `/interview/${interviewId}`,
		});
		return { success: true };
	} catch (error: any) {
		return { success: false, error: error?.message || "Failed to send magic link." };
	}
}
