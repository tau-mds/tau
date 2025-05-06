import { Command as CommandPrimitive } from "cmdk";
import type React from "react";
import MagnifyingGlass from "~icons/radix-icons/magnifying-glass";

import { cx } from "@tau/utils";
import { Dialog } from "../dialog";

export namespace Command {
  export type Props = React.ComponentProps<typeof CommandPrimitive>;
}
export function Command({ className, ...props }: Command.Props) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cx(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className,
      )}
      {...props}
    />
  );
}

export namespace CommandDialog {
  export type Props = Dialog.Root.Props & {
    title?: string;
    description?: string;
  };
}
export function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  ...props
}: CommandDialog.Props) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Header className="sr-only">
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
      </Dialog.Header>
      <Dialog.Content className="overflow-hidden p-0 sm:max-w-2xl">
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export namespace CommandInput {
  export type Props = React.ComponentProps<typeof CommandPrimitive.Input>;
}
export function CommandInput({ className, ...props }: CommandInput.Props) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <MagnifyingGlass className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cx(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export namespace CommandList {
  export type Props = React.ComponentProps<typeof CommandPrimitive.List>;
}
export function CommandList({ className, ...props }: CommandList.Props) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cx(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className,
      )}
      {...props}
    />
  );
}

export namespace CommandEmpty {
  export type Props = React.ComponentProps<typeof CommandPrimitive.Empty>;
}
export function CommandEmpty({ className, ...props }: CommandEmpty.Props) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  );
}

export namespace CommandGroup {
  export type Props = React.ComponentProps<typeof CommandPrimitive.Group>;
}
export function CommandGroup({ className, ...props }: CommandGroup.Props) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cx(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className,
      )}
      {...props}
    />
  );
}

export namespace CommandSeparator {
  export type Props = React.ComponentProps<typeof CommandPrimitive.Separator>;
}
export function CommandSeparator({ className, ...props }: CommandSeparator.Props) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cx("bg-border -mx-1 h-px", className)}
      {...props}
    />
  );
}

export namespace CommandItem {
  export type Props = React.ComponentProps<typeof CommandPrimitive.Item>;
}
export function CommandItem({ className, ...props }: CommandItem.Props) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cx(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

export namespace CommandShortcut {
  export type Props = React.ComponentProps<"span">;
}
export function CommandShortcut({ className, ...props }: CommandShortcut.Props) {
  return (
    <span
      data-slot="command-shortcut"
      className={cx("text-muted-foreground ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  );
}
