import type React from "react";

import { DragDropProvider, DragOverlay } from "@dnd-kit/react";

import { Accessibility, Feedback } from "@dnd-kit/dom";
import { isEqual, set, startOfMinute } from "date-fns";
import { type CalendarEvent, EventItem } from "~/components/event-calendar";

export namespace CalendarDndProvider {
  export type Props = {
    children: React.ReactNode;
    onEventUpdate: (event: CalendarEvent) => void;
  };
}

export function CalendarDndProvider({
  children,
  onEventUpdate,
}: CalendarDndProvider.Props) {
  // const restrictRef = React.useRef<HTMLDivElement>(null);

  return (
    <DragDropProvider
      plugins={[Accessibility, Feedback]}
      onDragEnd={(evt) => {
        if (!evt.operation.target) {
          return;
        }

        if (!evt.operation.source?.data || !evt.operation.target.data) {
          throw new Error("Missing data in drag event");
        }

        const source = evt.operation.source.data.event;
        const target = evt.operation.target.data;

        let start = new Date(target.date);
        if (target.time) {
          start = set(start, {
            hours: Math.floor(target.time),
            minutes: (Math.round(((target.time % 1) * 60) / 15) * 15) % 60,
            seconds: 0,
            milliseconds: 0,
          });
        }

        if (isEqual(startOfMinute(source.start), startOfMinute(start))) {
          return;
        }

        onEventUpdate({ ...source, start });
      }}
    >
      {children}

      <DragOverlay>
        {(src) => <EventItem event={src.data.event} isDragging />}
      </DragOverlay>
    </DragDropProvider>
  );
}
