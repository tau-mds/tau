import { createFileRoute } from "@tanstack/react-router";
import { IntervieweesTable } from "./-components/interviewees-table";
import { InterviewersTable } from "./-components/interviewers-table";

export const Route = createFileRoute("/app/interview-rounds/$roundId/")({
  component: Component,
});

function Component() {
  const params = Route.useParams();

  return (
    <div>
      <InterviewersTable roundId={params.roundId} />
      <IntervieweesTable roundId={params.roundId} />
    </div>
  );
}
