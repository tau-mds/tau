import type React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cx } from "@tau/utils";

export namespace Drawer {
  export type Props = React.ComponentProps<typeof DrawerPrimitive.Root>;
}

export function Drawer(props: Drawer.Props) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

export namespace DrawerTrigger {
  export type Props = React.ComponentProps<typeof DrawerPrimitive.Trigger>;
}

export function DrawerTrigger(props: DrawerTrigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

export namespace DrawerPortal {
  export type Props = React.ComponentProps<typeof DrawerPrimitive.Portal>;
}

export function DrawerPortal(props: DrawerPortal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

export namespace DrawerClose {
  export type Props = React.ComponentProps<typeof DrawerPrimitive.Close>;
}

export function DrawerClose(props: DrawerClose.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

export namespace DrawerOverlay {
  export type Props = React.ComponentProps<typeof DrawerPrimitive.Overlay>;
}

export function DrawerOverlay({ className, ...props }: DrawerOverlay.Props) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cx(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

export namespace DrawerContent {
  export type Props = React.ComponentProps<typeof DrawerPrimitive.Content>;
}

export function DrawerContent({ className, children, ...props }: DrawerContent.Props) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cx(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className,
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

export namespace DrawerHeader {
  export type Props = React.ComponentProps<"div">;
}
export function DrawerHeader({ className, ...props }: DrawerHeader.Props) {
  return (
    <div
      data-slot="drawer-header"
      className={cx("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

export namespace DrawerFooter {
  export type Props = React.ComponentProps<"div">;
}
export function DrawerFooter({ className, ...props }: DrawerFooter.Props) {
  return (
    <div
      data-slot="drawer-footer"
      className={cx("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

export namespace DrawerTitle {
  export type Props = React.ComponentProps<typeof DrawerPrimitive.Title>;
}
export function DrawerTitle({ className, ...props }: DrawerTitle.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cx("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

export namespace DrawerDescription {
  export type Props = React.ComponentProps<typeof DrawerPrimitive.Description>;
}
export function DrawerDescription({ className, ...props }: DrawerDescription.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cx("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
