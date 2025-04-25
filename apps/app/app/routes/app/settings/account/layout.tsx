import {
	type AnyRoute,
	Link,
	Outlet,
	createFileRoute,
	useLocation,
} from "@tanstack/react-router";
import { Tabs } from "@tau/ui";

export const Route = createFileRoute("/app/settings/account")({
	component: RouteComponent,
	staticData: {
		breadcrumb: () => "Account",
	},
});

function RouteComponent() {
	const tabs = (Route.children as ReadonlyArray<AnyRoute>)?.map((c) => ({
		id: c.id,
		fullPath: c.fullPath,
		label: c.options.staticData?.breadcrumb,
	}));

	const currentRoute = useLocation({ select: (c) => c.pathname });

	return (
		<div className="mt-8 flex flex-col gap-6 max-w-4xl mx-auto">
			<h1 className="text-2xl font-medium">Account settings</h1>

			<div className="border-b">
				<Tabs.Root value={currentRoute}>
					<Tabs.List className="h-auto rounded-none bg-transparent p-0">
						{tabs.map((tab) => (
							<Tabs.Trigger
								key={tab.id}
								value={tab.id}
								className="data-[state=active]:after:bg-primary border-none !bg-transparent relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
								asChild
							>
								<Link to={tab.fullPath}>{tab.label?.()}</Link>
							</Tabs.Trigger>
						))}
					</Tabs.List>
				</Tabs.Root>
			</div>

			<Outlet />
		</div>
	);
}
