import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type React from "react";

import { ThemeSwitcher } from "~/components/theme-switcher";
import { ClientHint } from "~/lib/client-hint";
import { theme } from "~/lib/theme";

import JetbrainsMono from "@fontsource-variable/jetbrains-mono?url";
import OverusedGrotesk from "@tau/assets/fonts/overused-grotesk.woff2";
import styles from "~/root.css?url";

type Context = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<Context>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Tau" },
		],
		links: [
			{
				rel: "preload",
				href: OverusedGrotesk,
				as: "font",
				type: "font/woff2",
				crossOrigin: "",
			},
			{ rel: "stylesheet", href: JetbrainsMono },
			{ rel: "stylesheet", href: styles },
		],
	}),
	loader: async (ctx) => {
		await ctx.context.queryClient.ensureQueryData(theme.queries.get());
	},
	component: Component,
});

function Component() {
	return (
		<Document>
			<Outlet />
		</Document>
	);
}

function Document(props: Readonly<{ children: React.ReactNode }>) {
	const themeData = theme.useWithPrefference();

	return (
		<html lang="en" data-theme={themeData} className="bg-ui-background text-ui-fg-text">
			<head>
				<ClientHint />
				<HeadContent />
			</head>
			<body>
				<ThemeSwitcher />

				{props.children}

				<TanStackRouterDevtools position="bottom-right" />
				<ReactQueryDevtools buttonPosition="bottom-left" />
				<Scripts />
			</body>
		</html>
	);
}
