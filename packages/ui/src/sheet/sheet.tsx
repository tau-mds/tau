import type React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";

import Cross from "~icons/radix-icons/cross-2";

import { cx } from "@tau/utils";

export namespace Sheet {
  export type Props = React.ComponentProps<typeof SheetPrimitive.Root>;
}
export function Sheet(props: Sheet.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

export namespace SheetTrigger {
  export type Props = React.ComponentProps<typeof SheetPrimitive.Trigger>;
}
export function SheetTrigger(props: SheetTrigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

export namespace SheetClose {
  export type Props = React.ComponentProps<typeof SheetPrimitive.Close>;
}
export function SheetClose(props: SheetClose.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

export namespace SheetPortal {
  export type Props = React.ComponentProps<typeof SheetPrimitive.Portal>;
}
export function SheetPortal(props: SheetPortal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

export namespace SheetOverlay {
  export type Props = React.ComponentProps<typeof SheetPrimitive.Overlay>;
}
export function SheetOverlay({ className, ...props }: SheetOverlay.Props) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cx(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

export namespace SheetContent {
  export type Variant = {
    side: "top" | "right" | "bottom" | "left";
  };
  export type Props = React.ComponentProps<typeof SheetPrimitive.Content> &
    Partial<Variant>;
}
export function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: SheetContent.Props) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cx(
          "bg-popover data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <Cross className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

export namespace SheetHeader {
  export type Props = React.ComponentProps<"div">;
}
export function SheetHeader({ className, ...props }: SheetHeader.Props) {
  return (
    <div
      data-slot="sheet-header"
      className={cx("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

export namespace SheetFooter {
  export type Props = React.ComponentProps<"div">;
}
export function SheetFooter({ className, ...props }: SheetFooter.Props) {
  return (
    <div
      data-slot="sheet-footer"
      className={cx("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

export namespace SheetTitle {
  export type Props = React.ComponentProps<typeof SheetPrimitive.Title>;
}
export function SheetTitle({ className, ...props }: SheetTitle.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cx("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

export namespace SheetDescription {
  export type Props = React.ComponentProps<typeof SheetPrimitive.Description>;
}
export function SheetDescription({
  className,
  ...props
}: SheetDescription.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cx("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
