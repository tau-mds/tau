import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@tau/auth-client";
import { auth } from "@tau/auth-server";
import { ids } from "@tau/db/ids";
import { Button, toast } from "@tau/ui";
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
  const { data } = authClient.useSession();

  const [slots, setSlots] = React.useState(slotsQuery.data);
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);

  const handleCreateSlot = (start: Date) => {
    console.log("handleCreateSlot called with:", start);

    const slotEndTime = new Date(
      start.getTime() + roundQuery.data.duration * 60 * 1000
    );

    // Check for overlapping slots
    const hasOverlap = slots.some((existingSlot) => {
      const existingStart = existingSlot.start_at;
      const existingEnd = new Date(
        existingStart.getTime() + roundQuery.data.duration * 60 * 1000
      );

      // Check if new slot overlaps with existing slot
      return (
        (start >= existingStart && start < existingEnd) || // New slot starts during existing slot
        (slotEndTime > existingStart && slotEndTime <= existingEnd) || // New slot ends during existing slot
        (start <= existingStart && slotEndTime >= existingEnd) // New slot completely contains existing slot
      );
    });

    if (hasOverlap) {
      toast.error(
        "Cannot create slot: This time conflicts with an existing slot."
      );
      return;
    }

    const newSlot = {
      id: ids.generate(ids.interview_slot),
      interview_round_id: params.roundId,
      interviewer_email: data?.user?.email || "",
      interviewee_email: null,
      start_at: start,
      assigned_at: null,
      created_at: new Date(),
    };

    setSlots((prevSlots) => [...prevSlots, newSlot]);
    setHasUnsavedChanges(true);
  };

  const handleDeleteSlot = (slotId: string) => {
    console.log("Deleting slot with ID:", slotId);

    // Remove the slot from local state
    setSlots((prevSlots) => prevSlots.filter((slot) => slot.id !== slotId));

    // Mark as having unsaved changes if there are any slots left to save
    setHasUnsavedChanges(true);

    toast.success("Slot deleted successfully!");
  };

  const handleSendSlots = async () => {
    if (!hasUnsavedChanges || isSending) return;

    setIsSending(true);
    try {
      // Filter slots that belong to current interviewer and get start times as strings
      const startTimes = slots
        .filter(
          (slot) =>
            slot.interviewer_email === data?.user?.email && !slot.assigned_at // Only unsaved slots
        )
        .map((slot) => slot.start_at.toISOString());

      // Call API with start times array
      await scheduleInterview.mutateAsync({
        roundId: params.roundId,
        schedule_times: startTimes,
      });

      setHasUnsavedChanges(false);

      // Show success feedback
      toast.success("Slots saved successfully!");
    } catch (error) {
      console.error("Failed to save slots:", error);
      toast.error("Failed to save slots. Please try again.");
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
        onSlotClick={handleDeleteSlot}
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
