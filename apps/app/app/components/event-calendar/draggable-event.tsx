import { useDraggable } from "@dnd-kit/react";
import type React from "react";
import { EventItem } from "./event-item";
import type { CalendarEvent } from "./types";

export namespace DraggableEvent {
  export type Props = {
    event: CalendarEvent;
    onClick?: (e: React.MouseEvent) => void;
    height?: number;
    "aria-hidden"?: boolean | "true" | "false";
  };
}

export function DraggableEvent({
  event,
  onClick,
  height,
  "aria-hidden": ariaHidden,
}: DraggableEvent.Props) {
  const draggable = useDraggable({
    id: event.id,
    data: { event },
  });

  if (draggable.isDragging) {
    return (
      <div
        ref={draggable.ref}
        className="opacity-0"
        style={{ height: height || "auto" }}
      />
    );
  }

  return (
    <div
      ref={draggable.ref}
      style={{
        height: height || "auto",
      }}
      className="touch-none"
    >
      <EventItem
        event={event}
        isDragging={draggable.isDragging}
        onClick={onClick}
        aria-hidden={ariaHidden}
      />
    </div>
  );
}
