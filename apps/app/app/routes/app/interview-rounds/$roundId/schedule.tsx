import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ids } from "@tau/db/ids";
import { Button } from "@tau/ui";
import React from "react";
import { JsxFlags } from "typescript";

import { Scheduler } from "~/components/scheduler/scheduler";

import { api } from "~/lib/api";
import { useScheduleInterview } from "~/lib/api/interviewer";
import { interviewRound } from "~/lib/core/interview-round";

export const Route = createFileRoute("/app/interview-rounds/$roundId/schedule")(
  {
    loader: async ({ params, context }) => {
      await context.queryClient.ensureQueryData(
        api.interviewSlots.queries.ofRound(params.roundId)
      );
    },
    component: RouteComponent,
  }
);

function RouteComponent() {
  const params = Route.useParams();
  const roundQuery = useSuspenseQuery({
    ...api.interviewRounds.queries.id(params.roundId),
    select: (d) => interviewRound.from(d),
  });
  const slotsQuery = useSuspenseQuery(
    api.interviewSlots.queries.ofRoundAndInterviewer(
      params.roundId,
      "mail@mail.com"
    )
  );
  const scheduleInterview = useScheduleInterview();

  const [slots, setSlots] = React.useState(slotsQuery.data);
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);

  const handleCreateSlot = (start: Date) => {
    console.log("handleCreateSlot called with:", start);

    const newSlot = {
      id: ids.generate(ids.interview_slot),
      interview_round_id: params.roundId,
      interviewer_email: "mail@mail.com", // This should come from current user
      interviewee_email: null,
      start_at: start,
      assigned_at: null,
      created_at: new Date(),
    };

    setSlots((prevSlots) => [...prevSlots, newSlot]);
    setHasUnsavedChanges(true);
  };

  const handleSendSlots = async () => {
    if (!hasUnsavedChanges || isSending) return;

    setIsSending(true);
    try {
      // Filter slots that belong to current interviewer and get start times as strings
      const startTimes = slots
        .filter(
          (slot) =>
            slot.interviewer_email === "mail@mail.com" && // Replace with current user email
            !slot.assigned_at // Only unsaved slots
        )
        .map((slot) => slot.start_at.toISOString());

      // Call API with start times array
      await scheduleInterview.mutateAsync({
        roundId: params.roundId,
        schedule_times: startTimes,
      });

      setHasUnsavedChanges(false);

      // Show success feedback
      alert("Slots saved successfully!");
    } catch (error) {
      console.error("Failed to save slots:", error);
      alert("Failed to save slots. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Schedule Interview Slots</h2>

        <Button
          onClick={handleSendSlots}
          disabled={!hasUnsavedChanges || isSending}
          className="min-w-[120px]"
        >
          {isSending ? "Sending..." : "Send Slots"}
        </Button>
      </div>

      {hasUnsavedChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
          <p className="text-sm text-yellow-800">
            You have unsaved changes. Click "Send Slots" to save your preferred
            time slots.
          </p>
        </div>
      )}

      <Scheduler
        slots={slots}
        onCreateSlot={handleCreateSlot}
        interviewRound={roundQuery.data}
      />
    </div>
  );
}

// const init = [
//   {
//     id: ids.generate(ids.interview_slot),
//     interview_round_id: ids.generate(ids.interview_round),
//     interviewer_email: "mail@mail.com",
//     interviewee_email: null,
//     start_at: new Date("2025-05-05T12:00:00"),
//     assigned_at: null,
//     created_at: new Date(),
//   },
//   {
//     id: ids.generate(ids.interview_slot),
//     interview_round_id: ids.generate(ids.interview_round),
//     interviewer_email: "mail2@mail.com",
//     interviewee_email: null,
//     start_at: new Date("2025-06-15T12:00:00"),
//     assigned_at: null,
//     created_at: new Date(),
//   },
//   {
//     id: ids.generate(ids.interview_slot),
//     interview_round_id: ids.generate(ids.interview_round),
//     interviewer_email: "mail@mail.com",
//     interviewee_email: null,
//     start_at: new Date("2025-05-07T13:00:00"),
//     assigned_at: null,
//     created_at: new Date(),
//   },
// ];
