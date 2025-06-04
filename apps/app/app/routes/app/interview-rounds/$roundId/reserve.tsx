import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { ids } from "@tau/db/ids";
import { Button, toast } from "@tau/ui";
import React from "react";

import { Scheduler } from "~/components/scheduler/scheduler";

import { api } from "~/lib/api";
import { useReserveInterview } from "~/lib/api/interviewee";
import { interviewRound } from "~/lib/core/interview-round";

export const Route = createFileRoute("/app/interview-rounds/$roundId/reserve")({
  loader: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(
      api.interviewSlots.queries.ofRound(params.roundId)
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const navigate = Route.useNavigate();
  const roundQuery = useSuspenseQuery({
    ...api.interviewRounds.queries.id(params.roundId),
    select: (d) => interviewRound.from(d),
  });

  const slotsQuery = useSuspenseQuery(
    api.interviewSlots.queries.ofRound(params.roundId)
  );
  const reserveInterview = useReserveInterview();

  const [selectedSlot, setSelectedSlot] = React.useState<
    (typeof slotsQuery.data)[number] | null
  >(null);
  // } | null>({
  //   start: slotsQuery.data[0].start_at,
  //   interviewer_email: slotsQuery.data[0].interviewer_email,
  // });
  const [isReserving, setIsReserving] = React.useState(false);

  // Filter available slots (not assigned to any interviewee)
  const availableSlots = slotsQuery.data;
  // const availableSlots = slotsQuery.data.filter(
  //   (slot) => !slot.interviewer.email
  // );

  const handleSelectSlot = (start: Date) => {
    console.log("handleSelectSlot called with:", start);
    console.log("Available slots:", availableSlots);
    console.log("Round data:", roundQuery.data);

    // Find the slot that matches the selected time
    const slot = availableSlots.find(
      (s) => s.start_at.getTime() === start.getTime()
    );

    console.log("Found slot:", slot);

    if (slot) {
      setSelectedSlot(slot);
    }
  };

  const handleReserveSlot = async () => {
    if (!selectedSlot || isReserving) return;
    console.log(selectedSlot);

    setIsReserving(true);
    try {
      await reserveInterview.mutateAsync({
        roundId: params.roundId,
        scheduled_time: selectedSlot.start_at.toISOString(),
        interviewer_email: selectedSlot.interviewer.email,
      });

      // Show success feedback
      toast.success("Interview slot reserved successfully!");
      setSelectedSlot(null);

      navigate({ to: "/app" });
    } catch (error) {
      console.error("Failed to reserve slot:", error);
      toast.error("Failed to reserve slot. Please try again.");
    } finally {
      setIsReserving(false);
    }
  };

  const handleCancelSelection = () => {
    setSelectedSlot(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Reserve Interview Slot</h2>

        {selectedSlot && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancelSelection}
              disabled={isReserving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReserveSlot}
              disabled={isReserving}
              className="min-w-[120px]"
            >
              {isReserving ? "Reserving..." : "Reserve Slot"}
            </Button>
          </div>
        )}
      </div>

      {selectedSlot && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <p className="text-sm text-blue-800">
            <strong>Selected slot:</strong>{" "}
            {selectedSlot.start_at.toLocaleString()}
            with {selectedSlot.interviewer.email}
          </p>
          <p className="text-sm text-blue-600 mt-1">
            Click "Reserve Slot" to confirm your interview appointment.
          </p>
        </div>
      )}

      {!selectedSlot && availableSlots.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
          <p className="text-sm text-gray-800">
            No available interview slots at the moment. Please check back later.
          </p>
        </div>
      )}

      {!selectedSlot && availableSlots.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <p className="text-sm text-green-800">
            Click on any available time slot below to select it for reservation.
          </p>
        </div>
      )}

      <Scheduler
        slots={availableSlots}
        onCreateSlot={handleSelectSlot}
        interviewRound={roundQuery.data}
        onSlotClick={(slotId: string) => {
          console.log("Slot clicked with ID:", slotId);

          // Find the slot by ID instead of by time
          const slot = availableSlots.find((s) => s.id === slotId);

          if (slot) {
            console.log("Found slot by ID:", slot);
            setSelectedSlot(slot);
          } else {
            console.error("No slot found with ID:", slotId);
            toast.error("Could not find the selected slot. Please try again.");
          }
        }}
      />
    </div>
  );
}
