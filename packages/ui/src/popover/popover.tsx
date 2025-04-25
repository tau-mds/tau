import type React from "react";
import { Popover as PopoverPrimitive } from "radix-ui";

import { cx } from "@tau/utils";

export namespace Popover {
  export type Props = React.ComponentProps<typeof PopoverPrimitive.Root>;
}

export function Popover(props: Popover.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

export namespace PopoverTrigger {
  export type Props = React.ComponentProps<typeof PopoverPrimitive.Trigger>;
}
export function PopoverTrigger(props: PopoverTrigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

export namespace PopoverContent {
  export type Props = React.ComponentProps<typeof PopoverPrimitive.Content>;
}
export function PopoverContent({
  align = "center",
  sideOffset = 4,
  className,
  ...props
}: PopoverContent.Props) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cx(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

export namespace PopoverAnchor {
  export type Props = React.ComponentProps<typeof PopoverPrimitive.Anchor>;
}
export function PopoverAnchor(props: PopoverAnchor.Props) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}
