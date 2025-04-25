import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Header } from "~/components/header";
import { AppSidebar } from "~/components/sidebar/app";
import { CommandPalette } from "~/lib/cmdk";
import { sidebar } from "~/lib/sidebar";

export const Route = createFileRoute("/app")({
  loader: async (ctx) => {
    await ctx.context.queryClient.ensureQueryData(sidebar.queries.get());
  },

  component: Component,
});

function Component() {
  return (
    <AppSidebar>
      <Header />

      <Outlet />

      <CommandPalette />
    </AppSidebar>
  );
}
