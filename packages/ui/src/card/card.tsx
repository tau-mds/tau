import { cx } from "@tau/utils";
import type React from "react";

export namespace Card {
  export type Props = React.ComponentProps<"div">;
}
export function Card({ className, ...props }: Card.Props) {
  return (
    <div
      data-slot="card"
      className={cx(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export namespace CardHeader {
  export type Props = React.ComponentProps<"div">;
}
export function CardHeader({ className, ...props }: CardHeader.Props) {
  return (
    <div
      data-slot="card-header"
      className={cx(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

export namespace CardTitle {
  export type Props = React.ComponentProps<"div">;
}
export function CardTitle({ className, ...props }: CardTitle.Props) {
  return (
    <div
      data-slot="card-title"
      className={cx("leading-none font-semibold", className)}
      {...props}
    />
  );
}

export namespace CardDescription {
  export type Props = React.ComponentProps<"div">;
}
export function CardDescription({ className, ...props }: CardDescription.Props) {
  return (
    <div
      data-slot="card-description"
      className={cx("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export namespace CardAction {
  export type Props = React.ComponentProps<"div">;
}
export function CardAction({ className, ...props }: CardAction.Props) {
  return (
    <div
      data-slot="card-action"
      className={cx(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

export namespace CardContent {
  export type Props = React.ComponentProps<"div">;
}
export function CardContent({ className, ...props }: CardContent.Props) {
  return <div data-slot="card-content" className={cx("px-6", className)} {...props} />;
}

export namespace CardFooter {
  export type Props = React.ComponentProps<"div">;
}
export function CardFooter({ className, ...props }: CardFooter.Props) {
  return (
    <div
      data-slot="card-footer"
      className={cx("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}
