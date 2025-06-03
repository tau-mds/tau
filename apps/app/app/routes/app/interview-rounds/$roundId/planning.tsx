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

export const Route = createFileRoute("/app/interview-rounds/$roundId/planning")(
  {
    component: Component,
  }
);

function Component() {
  const [events, setEvents] = React.useState<CalendarEvent[]>(sampleEvents);
  const [collsion, setCollision] = React.useState<boolean>(false);

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
        onEventCreate={(start) =>
          setEvents((evt) => [
            ...evt,
            {
              id: "test",
              start,
              color: "rose",
              duration: 90,
              location: "test",
              title: "test",
              description: "test",
            },
          ])
        }
      />
    </>
  );
}

const now = new Date("2025-05-05T13:30");
console.debug({ now });

// Sample events data with hardcoded times
const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Annual Planning",
    description: "Strategic planning for next year",
    start: subDays(now, 24), // 24 days before today
    duration: 90,
    color: "sky",
    location: "Main Conference Hall",
  },
  {
    id: "2",
    title: "Project Deadline",
    description: "Submit final deliverables",
    start: setMinutes(setHours(subDays(now, 9), 13), 0), // 1:00 PM, 9 days before
    duration: 90,
    color: "amber",
    location: "Office",
  },
  {
    id: "3",
    title: "Quarterly Budget Review",
    description: "Strategic planning for next year",
    start: subDays(now, 13), // 13 days before today
    duration: 90,
    color: "orange",
    location: "Main Conference Hall",
  },
  {
    id: "4",
    title: "Team Meeting",
    description: "Weekly team sync",
    start: new Date("2025-05-05T12:00:00"), // 10:00 AM today
    duration: 90,
    color: "sky",
    location: "Conference Room A",
  },
  {
    id: "5",
    title: "Lunch with Client",
    description: "Discuss new project requirements",
    start: setMinutes(setHours(now, 10), 0), // 12:00 PM, 1 day from now
    duration: 90,
    color: "emerald",
    location: "Downtown Cafe",
  },
  {
    id: "7",
    title: "Sales Conference",
    description: "Discuss about new clients",
    start: setMinutes(setHours(addDays(now, 4), 14), 30), // 2:30 PM, 4 days from now
    duration: 90,
    color: "rose",
    location: "Downtown Cafe",
  },
  {
    id: "8",
    title: "Team Meeting",
    description: "Weekly team sync",
    start: setMinutes(setHours(addDays(now, 5), 9), 0), // 9:00 AM, 5 days from now
    duration: 90,
    color: "orange",
    location: "Conference Room A",
  },
  {
    id: "9",
    title: "Review contracts",
    description: "Weekly team sync",
    start: setMinutes(setHours(addDays(now, 5), 14), 0), // 2:00 PM, 5 days from now
    duration: 90,
    color: "sky",
    location: "Conference Room A",
  },
  {
    id: "10",
    title: "Team Meeting",
    description: "Weekly team sync",
    start: setMinutes(setHours(addDays(now, 5), 9), 45), // 9:45 AM, 5 days from now
    duration: 90,
    color: "amber",
    location: "Conference Room A",
  },
  {
    id: "11",
    title: "Marketing Strategy Session",
    description: "Quarterly marketing planning",
    start: setMinutes(setHours(addDays(now, 9), 10), 0), // 10:00 AM, 9 days from now
    duration: 90,
    color: "emerald",
    location: "Marketing Department",
  },
  {
    id: "12",
    title: "Annual Shareholders Meeting",
    description: "Presentation of yearly results",
    start: addDays(now, 17), // 17 days from now
    duration: 90,
    color: "sky",
    location: "Grand Conference Center",
  },
  {
    id: "13",
    title: "Product Development Workshop",
    description: "Brainstorming for new features",
    start: setMinutes(setHours(addDays(now, 26), 9), 0), // 9:00 AM, 26 days from now
    duration: 90,
    color: "rose",
    location: "Innovation Lab",
  },
];
