import type React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import Circle from "~icons/radix-icons/radiobutton";

import { cx } from "@tau/utils";

export namespace RadioGroup {
  export type Props = React.ComponentProps<typeof RadioGroupPrimitive.Root>;
}
export function RadioGroup({ className, ...props }: RadioGroup.Props) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cx("grid gap-3", className)}
      {...props}
    />
  );
}

export namespace RadioGroupItem {
  export type Props = React.ComponentProps<typeof RadioGroupPrimitive.Item>;
}
export function RadioGroupItem({ className, ...props }: RadioGroupItem.Props) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cx(
        "border bg-accent data-[state='checked']:bg-primary text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/40 aria-invalid:border-destructive aspect-square size-4 shrink-0 rounded-full shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        {/* <Circle className="text-accent-contrast absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2" /> */}
        <Circle className="text-accent-contrast absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}
