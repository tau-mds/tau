import { Accessibility, Feedback } from "@dnd-kit/dom";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import React from "react";

import type { schema } from "@tau/db";

import { COLUMNS, ColumnsPicker } from "./columns-picker";
import { Interview } from "./interview";
import { Timeline } from "./timeline";

import type { interviewRound } from "~/lib/core/interview-round";

export namespace Scheduler {
  export type Props = {
    slots: ReadonlyArray<schema.interview_slot>;
    interviewRound: Readonly<interviewRound>;
    onCreateSlot: (start: Date) => void;
  };
}

export function Scheduler(props: Scheduler.Props) {
  const [cols, setCols] = React.useState<number>(Number(COLUMNS.at(-1)));

  return (
    <DragDropProvider plugins={[Accessibility, Feedback]}>
      <div
        className="flex flex-col rounded-lg border has-data-[slot=timeline]:flex-1"
        style={
          {
            "--slot-height": "24px",
            "--slot-gap": "4px",
            "--week-cells-height": "64px",
          } as React.CSSProperties
        }
      >
        <ColumnsPicker onValueChange={setCols} />
        <div className="flex flex-1 flex-col">
          <Timeline
            interviewRound={props.interviewRound}
            cols={cols}
            slots={props.slots}
            onSlotCreate={props.onCreateSlot}
          />
        </div>
      </div>

      <DragOverlay>
        {(src) => (
          <Interview
            slot={src.data.slot}
            interviewRound={props.interviewRound}
            isDragging
          />
        )}
      </DragOverlay>
    </DragDropProvider>
  );
}
