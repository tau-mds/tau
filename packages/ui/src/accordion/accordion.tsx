import { cx } from "@tau/utils";
import { Accordion as AccordionPrimitive } from "radix-ui";
import type React from "react";
import ChevronDown from "~icons/radix-icons/chevron-down";

export namespace Accordion {
  export type Props = React.ComponentProps<typeof AccordionPrimitive.Root>;
}
export function Accordion(props: Accordion.Props) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

export namespace AccordionItem {
  export type Props = React.ComponentProps<typeof AccordionPrimitive.Item>;
}
export function AccordionItem({ className, ...props }: AccordionItem.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cx("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

export namespace AccordionTrigger {
  export type Props = React.ComponentProps<typeof AccordionPrimitive.Trigger>;
}
export function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTrigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cx(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}

        <ChevronDown className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export namespace AccordionContent {
  export type Props = React.ComponentProps<typeof AccordionPrimitive.Content>;
}
export function AccordionContent({
  className,
  children,
  ...props
}: AccordionContent.Props) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cx("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
