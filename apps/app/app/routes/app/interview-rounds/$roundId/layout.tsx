import {
  Link,
  Outlet,
  createFileRoute,
  useLocation,
} from "@tanstack/react-router";
import { ids } from "@tau/db/ids";
import { Button, Card, Tabs, Text } from "@tau/ui";
import * as v from "valibot";
import { Sidebar } from "~/components/sidebar";

import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "~/lib/api";
import DotsHorizontal from "~icons/radix-icons/dots-horizontal";
import Star from "~icons/radix-icons/star";
import { IntervalField } from "./-components/interval-field";
import { StatusField } from "./-components/status-field";
import { TitleField } from "./-components/title-field";

function Breadcrumb() {
  const params = Route.useParams();
  const roundQuery = useSuspenseQuery(
    api.interviewRounds.queries.id(params.roundId)
  );
  return <>{roundQuery.data.title}</>;
}

export const Route = createFileRoute("/app/interview-rounds/$roundId")({
  params: {
    parse: (p) => v.parse(v.object({ roundId: ids.interview_round }), p),
  },
  loader: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(
      api.interviewRounds.queries.id(params.roundId)
    );
  },
  staticData: {
    breadcrumb: () => <Breadcrumb />,
  },
  component: Component,
});

function Component() {
  const params = Route.useParams();
  const roundQuery = useSuspenseQuery(
    api.interviewRounds.queries.id(params.roundId)
  );

  const currentRoute = useLocation({
    select: (c) => c.pathname.split("/").at(-1) ?? "overview",
  });

  return (
    <div className="lg:grid lg:grid-cols-[4fr_1fr] gap-4 max-h-min">
      <Card.Root className="size-full overflow-y-scroll">
        <Card.Content className="max-w-[80rem]">
          <div className="border-b">
            <Text className="!text-3xl !font-medium">
              {roundQuery.data.title}
            </Text>

            <Tabs.Root value={currentRoute}>
              <Tabs.List className="h-auto rounded-none bg-transparent p-0">
                <Tabs.Trigger
                  value={params.roundId}
                  className="data-[state=active]:after:bg-primary border-none !bg-transparent relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  asChild
                >
                  <Link to="/app/interview-rounds/$roundId" params={params}>
                    Overview
                  </Link>
                </Tabs.Trigger>

                <Tabs.Trigger
                  value="planning"
                  className="data-[state=active]:after:bg-primary border-none !bg-transparent relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  asChild
                >
                  <Link
                    to="/app/interview-rounds/$roundId/planning"
                    params={params}
                  >
                    Planning
                  </Link>
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          </div>

          <Outlet />
        </Card.Content>
      </Card.Root>

      <aside className="hidden lg:block max-h-full">
        <Sidebar.Header className="flex flex-row justify-between items-center p-0">
          <Button size="icon">
            <Star />
          </Button>

          <div className="flex-1" />

          <Button variant="ghost">Share</Button>

          <Button size="icon">
            <DotsHorizontal />
          </Button>
        </Sidebar.Header>

        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel className="p-0">Properties</Sidebar.GroupLabel>

            <Sidebar.Menu>
              <Sidebar.MenuItem className="grid grid-cols-[1fr_3fr] items-center">
                <Text weight="plus" leading="compact">
                  Name
                </Text>

                <TitleField roundId={params.roundId} />
              </Sidebar.MenuItem>

              <Sidebar.MenuItem className="grid grid-cols-[1fr_3fr] items-center">
                <Text weight="plus" leading="compact">
                  Interval
                </Text>

                <IntervalField roundId={params.roundId} />
              </Sidebar.MenuItem>

              <Sidebar.MenuItem className="grid grid-cols-[1fr_3fr] items-center">
                <Text weight="plus" leading="compact">
                  Status
                </Text>

                <StatusField roundId={params.roundId} />
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
      </aside>
    </div>
  );
}
