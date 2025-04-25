import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/settings/account/berbecaru")({
	component: RouteComponent,
	staticData: {
		breadcrumb: () => "Berbecaru",
	},
});

function RouteComponent() {
	return <div>Hello "/settings/account/berbecaru"!</div>;
}
