import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ids } from "@tau/db/ids";

import { Scheduler } from "~/components/scheduler/scheduler";

import { api } from "~/lib/api";
import { interviewRound } from "~/lib/core/interview-round";

export const Route = createFileRoute("/app/interview-rounds/$roundId/schedule")({
  loader: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(
      api.interviewSlots.queries.ofRound(params.roundId),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const roundQuery = useSuspenseQuery({
    ...api.interviewRounds.queries.id(params.roundId),
    select: (d) => interviewRound.from(d),
  });
  const slotsQuery = useSuspenseQuery(api.interviewSlots.queries.ofRound(params.roundId));

  // const [slots, setSlots] = React.useState(init);

  return (
    <Scheduler
      slots={slotsQuery.data}
      // onCreateSlot={(start) => {
      //   console.debug({ start });
      //   return setSlots([
      //     ...slots,
      //     {
      //       id: ids.generate(ids.interview_slot),
      //       interview_round_id: ids.generate(ids.interview_round),
      //       interviewer_email: "mail@mail.com",
      //       interviewee_email: null,
      //       start_at: start,
      //       assigned_at: null,
      //       created_at: new Date(),
      //     },
      //   ]);
      // }}
      interviewRound={roundQuery.data}
    />
  );
}

const init = [
  {
    id: ids.generate(ids.interview_slot),
    interview_round_id: ids.generate(ids.interview_round),
    interviewer_email: "mail@mail.com",
    interviewee_email: null,
    start_at: new Date("2025-05-05T12:00:00"),
    assigned_at: null,
    created_at: new Date(),
  },
  {
    id: ids.generate(ids.interview_slot),
    interview_round_id: ids.generate(ids.interview_round),
    interviewer_email: "mail2@mail.com",
    interviewee_email: null,
    start_at: new Date("2025-05-05T12:00:00"),
    assigned_at: null,
    created_at: new Date(),
  },
  {
    id: ids.generate(ids.interview_slot),
    interview_round_id: ids.generate(ids.interview_round),
    interviewer_email: "mail@mail.com",
    interviewee_email: null,
    start_at: new Date("2025-05-07T13:00:00"),
    assigned_at: null,
    created_at: new Date(),
  },
];
