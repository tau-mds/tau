import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import type React from "react";

import Check from "~icons/radix-icons/check";
import ChevronRight from "~icons/radix-icons/chevron-right";
import Circle from "~icons/radix-icons/circle";

import { cx } from "@tau/utils";

export namespace DropdownMenu {
  export type Props = React.ComponentProps<typeof DropdownMenuPrimitive.Root>;
}
export function DropdownMenu(props: DropdownMenu.Props) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

export namespace DropdownMenuPortal {
  export type Props = React.ComponentProps<typeof DropdownMenuPrimitive.Portal>;
}
export function DropdownMenuPortal(props: DropdownMenuPortal.Props) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

export namespace DropdownMenuTrigger {
  export type Props = React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>;
}
export function DropdownMenuTrigger(props: DropdownMenuTrigger.Props) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

export namespace DropdownMenuContent {
  export type Props = React.ComponentProps<typeof DropdownMenuPrimitive.Content>;
}
export function DropdownMenuContent({ className, ...props }: DropdownMenuContent.Props) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        className={cx(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export namespace DropdownMenuGroup {
  export type Props = React.ComponentProps<typeof DropdownMenuPrimitive.Group>;
}
export function DropdownMenuGroup(props: DropdownMenuGroup.Props) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

export namespace DropdownMenuItem {
  export type Variant = {
    inset: boolean;
    variant: "default" | "destructive";
  };
  export type Props = React.ComponentProps<typeof DropdownMenuPrimitive.Item> &
    Partial<Variant>;
}
export function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: DropdownMenuItem.Props) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cx(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

export namespace DropdownMenuCheckboxItem {
  export type Props = React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>;
}
export function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: DropdownMenuCheckboxItem.Props) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cx(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export namespace DropdownMenuRadioGroup {
  export type Props = React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>;
}

export function DropdownMenuRadioGroup(props: DropdownMenuRadioGroup.Props) {
  return (
    <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
  );
}

export namespace DropdownMenuRadioItem {
  export type Props = React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>;
}

export function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: DropdownMenuRadioItem.Props) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cx(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

export namespace DropdownMenuLabel {
  export type Props = React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  };
}
export function DropdownMenuLabel({
  className,
  inset,
  ...props
}: DropdownMenuLabel.Props) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cx("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className)}
      {...props}
    />
  );
}

export namespace DropdownMenuSeparator {
  export type Props = React.ComponentProps<typeof DropdownMenuPrimitive.Separator>;
}
export function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparator.Props) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cx("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

export namespace DropdownMenuShortcut {
  export type Props = React.ComponentProps<"span">;
}
export function DropdownMenuShortcut({
  className,
  ...props
}: DropdownMenuShortcut.Props) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cx("text-muted-foreground ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  );
}

export namespace DropdownMenuSub {
  export type Props = React.ComponentProps<typeof DropdownMenuPrimitive.Sub>;
}
export function DropdownMenuSub(props: DropdownMenuSub.Props) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

export namespace DropdownMenuSubTrigger {
  export type Props = React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  };
}
export function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: DropdownMenuSubTrigger.Props) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cx(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

export namespace DropdownMenuSubContent {
  export type Props = React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>;
}
export function DropdownMenuSubContent({
  className,
  ...props
}: DropdownMenuSubContent.Props) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cx(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}
