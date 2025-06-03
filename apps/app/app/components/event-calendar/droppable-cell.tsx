import { useDroppable } from "@dnd-kit/react";
import { cx } from "@tau/utils";
import React from "react";

export namespace DroppableCell {
  export type Props = {
    id: string;
    date: Date;
    time?: number;
    className?: string;
    onClick?: () => void;
  };
}

export const DroppableCell = React.memo(
  ({ id: rawId, date, time, className, onClick }: DroppableCell.Props) => {
    const id = React.useMemo(() => rawId, [rawId]);
    const droppable = useDroppable({
      id,
      data: {
        date,
        time,
      },
      // collisionDetector: directionBiased,
    });

    return (
      <button
        type="button"
        ref={droppable.ref}
        onClick={onClick}
        className={cx(
          "not-data-dragging:hover:border-dashed not-data-dragging:hover:border data-dragging:bg-accent flex h-full flex-col overflow-hidden px-0.5 py-1 sm:px-1",
          className,
        )}
        data-dragging={droppable.isDropTarget ? true : undefined}
      />
    );
  },
);
