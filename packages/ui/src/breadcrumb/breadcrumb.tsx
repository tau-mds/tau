import { Slot } from "radix-ui";
import type React from "react";

import ChevronRight from "~icons/radix-icons/chevron-right";
import DotsHorizontal from "~icons/radix-icons/dots-horizontal";

import { cx } from "@tau/utils";

export namespace Breadcrumb {
  export type Props = React.ComponentProps<"nav">;
}
export function Breadcrumb(props: Breadcrumb.Props) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

export namespace BreadcrumbList {
  export type Props = React.ComponentProps<"ol">;
}
export function BreadcrumbList({ className, ...props }: BreadcrumbList.Props) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cx(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className,
      )}
      {...props}
    />
  );
}

export namespace BreadcrumbItem {
  export type Props = React.ComponentProps<"li">;
}
export function BreadcrumbItem({ className, ...props }: BreadcrumbItem.Props) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cx("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

export namespace BreadcrumbLink {
  export type Props = React.ComponentProps<"a"> & {
    asChild?: boolean;
  };
}
export function BreadcrumbLink({ asChild, className, ...props }: BreadcrumbLink.Props) {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cx("hover:text-foreground transition-colors", className)}
      {...props}
    />
  );
}

export namespace BreadcrumbPage {
  export type Props = React.ComponentProps<"span">;
}
export function BreadcrumbPage({ className, ...props }: BreadcrumbPage.Props) {
  return (
    // biome-ignore lint/a11y/useFocusableInteractive:
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cx("text-foreground font-normal", className)}
      {...props}
    />
  );
}

export namespace BreadcrumbSeparator {
  export type Props = React.ComponentProps<"li">;
}
export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: BreadcrumbSeparator.Props) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cx("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

export namespace BreadcrumbEllipsis {
  export type Props = React.ComponentProps<"span">;
}
export function BreadcrumbEllipsis({ className, ...props }: BreadcrumbEllipsis.Props) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cx("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <DotsHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}
