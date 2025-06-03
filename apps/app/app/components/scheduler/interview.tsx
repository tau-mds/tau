import { cx } from "@tau/utils";
import { format } from "date-fns";
import type React from "react";
import { type interviewRound, slot as slots } from "~/lib/core";

export namespace Interview {
  export type Props = {
    slot: slots.positioned;
    isDragging?: boolean;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
    onMouseDown?: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    interviewRound: interviewRound;
  };
}

export function Interview({
  slot,
  isDragging,
  onClick,
  className,
  onMouseDown,
  onTouchStart,
  interviewRound,
}: Interview.Props) {
  return (
    <button
      className={cx(
        "py-1 text-[10px] sm:text-xs focus-visible:border-ring focus-visible:ring-ring/50 flex size-full rounded overflow-hidden px-1 text-left font-medium backdrop-blur-md transition outline-none select-none focus-visible:ring-[3px] data-dragging:cursor-grabbing data-dragging:shadow-lg data-past-event:line-through sm:px-2",
        "bg-sky-200/50 hover:bg-sky-200/40 text-sky-950/80 dark:bg-sky-400/25 dark:hover:bg-sky-400/20 dark:text-sky-200 shadow-sky-700/8",
        interviewRound.duration < 45 ? "items-center" : "flex-col",
        className,
      )}
      data-dragging={isDragging}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      type="button"
    >
      {interviewRound.duration < 45 ? (
        <div className="truncate">
          {slot.interviewer_email}{" "}
          <span className="opacity-70">{format(slot.start_at, "HH:mm")}</span>
        </div>
      ) : (
        <>
          <div className="truncate font-medium">{slot.interviewer_email}</div>
          <div className="truncate font-normal opacity-70 sm:text-[11px]">
            {interviewRound.duration < 45
              ? format(slot.start_at, "HH:mm")
              : `${format(slot.start_at, "HH:mm")} - ${format(slots.end(slot.start_at, interviewRound.duration), "HH:mm")}`}
          </div>
        </>
      )}
    </button>
  );
}
