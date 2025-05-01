import { Link, Outlet, createFileRoute, useRouter } from "@tanstack/react-router";
import { authClient } from "@tau/auth-client";
import { Button, NavigationMenu } from "@tau/ui";
import { useEffect } from "react";
import { toast } from "sonner";
import { Header } from "~/components/header";
import { AppSidebar } from "~/components/sidebar/app";
import { sidebar } from "~/lib/sidebar";

export const Route = createFileRoute("/auth")({
	loader: async (ctx) => {
		await ctx.context.queryClient.ensureQueryData(sidebar.queries.get());
	},

	component: Component,
});

function Component() {
	const { data } = authClient.useSession();
	const { navigate } = useRouter();
	console.log();

	useEffect(() => {
		if (!data?.user) {
			if (!location.pathname.includes("auth/")) {
				navigate({ to: "/auth/signin" });
			}
		} else {
			navigate({ to: "/" });
		}
	}, [data, navigate]);

	return (
		<>
			<nav className="grid grid-cols-3 items-center w-full p-4">
				<div className="flex items-center justify-center gap-2">
					<svg
						width="60"
						height="45"
						viewBox="0 0 60 45"
						fill="none"
						className="w-5 h-5"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Better Auth</title>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M0 0H15V15H30V30H15V45H0V30V15V0ZM45 30V15H30V0H45H60V15V30V45H45H30V30H45Z"
							className="fill-black dark:fill-white"
						/>
					</svg>
					<p>BETTER-AUTH</p>
					<p>x</p>
					<svg
						className="w-5 h-5"
						xmlns="http://www.w3.org/2000/svg"
						width="45"
						height="45"
						viewBox="0 0 100 100"
						fill="none"
					>
						<title>TanStack Start</title>
						<mask
							id="a"
							style={{ maskType: "alpha" }}
							maskUnits="userSpaceOnUse"
							x="0"
							y="0"
							width="100"
							height="100"
						>
							<circle cx="50" cy="50" r="50" className="fill-foreground" />
						</mask>
						<g mask="url(#a)">
							<circle
								cx="11"
								cy="119"
								r="52"
								className="fill-muted-foreground stroke-foreground"
								strokeWidth="4"
							/>
							<circle
								cx="10"
								cy="125"
								r="52"
								className="fill-muted-foreground stroke-foreground"
								strokeWidth="4"
							/>
							<circle
								cx="9"
								cy="131"
								r="52"
								className="fill-muted-foreground stroke-muted-foreground"
								strokeWidth="4"
							/>
							<circle
								cx="88"
								cy="119"
								r="52"
								className="fill-muted-foreground stroke-foreground"
								strokeWidth="4"
							/>
							<path
								className="fill-foreground"
								d="M89 35h2v5h-2zM83 34l2 1-1 4h-2zM77 31l2 1-3 4-2-1zM73 27l1 1-3 4-1-2zM70 23l1 1-4 3-1-2zM68 18v2l-4 1-1-2zM68 11l1 2-5 1-1-2zM69 6v2h-5V6z"
							/>
							<circle
								cx="89"
								cy="125"
								r="52"
								className="fill-muted-foreground stroke-foreground"
								strokeWidth="4"
							/>
							<circle
								cx="90"
								cy="131"
								r="52"
								className="fill-muted-foreground stroke-muted-foreground"
								strokeWidth="4"
							/>
							<ellipse
								cx="49.5"
								cy="119"
								rx="41.5"
								ry="51"
								className="fill-muted-foreground"
							/>
							<path
								d="M34 38v-9c1 1 2 4 5 6l7 30-8 2c-1-23-2-23-4-29Z"
								className="fill-foreground stroke-muted-foreground"
							/>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M95 123c0 31-20 57-45 57S5 154 5 123c0-27 14-50 33-56l12-2c25 0 45 26 45 58Zm-45 47c22 0 39-22 39-50S72 70 50 70s-39 22-39 50 17 50 39 50Z"
								className="fill-foreground"
							/>
							<path
								d="M34 29c-4-8-11-5-14-4 2 3 5 4 9 4h5Z"
								className="fill-foreground stroke-muted-foreground"
							/>
							<path
								d="M25 38c-1 6 0 14 2 18 5-7 7-13 7-18v-9c-5 1-7 5-9 9Z"
								className="fill-muted-foreground"
							/>
							<path
								d="M34 29c-1 3-5 11-5 16m5-16c-5 1-7 5-9 9-1 6 0 14 2 18 5-7 7-13 7-18v-9Z"
								className="stroke-muted-foreground"
							/>
							<path
								d="M44 18c-10 1-11 7-10 11l4-3c5-4 6-7 6-8Z"
								className="fill-foreground stroke-muted-foreground"
							/>
							<path d="M34 29h7l18 4c-3-6-9-14-21-7l-4 3Z" className="fill-foreground" />
							<path
								d="M34 29c4-2 12-5 18-1m-18 1h7l18 4c-3-6-9-14-21-7l-4 3Z"
								className="stroke-muted-foreground"
							/>
							<path
								d="M32 29a1189 1189 0 0 1-16 19c0-17 7-18 13-19h5a14 14 0 0 1-2 0Z"
								className="fill-foreground"
							/>
							<path
								d="M34 29c-5 1-7 5-9 9l-9 10c0-17 7-18 13-19h5Zm0 0c-5 2-11 3-14 10"
								className="stroke-muted-foreground"
							/>
							<path
								d="M41 29c9 2 13 10 15 14a25 25 0 0 1-22-14h7Z"
								className="fill-foreground"
							/>
							<path
								d="M34 29c3 1 11 5 15 9m-15-9h7c9 2 13 10 15 14a25 25 0 0 1-22-14Z"
								className="stroke-muted-foreground"
							/>
							<circle
								cx="91.5"
								cy="12.5"
								r="18.5"
								className="fill-foreground stroke-muted-foreground"
								strokeWidth="2"
							/>
						</g>
					</svg>
					<p>TANSTACK START.</p>
				</div>
				<div className="flex items-center justify-center gap-4">
					{data?.user ? (
						<p>Hello {data.user.name}</p>
					) : (
						<NavigationMenu.Root>
							<NavigationMenu.List>
								<NavigationMenu.Item>
									<NavigationMenu.Link asChild>
										<Link to="/auth/signin" activeProps={{ className: "bg-accent/50" }}>
											Sign In
										</Link>
									</NavigationMenu.Link>
								</NavigationMenu.Item>
								<NavigationMenu.Item>
									<NavigationMenu.Link asChild>
										<Link to="/auth/signup" activeProps={{ className: "bg-accent/50" }}>
											Sign Up
										</Link>
									</NavigationMenu.Link>
								</NavigationMenu.Item>
							</NavigationMenu.List>
						</NavigationMenu.Root>
					)}
				</div>
				<div className="flex items-center gap-4 justify-center">
					{data?.user && (
						<Button
							onClick={() =>
								authClient.signOut(
									{},
									{
										onError: (error) => {
											console.warn(error);
											toast.error(error.error.message);
										},
										onSuccess: () => {
											toast.success("You have been signed out!");
										},
									},
								)
							}
							variant="destructive"
						>
							Sign Out
						</Button>
					)}
				</div>
			</nav>

			<Outlet />
		</>
	);
}
