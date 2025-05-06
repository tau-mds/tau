import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import React from "react";

import { cx } from "@tau/utils";
import { type Toggle, toggleVariants } from "../toggle";

const ToggleGroupContext = React.createContext<Toggle.Variant>({
  size: "default",
  variant: "default",
});

export namespace ToggleGroup {
  export type Variant = Toggle.Variant;
  export type Props = React.ComponentProps<typeof ToggleGroupPrimitive.Root> & Variant;
}
export function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: ToggleGroup.Props) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cx(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

export namespace ToggleGroupItem {
  export type Variant = Toggle.Variant;
  export type Props = React.ComponentProps<typeof ToggleGroupPrimitive.Item> & Variant;
}
export function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: ToggleGroupItem.Props) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cx(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}
