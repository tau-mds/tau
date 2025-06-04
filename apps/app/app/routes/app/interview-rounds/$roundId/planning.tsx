import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Switch } from "@tau/ui";
import {
  addDays,
  addMinutes,
  isBefore,
  setHours,
  setMinutes,
  subDays,
} from "date-fns";
import React from "react";
import { EventCalendar } from "~/components/event-calendar";
import type { CalendarEvent } from "~/components/event-calendar";
import { api } from "~/lib/api";

export const Route = createFileRoute("/app/interview-rounds/$roundId/planning")(
  {
    component: Component,
    loader: async ({ params, context }) => {
      // Ensure the query client has the necessary data
      await context.queryClient.ensureQueryData(
        api.interviewSlots.queries.ofRound(params.roundId)
      );
    },
  }
);

function Component() {
  const slotsQuery = useSuspenseQuery(
    api.interviewSlots.queries.ofRound(Route.useParams().roundId)
  );
  const roundQuery = useSuspenseQuery(
    api.interviewRounds.queries.id(Route.useParams().roundId)
  );
  const slots = slotsQuery.data;
  const round = roundQuery.data;

  // Function to map slots to calendar events
  const mapSlotsToEvents = (slots: typeof slotsQuery.data): CalendarEvent[] => {
    return slots.map((slot) => ({
      id: slot.id,
      title: `Interview - ${slot.interviewer_email}`,
      description: slot.interviewee_email
        ? `with ${slot.interviewee_email}`
        : "Available slot",
      start: new Date(slot.start_at),
      duration: round.interview_duration ?? 0,
      color: slot.interviewer.color ?? "emerald",
      location: "Online", // or use slot.location if available
    }));
  };

  const [events, setEvents] = React.useState<CalendarEvent[]>(() =>
    mapSlotsToEvents(slotsQuery.data)
  );
  const [collsion, setCollision] = React.useState<boolean>(false);

  // // Update events when slots data changes
  // React.useEffect(() => {
  //   setEvents(mapSlotsToEvents(slots));
  // }, [slots]);

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    if (
      !collsion &&
      events.some((evt) => {
        if (evt.id === updatedEvent.id) {
          return false;
        }

        const startA = updatedEvent.start;
        const endA = addMinutes(updatedEvent.start, updatedEvent.duration);
        const startB = evt.start;
        const endB = addMinutes(evt.start, evt.duration);

        return isBefore(startA, endB) && isBefore(startB, endA);
      })
    ) {
      return;
    }

    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return (
    <>
      <Switch checked={collsion} onCheckedChange={setCollision} />
      <EventCalendar
        events={events}
        onEventUpdate={handleEventUpdate}
        onEventCreate={(start) => {
          console.log(start);
          setEvents((evt) => [
            ...evt,
            {
              id: "test",
              start: new Date(start),
              color: "rose",
              duration: 90,
              location: "test",
              title: "test",
              description: "test",
            },
          ]);
        }}
      />
    </>
  );
}

const now = new Date("2025-05-05T13:30");
console.debug({ now });
