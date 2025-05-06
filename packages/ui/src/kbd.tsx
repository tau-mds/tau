import { cx } from "@tau/utils";
import type React from "react";

export namespace Kbd {
  export type Props = React.ComponentProps<"kbd">;
}
export function Kbd({ className, ...props }: Kbd.Props) {
  return (
    <kbd
      className={cx(
        "inline-flex justify-center items-center font-mono text-xs size-5 w-fit px-1 rounded-sm border",
        className,
      )}
      {...props}
    />
  );
}
