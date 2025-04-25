import type React from "react";

import ChevronLeft from "~icons/radix-icons/chevron-left";
import ChevronRight from "~icons/radix-icons/chevron-right";
import DotsHorizontal from "~icons/radix-icons/dots-horizontal";

import { cx } from "@tau/utils";
import { type Button, buttonVariants } from "../button";

export namespace Pagination {
  export type Props = React.ComponentProps<"nav">;
}
export function Pagination({ className, ...props }: Pagination.Props) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cx("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

export namespace PaginationContent {
  export type Props = React.ComponentProps<"ul">;
}
export function PaginationContent({
  className,
  ...props
}: PaginationContent.Props) {
  return (
    <ul
      data-slot="pagination-content"
      className={cx("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

export namespace PaginationItem {
  export type Props = React.ComponentProps<"li">;
}
export function PaginationItem(props: PaginationItem.Props) {
  return <li data-slot="pagination-item" {...props} />;
}

export namespace PaginationLink {
  export type Props = {
    isActive?: boolean;
  } & Pick<React.ComponentProps<typeof Button>, "size"> &
    React.ComponentProps<"a">;
}
export function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLink.Props) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cx(
        buttonVariants({
          variant: isActive ? "default" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

export namespace PaginationPrevious {
  export type Props = React.ComponentProps<typeof PaginationLink>;
}
export function PaginationPrevious({
  className,
  ...props
}: PaginationPrevious.Props) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cx("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeft />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

export namespace PaginationNext {
  export type Props = React.ComponentProps<typeof PaginationLink>;
}
export function PaginationNext({ className, ...props }: PaginationNext.Props) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cx("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRight />
    </PaginationLink>
  );
}

export namespace PaginationEllipsis {
  export type Props = React.ComponentProps<"span">;
}
export function PaginationEllipsis({
  className,
  ...props
}: PaginationEllipsis.Props) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cx("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <DotsHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
