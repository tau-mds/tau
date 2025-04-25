import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/settings/account/notifications")({
  component: RouteComponent,
  staticData: {
    breadcrumb: () => "Notifications",
  },
});

function RouteComponent() {
  return <div>Hello "/settings/account/notifications"!</div>;
}
