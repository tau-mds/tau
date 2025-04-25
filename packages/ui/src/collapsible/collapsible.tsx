import { cx } from "@tau/utils";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import type React from "react";

export namespace Collapsible {
  export type Props = React.ComponentProps<typeof CollapsiblePrimitive.Root>;
}
export function Collapsible(props: Collapsible.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

export namespace CollapsibleTrigger {
  export type Props = React.ComponentProps<
    typeof CollapsiblePrimitive.CollapsibleTrigger
  >;
}
export function CollapsibleTrigger(props: CollapsibleTrigger.Props) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

export namespace CollapsibleContent {
  export type Props = React.ComponentProps<
    typeof CollapsiblePrimitive.CollapsibleContent
  >;
}
export function CollapsibleContent({
  className,
  ...props
}: CollapsibleContent.Props) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      className={cx(
        "overflow-hidden duration-200 transition-[max-height,opacity]",
        "data-[state]:will-change-[max-height,opacity] data-[state]:translate-z-0 data-[state]:backface-visible",
        "data-[state=open]:animate-smooth-down data-[state=closed]:animate-smooth-up",
        className,
      )}
      {...props}
    />
  );
}
