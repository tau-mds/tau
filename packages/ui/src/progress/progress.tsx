import type React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";

import { cx } from "@tau/utils";

export namespace Progress {
  export type Props = React.ComponentProps<typeof ProgressPrimitive.Root>;
}
export function Progress({ className, value, ...props }: Progress.Props) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cx(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
