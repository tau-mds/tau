import { cx } from "@tau/utils";
import { addMinutes, format, isPast } from "date-fns";
import React from "react";
import type { CalendarEvent } from "./types";
import { getEventColorClasses } from "./utils";

declare namespace EventWrapper {
  export type Props = {
    event: CalendarEvent;
    isDragging?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
    children: React.ReactNode;
    currentTime?: Date;
    onMouseDown?: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
  };
}

// Shared wrapper component for event styling
function EventWrapper({
  event,
  isDragging,
  onClick,
  className,
  children,
  currentTime,
  onMouseDown,
  onTouchStart,
}: EventWrapper.Props) {
  // Always use the currentTime (if provided) to determine if the event is in the past
  const displayEnd = addMinutes(currentTime ?? event.start, event.duration);

  const isEventInPast = isPast(displayEnd);

  return (
    <button
      className={cx(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex size-full rounded overflow-hidden px-1 text-left font-medium backdrop-blur-md transition outline-none select-none focus-visible:ring-[3px] data-dragging:cursor-grabbing data-dragging:shadow-lg data-past-event:line-through sm:px-2",
        getEventColorClasses(event.color),
        className,
      )}
      data-dragging={isDragging || undefined}
      data-past-event={isEventInPast || undefined}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      type="button"
    >
      {children}
    </button>
  );
}

export namespace EventItem {
  export type Props = {
    event: CalendarEvent;
    isDragging?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    currentTime?: Date; // For updating time during drag
    className?: string;
    onMouseDown?: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
  };
}

export function EventItem({
  event,
  isDragging,
  onClick,
  currentTime,
  className,
  onMouseDown,
  onTouchStart,
}: EventItem.Props) {
  // Use the provided currentTime (for dragging) or the event's actual time
  const displayStart = React.useMemo(() => {
    return currentTime || new Date(event.start);
  }, [currentTime, event.start]);

  const displayEnd = React.useMemo(
    () => addMinutes(currentTime ?? event.start, event.duration),
    [currentTime, event.start, event.duration],
  );

  return (
    <EventWrapper
      event={event}
      isDragging={isDragging}
      onClick={onClick}
      className={cx(
        "py-1",
        event.duration < 45 ? "items-center" : "flex-col",
        "text-[10px] sm:text-xs",
        className,
      )}
      currentTime={currentTime}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {event.duration < 45 ? (
        <div className="truncate">
          {event.title}{" "}
          <span className="opacity-70">{format(displayStart, "HH:mm")}</span>
        </div>
      ) : (
        <>
          <div className="truncate font-medium">{event.title}</div>
          <div className="truncate font-normal opacity-70 sm:text-[11px]">
            {event.duration < 45
              ? format(displayStart, "HH:mm")
              : `${format(displayStart, "HH:mm")} - ${format(displayEnd, "HH:mm")}`}
          </div>
        </>
      )}
    </EventWrapper>
  );
}
