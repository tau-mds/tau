import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ids } from "@tau/db/ids";
import { Button, Card, Text } from "@tau/ui";
import { format } from "date-fns";
import * as v from "valibot";
import { api } from "~/lib/api";
import { isoDate } from "~/lib/types";

export const Route = createFileRoute("/playground/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(api.interviewRounds.queries.all());
  },
});

function RouteComponent() {
  const createRound = api.interviewRounds.useCreate();
  const updateRound = api.interviewRounds.useUpdate();
  const updateInterviewees = api.interviewRounds.useUpdateInterviewees();
  const updateInterviewers = api.interviewRounds.useUpdateInterviewers();
  const schedule = api.interviewRounds.useSchedule();
  const open = api.interviewRounds.useOpen();
  const close = api.interviewRounds.useClose();

  const roundsQuery = useSuspenseQuery(api.interviewRounds.queries.all());

  return (
    <div>
      <Button
        onClick={() =>
          createRound.mutate({
            id: v.parse(ids.interview_round, "ivro_01JT9632V1YKZXE3YFPG0QCV8P"),
            title: `Test Round ${new Date().toISOString()}`,
            description: "Created from test",
            duration: 30,
            period: {
              start: v.parse(isoDate, "2025-05-04"),
              end: v.parse(isoDate, "2025-06-04"),
            },
          })
        }
        disabled={createRound.isPending}
      >
        {createRound.isPending ? "Creating" : "Create interview round"}
      </Button>

      <Button
        onClick={() =>
          updateRound.mutate({
            id: v.parse(ids.interview_round, "ivro_01JT9632V1YKZXE3YFPG0QCV8P"),
            title: "Updated Title from test",
          })
        }
        disabled={updateRound.isPending}
      >
        {updateRound.isPending ? "Updating..." : "Update Interview Round"}
      </Button>

      <Button
        onClick={() =>
          updateInterviewees.mutate({
            id: v.parse(ids.interview_round, "ivro_01JT9632V1YKZXE3YFPG0QCV8P"),
            invited: ["test3@example.com", "test4@example.com"],
            revoked: ["test1@example.com"],
          })
        }
        disabled={updateInterviewees.isPending}
      >
        {updateInterviewees.isPending ? "Updating..." : "Set Interviewee List"}
      </Button>
      <Button
        onClick={() =>
          updateInterviewers.mutate({
            id: v.parse(ids.interview_round, "ivro_01JT9632V1YKZXE3YFPG0QCV8P"),
            updated: [{ email: "test4@example.com", interviewsCount: 2 }],
            revoked: ["test3@example.com"],
          })
        }
        disabled={updateInterviewees.isPending}
      >
        {updateInterviewees.isPending ? "Updating..." : "Set Interviewer List"}
      </Button>

      <Button
        onClick={() =>
          schedule.mutate({
            id: v.parse(ids.interview_round, "ivro_01JT9632V1YKZXE3YFPG0QCV8P"),
          })
        }
        disabled={schedule.isPending}
      >
        {schedule.isPending ? "Updating..." : "Schedule"}
      </Button>

      <Button
        onClick={() =>
          open.mutate({
            id: v.parse(ids.interview_round, "ivro_01JT9632V1YKZXE3YFPG0QCV8P"),
          })
        }
        disabled={open.isPending}
      >
        {open.isPending ? "Updating..." : "Open"}
      </Button>

      <Button
        onClick={() =>
          close.mutate({
            id: v.parse(ids.interview_round, "ivro_01JT9632V1YKZXE3YFPG0QCV8P"),
          })
        }
        disabled={close.isPending}
      >
        {close.isPending ? "Updating..." : "Close"}
      </Button>

      {roundsQuery.data.map((r) => (
        <Card.Root key={r.id}>
          <Card.Title>
            {r.title} - {r.status}
          </Card.Title>

          <Card.Description>
            Created by: {r.organizer_id}
            <Text size="small">{r.description}</Text>
          </Card.Description>

          <Card.Content>{format(r.start_date, "dd MMM yyyy")}</Card.Content>
        </Card.Root>
      ))}
      <pre>{JSON.stringify(roundsQuery.data, null, 2)}</pre>
    </div>
  );
}
