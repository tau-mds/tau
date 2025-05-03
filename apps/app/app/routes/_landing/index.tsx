import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { authClient } from "@tau/auth-client";
import { Button, Dialog } from "@tau/ui";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { InviteForm } from "~/components/auth/invite-form";
import { echo } from "~/lib/api/echo";
import { env } from "~/lib/env";

export const Route = createFileRoute("/_landing/")({
	component: Component,
	loader: async (opts) => {
		// const user = await fetchUser();
		// console.log(user);
		// if (!user) {
		// 	throw redirect({ to: "/app" });
		// }

		opts.context.queryClient.ensureQueryData(
			echo.queries.plm({ salute: "Hi", message: "there" }),
		);
	},
});

function Component() {
	const [count, setCount] = React.useState(0);
	const echoQuery = useSuspenseQuery(
		echo.queries.plm({ salute: "Hi", message: "there" }),
	);

	//   Getting the user session in frontend
	const { data } = authClient.useSession();

	useEffect(() => {
		console.log(data);
		if (!data?.user) {
			console.log(data);
		}
	}, [data]);

	return (
		<main>
			<h1>Proj. Tau</h1>
			<div className="inline-flex items-center justify-between gap-3">
				<Button size="icon" onClick={() => setCount((prev) => prev - 1)}>
					<span className="size-5 grid place-content-center">-</span>
				</Button>
				<p>{count}</p>
				<Button size="icon" onClick={() => setCount((prev) => prev + 1)}>
					<span className="size-5 grid place-content-center">+</span>
				</Button>

				<pre>{env.VITE_API_URL}</pre>
				<pre>{JSON.stringify(echoQuery.data, null, 2)}</pre>
			</div>
			<p>{count}</p>
			{/* Invite form start */}
			<InviteForm />
			{/* Invite form end */}
			<div className="container">
				<Button
					size="icon"
					onClick={() => {
						toast.error("Error");
					}}
				>
					<span>Error</span>
				</Button>
				<Button
					size="icon"
					onClick={() => {
						toast.info("Error");
					}}
				>
					<span>Info</span>
				</Button>
			</div>

			<Dialog.Root>
				<Dialog.Trigger asChild>
					<Button>Open Dialog</Button>
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Title>Dialog Title</Dialog.Title>
					<Dialog.Description>Dialog Description</Dialog.Description>
					<Dialog.Close>Close</Dialog.Close>
				</Dialog.Content>
			</Dialog.Root>
			<Button>
				<Link to="/auth/signin">Sign In</Link>
			</Button>
			<Button>
				<Link to="/app">App</Link>
			</Button>
		</main>
	);
}
