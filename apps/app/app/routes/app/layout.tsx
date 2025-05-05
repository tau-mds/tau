import { Outlet, createFileRoute } from "@tanstack/react-router";

import { Header } from "~/components/header";
import { AppSidebar } from "~/components/sidebar/app";
import { api } from "~/lib/api";
import { CommandPalette } from "~/lib/cmdk";
import { sidebar } from "~/lib/sidebar";

export const Route = createFileRoute("/app")({
	beforeLoad: async () => {
		await api.users.assertAuthenticated();
	},
	loader: async (ctx) => {
		await ctx.context.queryClient.ensureQueryData(sidebar.queries.get());
	},

	component: Component,
});

function Component() {
	return (
		<AppSidebar>
			<CommandPalette />

			<Header />

			<Outlet />
		</AppSidebar>
	);
}
