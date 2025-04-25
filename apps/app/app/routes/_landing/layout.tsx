import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing")({
  component: Component,
});

function Component() {
  return <Outlet />;
}
