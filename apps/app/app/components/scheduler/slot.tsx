import { useDroppable } from "@dnd-kit/react";
import { cx } from "@tau/utils";
import { set } from "date-fns";

export namespace Slot {
  export type Props = {
    date: Date;
    hour: number;
    className?: string;
    onClick?: (startTime: Date) => void;
  };
}

export function Slot(props: Slot.Props) {
  const droppable = useDroppable({
    id: `timeline-slot-${props.date.toISOString()}-${props.hour}`,
    data: {
      date: props.date,
      time: props.hour,
    },
  });

  return (
    <button
      type="button"
      ref={droppable.ref}
      onClick={() =>
        props.onClick?.(
          set(props.date, {
            hours: Math.floor(props.hour),
            minutes: (props.hour % 1) * 60,
            seconds: 0,
            milliseconds: 0,
          }),
        )
      }
      className={cx(
        "not-data-dragging:hover:border-dashed not-data-dragging:hover:border data-dragging:bg-accent flex h-full flex-col overflow-hidden px-0.5 py-1 sm:px-1",
        "absolute h-[calc(var(--week-cells-height)/4)] w-full",
        props.className,
      )}
      data-dragging={droppable.isDropTarget ? true : undefined}
    />
  );
}
