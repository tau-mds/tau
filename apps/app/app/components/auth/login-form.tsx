import { Link, useRouter } from "@tanstack/react-router";
import { authClient } from "@tau/auth-client";
import { Button, Card, Input, Label, Text, toast } from "@tau/ui";
import type React from "react";

import Discord from "~icons/radix-icons/discord-logo";
import Github from "~icons/radix-icons/github-logo";

export function LoginForm() {
	const router = useRouter();

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const data = new FormData(form);
		authClient.signIn.email(
			{
				email: data.get("email") as string,
				password: data.get("password") as string,
			},
			{
				onError: (error) => {
					console.warn(error);
					toast.error(error.error.message);
				},
				onSuccess: () => {
					toast.success("You have been logged in!");
					router.navigate({ to: "/app" });
				},
			},
		);
	}

	return (
		<Card.Root className="mx-auto max-w-sm">
			<Card.Header>
				<Card.Title className="text-2xl">Sign In</Card.Title>
				<Card.Description>
					Enter your email below to sign in to your account
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<form onSubmit={handleSubmit} className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="m@example.com"
							required
						/>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
						</div>

						<Input id="password" name="password" type="password" required />
					</div>
					<Button type="submit" className="w-full" variant="outline">
						Sign In
					</Button>
				</form>

				<div className="mt-4 border-t py-2 flex flex-col gap-2">
					<Button
						className="w-full gap-2"
						onClick={() => {
							authClient.signIn.social({
								provider: "discord",
							});
						}}
					>
						<Discord />
						Continue with Discord
					</Button>
					<Button
						className="gap-2 w-full"
						onClick={() => {
							authClient.signIn.social({
								provider: "github",
								callbackURL: "/",
							});
						}}
					>
						<Github />
						Continue with GitHub
					</Button>
				</div>
			</Card.Content>

			<Card.Footer className="justify-center">
				<Text className="text-center">
					Don&apos;t have an account?{" "}
					<Link to="/auth/signup" className="underline">
						Sign up
					</Link>
				</Text>
			</Card.Footer>
		</Card.Root>
	);
}
