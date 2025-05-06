import type React from "react";

import { cx } from "@tau/utils";

export namespace Table {
  export type Props = React.ComponentProps<"table">;
}
export function Table({ className, ...props }: Table.Props) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cx("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

export namespace TableHeader {
  export type Props = React.ComponentProps<"thead">;
}
export function TableHeader({ className, ...props }: TableHeader.Props) {
  return (
    <thead
      data-slot="table-header"
      className={cx("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

export namespace TableBody {
  export type Props = React.ComponentProps<"tbody">;
}
export function TableBody({ className, ...props }: TableBody.Props) {
  return (
    <tbody
      data-slot="table-body"
      className={cx("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

export namespace TableFooter {
  export type Props = React.ComponentProps<"tfoot">;
}
export function TableFooter({ className, ...props }: TableFooter.Props) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cx("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  );
}

export namespace TableRow {
  export type Props = React.ComponentProps<"tr">;
}
export function TableRow({ className, ...props }: TableRow.Props) {
  return (
    <tr
      data-slot="table-row"
      className={cx(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      {...props}
    />
  );
}

export namespace TableHead {
  export type Props = React.ComponentProps<"th">;
}
export function TableHead({ className, ...props }: TableHead.Props) {
  return (
    <th
      data-slot="table-head"
      className={cx(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

export namespace TableCell {
  export type Props = React.ComponentProps<"td">;
}
export function TableCell({ className, ...props }: TableCell.Props) {
  return (
    <td
      data-slot="table-cell"
      className={cx(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

export namespace TableCaption {
  export type Props = React.ComponentProps<"caption">;
}
export function TableCaption({ className, ...props }: TableCaption.Props) {
  return (
    <caption
      data-slot="table-caption"
      className={cx("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}
