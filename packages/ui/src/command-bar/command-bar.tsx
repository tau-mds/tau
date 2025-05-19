import { cx } from "@tau/utils";
import { Popover, Portal } from "radix-ui";
import type React from "react";
import { Kbd } from "../kbd";

export namespace CommandBar {
  export type Props = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    disableAutoFocus?: boolean;
    children: React.ReactNode;
  };
}

export function CommandBar(props: CommandBar.Props) {
  return (
    <Popover.Root
      open={props.open}
      onOpenChange={props.onOpenChange}
      defaultOpen={props.defaultOpen}
    >
      <Portal.Root>
        <Popover.Anchor className="fixed bottom-8 left-1/2 h-px w-px -translate-x-1/2" />
      </Portal.Root>
      <Popover.Portal>
        <Popover.Content
          side="top"
          sideOffset={0}
          onOpenAutoFocus={(e) => {
            if (props.disableAutoFocus) {
              e.preventDefault();
            }
          }}
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          {props.children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export namespace CommandBarValue {
  export type Props = React.ComponentProps<"div">;
}

export function CommandBarValue({ className, ...props }: CommandBarValue.Props) {
  return (
    <div
      className={cx("txt-compact-small !font-medium px-3 py-2.5", className)}
      {...props}
    />
  );
}

export namespace CommandBarBar {
  export type Props = React.ComponentProps<"div">;
}

export function CommandBarBar({ className, ...props }: CommandBarBar.Props) {
  return (
    <div
      className={cx(
        "bg-popover text-muted-foreground border relative flex items-center overflow-hidden rounded-full px-1",
        "after:shadow-md after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:content-['']",
        className,
      )}
      {...props}
    />
  );
}

export namespace CommandBarSeparator {
  export type Props = React.ComponentProps<"div">;
}

export function CommandBarSeparator({ className, ...props }: CommandBarSeparator.Props) {
  return <div className={cx("bg-border h-10 w-px", className)} {...props} />;
}

export namespace CommandBarCommand {
  export type Props = Omit<React.ComponentProps<"button">, "children" | "onClick"> & {
    action: () => void | Promise<void>;
    label: string;
    shortcut: string;
  };
}

export function CommandBarCommand({
  className,
  action,
  label,
  shortcut,
  type = "button",
  ...props
}: CommandBarCommand.Props) {
  return (
    <button
      className={cx(
        "txt-compact-small !font-medium transition-color flex items-center gap-x-2 px-3 py-2.5 outline-none",
        "last-of-type:-mr-1 last-of-type:pr-4",
        "focus:bg-accent focus:text-accent-foreground",
        className,
      )}
      type={type}
      onClick={action}
      {...props}
    >
      <span>{label}</span>
      <Kbd>{shortcut.toUpperCase()}</Kbd>
    </button>
  );
}
