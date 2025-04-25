import type React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";

import { cx } from "@tau/utils";

export namespace Avatar {
  export type Props = React.ComponentProps<typeof AvatarPrimitive.Root>;
}
export function Avatar({ className, ...props }: Avatar.Props) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cx(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export namespace AvatarImage {
  export type Props = React.ComponentProps<typeof AvatarPrimitive.Image>;
}
export function AvatarImage({ className, ...props }: AvatarImage.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cx("aspect-square size-full", className)}
      {...props}
    />
  );
}

export namespace AvatarFallback {
  export type Props = React.ComponentProps<typeof AvatarPrimitive.Fallback>;
}
export function AvatarFallback({ className, ...props }: AvatarFallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cx(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
}
