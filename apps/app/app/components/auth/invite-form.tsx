import { Button, Input, toast } from "@tau/ui";
import { authClient } from "@tau/auth-client";

export function InviteForm() {
  return (
    <div style={{ margin: "1rem 0" }}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
          if (email) {
            await authClient.signIn.magicLink({
              email,
              callbackURL: "/app/settings/account/profile",
            });
            toast.success("Magic link sent!");
          }
        }}
      >
        <Input
          type="email"
          name="email"
          placeholder="Enter email"
          required
          style={{ marginRight: "0.5rem", padding: "0.5rem" }}
        />
        <Button type="submit">Invite</Button>
      </form>

      <Button
        type="button"
        onClick={() => {
          //   authClient.forgetPassword({
          //     email: "tacustefan21@gmail.com",
          //     redirectTo: "/",
          //   });
        }}
      >
        Invite
      </Button>
    </div>
  );
}
