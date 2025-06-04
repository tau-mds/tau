import { createFileRoute } from "@tanstack/react-router";
import { IntervieweesTable } from "./-components/interviewees-table";
import { InterviewersTable } from "./-components/interviewers-table";
import { api } from "~/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RoundActions } from "./-components/round-actions";

export const Route = createFileRoute("/app/interview-rounds/$roundId/")({
  component: Component,
});

function Component() {
  const params = Route.useParams();
  return (
    <div className="space-y-8 py-6">
      {/* Actions Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Round Actions</h2>
        <RoundActions roundId={params.roundId} />
      </section>

      {/* Tables Section */}
      <section className="space-y-8">
        <InterviewersTable roundId={params.roundId} />
        <IntervieweesTable roundId={params.roundId} />
      </section>
    </div>
  );
}
