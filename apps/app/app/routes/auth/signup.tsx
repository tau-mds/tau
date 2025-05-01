import { createFileRoute } from "@tanstack/react-router";
import { AuthFormContainer } from "~/components/auth/auth-form-container";
import { RegisterForm } from "~/components/auth/register-form";

export const Route = createFileRoute("/auth/signup")({
  component: SignUp,
});

function SignUp() {
  return (
    <AuthFormContainer>
      <RegisterForm />
    </AuthFormContainer>
  );
}
