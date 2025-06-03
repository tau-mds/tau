import { useDraggable } from "@dnd-kit/react";
import type React from "react";
import type { interviewRound, slot } from "~/lib/core";
import { Interview } from "./interview";

export namespace InterviewSlot {
  export type Props = {
    slot: slot.positioned;
    interviewRound: interviewRound;
    onClick?: (e: React.MouseEvent) => void;
    "aria-hidden"?: boolean | "true" | "false";
  };
}

export function InterviewSlot({
  onClick,
  "aria-hidden": ariaHidden,
  slot,
  interviewRound,
}: InterviewSlot.Props) {
  const draggable = useDraggable({
    id: slot.id,
    data: { slot },
  });

  if (draggable.isDragging) {
    return (
      <div
        ref={draggable.ref}
        className="opacity-0"
        style={{ height: slot.position.height || "auto" }}
      />
    );
  }

  return (
    <div
      ref={draggable.ref}
      style={{
        height: slot.position.height || "auto",
      }}
      className="touch-none"
    >
      <Interview
        slot={slot}
        interviewRound={interviewRound}
        isDragging={draggable.isDragging}
        onClick={onClick}
        aria-hidden={ariaHidden}
      />
    </div>
  );
}
