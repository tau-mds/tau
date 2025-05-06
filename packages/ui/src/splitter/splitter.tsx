import { Splitter, useSplitterContext } from "@ark-ui/react";
import { cx } from "@tau/utils";

import GripVertical from "~icons/radix-icons/drag-handle-dots-2";

export const useSplitter = useSplitterContext;

export function SplitterResizeTrigger({
  className,
  ...props
}: Splitter.ResizeTriggerProps) {
  return (
    <Splitter.ResizeTrigger
      data-part="trigger"
      className={cx(
        "[---bg:transparent] [---opacity:0%] hover:[---bg:var(--accent-10)] hover:[---opacity:100%] outline-none relative flex-[0_0_auto] min-w-[2px] min-h-0 select-none cursor-col-resize transition-colors bg-(---bg)",
        className,
      )}
      {...props}
    >
      <span
        data-part="handle"
        className="grid place-content-center absolute left-[-7px] opacity-(---opacity) transition-opacity w-4 bg-(---bg) rounded-sm py-0.5 text-accent-contrast"
      >
        <GripVertical className="size-2.5" />
      </span>
    </Splitter.ResizeTrigger>
  );
}

export const SplitterRoot = Splitter.Root;
export const SplitterPanel = Splitter.Panel;
