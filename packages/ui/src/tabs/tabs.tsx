import type React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";

import { cx } from "@tau/utils";

export namespace Tabs {
  export type Props = React.ComponentProps<typeof TabsPrimitive.Root>;
}
export function Tabs({ className, ...props }: Tabs.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cx("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

export namespace TabsList {
  export type Props = React.ComponentProps<typeof TabsPrimitive.List>;
}
export function TabsList({ className, ...props }: TabsList.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cx(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className,
      )}
      {...props}
    />
  );
}

export namespace TabsTrigger {
  export type Props = React.ComponentProps<typeof TabsPrimitive.Trigger>;
}
export function TabsTrigger({ className, ...props }: TabsTrigger.Props) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cx(
        "data-[state=active]:bg-card focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

export namespace TabsContent {
  export type Props = React.ComponentProps<typeof TabsPrimitive.Content>;
}
export function TabsContent({ className, ...props }: TabsContent.Props) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cx("flex-1 outline-none", className)}
      {...props}
    />
  );
}
