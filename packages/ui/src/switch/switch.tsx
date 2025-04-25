import type React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cx } from "@tau/utils";

export namespace Switch {
  export type Props = React.ComponentProps<typeof SwitchPrimitive.Root>;
}
export function Switch({ className, ...props }: Switch.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cx(
        "peer shadow-[0_0_0_1px_var(--border)] data-[state=checked]:bg-primary data-[state=unchecked]:bg-accent focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cx(
          "bg-surface-contrast dark:data-[state=unchecked]:bg-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
}
