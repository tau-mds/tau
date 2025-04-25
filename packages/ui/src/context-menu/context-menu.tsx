import type React from "react";
import { ContextMenu as ContextMenuPrimitive } from "radix-ui";

import Check from "~icons/radix-icons/check";
import ChevronRight from "~icons/radix-icons/chevron-right";
import Circle from "~icons/radix-icons/circle";

import { cx } from "@tau/utils";

export namespace ContextMenu {
  export type Props = React.ComponentProps<typeof ContextMenuPrimitive.Root>;
}
export function ContextMenu(props: ContextMenu.Props) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

export namespace ContextMenuTrigger {
  export type Props = React.ComponentProps<typeof ContextMenuPrimitive.Trigger>;
}
export function ContextMenuTrigger(props: ContextMenuTrigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  );
}

export namespace ContextMenuGroup {
  export type Props = React.ComponentProps<typeof ContextMenuPrimitive.Group>;
}
export function ContextMenuGroup(props: ContextMenuGroup.Props) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

export namespace ContextMenuPortal {
  export type Props = React.ComponentProps<typeof ContextMenuPrimitive.Portal>;
}
export function ContextMenuPortal(props: ContextMenuPortal.Props) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

export namespace ContextMenuSub {
  export type Props = React.ComponentProps<typeof ContextMenuPrimitive.Sub>;
}
export function ContextMenuSub(props: ContextMenuSub.Props) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

export namespace ContextMenuRadioGroup {
  export type Props = React.ComponentProps<
    typeof ContextMenuPrimitive.RadioGroup
  >;
}
export function ContextMenuRadioGroup(props: ContextMenuRadioGroup.Props) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

export namespace ContextMenuSubTrigger {
  export type Props = React.ComponentProps<
    typeof ContextMenuPrimitive.SubTrigger
  > & {
    inset?: boolean;
  };
}
export function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuSubTrigger.Props) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cx(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

export namespace ContextMenuSubContent {
  export type Props = React.ComponentProps<
    typeof ContextMenuPrimitive.SubContent
  >;
}
export function ContextMenuSubContent({
  className,
  ...props
}: ContextMenuSubContent.Props) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cx(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

export namespace ContextMenuContent {
  export type Props = React.ComponentProps<typeof ContextMenuPrimitive.Content>;
}
export function ContextMenuContent({
  className,
  ...props
}: ContextMenuContent.Props) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cx(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

export namespace ContextMenuItem {
  export type Props = React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
  };
}

export function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: ContextMenuItem.Props) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
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

export namespace ContextMenuCheckboxItem {
  export type Props = React.ComponentProps<
    typeof ContextMenuPrimitive.CheckboxItem
  >;
}
export function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: ContextMenuCheckboxItem.Props) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cx(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Check className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

export namespace CheckboxMenuRadioItem {
  export type Props = React.ComponentProps<
    typeof ContextMenuPrimitive.RadioItem
  >;
}
export function ContextMenuRadioItem({
  className,
  children,
  ...props
}: CheckboxMenuRadioItem.Props) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cx(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Circle className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

export namespace ContextMenuLabel {
  export type Props = React.ComponentProps<
    typeof ContextMenuPrimitive.Label
  > & {
    inset?: boolean;
  };
}
export function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuLabel.Props) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cx(
        "text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

export namespace ContextMenuSeparator {
  export type Props = React.ComponentProps<
    typeof ContextMenuPrimitive.Separator
  >;
}
export function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuSeparator.Props) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cx("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

export namespace ContextMenuShortcut {
  export type Props = React.ComponentProps<"span">;
}
export function ContextMenuShortcut({
  className,
  ...props
}: ContextMenuShortcut.Props) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cx(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}
