import {
  type AnyRoute,
  createFileRoute,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { Card } from "@tau/ui";
import { Sidebar } from "~/components/sidebar";

import ChevronLeft from "~icons/radix-icons/chevron-left";

export const Route = createFileRoute("/app/settings")({
  component: RouteComponent,
  staticData: {
    breadcrumb: () => "Settings",
  },
});

function RouteComponent() {
  const links = (Route.children as ReadonlyArray<AnyRoute>)?.map((c) => ({
    id: c.id,
    fullPath: c.fullPath,
    label: c.options.staticData?.breadcrumb,
    items: (c.children as ReadonlyArray<AnyRoute>)?.map((c) => ({
      id: c.id,
      fullPath: c.fullPath,
      label: c.options.staticData?.breadcrumb,
    })),
  }));

  return (
    <div className="lg:grid lg:grid-cols-[1fr_4fr] gap-4">
      <aside className="hidden lg:block">
        <Sidebar.Header>
          <Link to=".." className="inline-flex gap-2 items-center">
            <ChevronLeft />
            <span>Back to app</span>
          </Link>
        </Sidebar.Header>

        <Sidebar.Content>
          {links?.map((l) => (
            <Sidebar.Group key={l.id}>
              <Sidebar.GroupLabel>{l.label?.()}</Sidebar.GroupLabel>

              <Sidebar.Menu>
                {l.items.map((it) => (
                  <Sidebar.MenuItem key={it.id}>
                    <Sidebar.MenuButton className="hover:bg-surface-3" asChild>
                      <Link to={it.fullPath}>{it.label?.()}</Link>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                ))}
              </Sidebar.Menu>
            </Sidebar.Group>
          ))}
        </Sidebar.Content>
      </aside>

      <Card.Root className="size-full">
        <Card.Content className="max-w-[80rem]">
          <Outlet />
        </Card.Content>
      </Card.Root>
    </div>
  );
}
