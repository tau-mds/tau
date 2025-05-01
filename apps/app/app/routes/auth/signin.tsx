import { createFileRoute } from "@tanstack/react-router";
import { AuthFormContainer } from "~/components/auth/auth-form-container";
import { LoginForm } from "~/components/auth/login-form";

export const Route = createFileRoute("/auth/signin")({
	component: SignIn,
});

function SignIn() {
	return (
		<AuthFormContainer>
			<LoginForm />
		</AuthFormContainer>
	);
}
