import type React from "react";
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

import { cx } from "@tau/utils";
import { buttonVariants } from "../button";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;

export namespace AlertDialogOverlay {
  export type Props = React.ComponentProps<typeof AlertDialogPrimitive.Overlay>;
}
export function AlertDialogOverlay({
  className,
  ...props
}: AlertDialogOverlay.Props) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cx(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

export namespace AlertDialogContent {
  export type Props = React.ComponentProps<typeof AlertDialogPrimitive.Content>;
}
export function AlertDialogContent({
  className,
  ...props
}: AlertDialogContent.Props) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cx(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

export namespace AlertDialogHeader {
  export type Props = React.ComponentProps<"div">;
}
export function AlertDialogHeader({
  className,
  ...props
}: AlertDialogHeader.Props) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cx("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

export namespace AlertDialogFooter {
  export type Props = React.ComponentProps<"div">;
}
export function AlertDialogFooter({
  className,
  ...props
}: AlertDialogFooter.Props) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cx(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

export namespace AlertDialogTitle {
  export type Props = React.ComponentProps<typeof AlertDialogPrimitive.Title>;
}
export function AlertDialogTitle({
  className,
  ...props
}: AlertDialogTitle.Props) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cx("text-lg font-semibold", className)}
      {...props}
    />
  );
}

export namespace AlertDialogDescription {
  export type Props = React.ComponentProps<
    typeof AlertDialogPrimitive.Description
  >;
}
export function AlertDialogDescription({
  className,
  ...props
}: AlertDialogDescription.Props) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cx("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export namespace AlertDialogAction {
  export type Props = React.ComponentProps<typeof AlertDialogPrimitive.Action>;
}
export function AlertDialogAction({
  className,
  ...props
}: AlertDialogAction.Props) {
  return (
    <AlertDialogPrimitive.Action
      className={cx(buttonVariants(), className)}
      {...props}
    />
  );
}

export namespace AlertDialogCancel {
  export type Props = React.ComponentProps<typeof AlertDialogPrimitive.Cancel>;
}
export function AlertDialogCancel({
  className,
  ...props
}: AlertDialogCancel.Props) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cx(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
}
