import { HoverCard as HoverCardPrimitive } from "radix-ui";
import type React from "react";

import { cx } from "@tau/utils";

export namespace HoverCard {
  export type Props = React.ComponentProps<typeof HoverCardPrimitive.Root>;
}

export function HoverCard(props: HoverCard.Props) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

export namespace HoverCardTrigger {
  export type Props = React.ComponentProps<typeof HoverCardPrimitive.Trigger>;
}
export function HoverCardTrigger(props: HoverCardTrigger.Props) {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />;
}

export namespace HoverCardContent {
  export type Props = React.ComponentProps<typeof HoverCardPrimitive.Content>;
}
export function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: HoverCardContent.Props) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cx(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}
