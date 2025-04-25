import { ClientOnly } from "@tanstack/react-router";
import { Button, Kbd, Sheet, Splitter, Tooltip, Slot } from "@tau/ui";
import { cx, noop } from "@tau/utils";
import type React from "react";

import { MIN_WIDTH, sidebar } from "~/lib/sidebar";
import { useIsMobile, useMediaQuery } from "~/lib/use-media-query";
import { useShortcut } from "~/lib/use-shortcut";

import Dashboard from "~icons/radix-icons/dashboard";

export function Trigger() {
  const mobileSidebar = useMediaQuery(1024);
  const toggle = sidebar.useToggle_();
  useShortcut(sidebar.SHORTCUT, () =>
    mobileSidebar ? noop() : toggle("sidebar"),
  );

  if (mobileSidebar) {
    return (
      <Sheet.Trigger asChild>
        <Button type="button" size="icon">
          <Dashboard />
        </Button>
      </Sheet.Trigger>
    );
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button type="button" size="icon" onClick={() => toggle("sidebar")}>
          <Dashboard />
        </Button>
      </Tooltip.Trigger>

      <Tooltip.Content side="right">
        Expand navigation sidebar{" "}
        <Kbd className="ml-2 aspect-square font-mono">{sidebar.HOTKEY}</Kbd>
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Layout(props: { children: React.ReactNode }) {
  const sidebarWidth = sidebar.useWidth();
  const setWidth = sidebar.useSetWidth();

  return (
    <ClientOnly>
      <Sheet.Root>
        <Splitter.Root
          className="w-full lg:max-h-svh *:transition-[flex-grow] ease-linear duration-0"
          panels={[
            {
              id: "sidebar",
              minSize: sidebar.MIN_WIDTH,
              maxSize: sidebar.MAX_WIDTH,
              collapsible: true,
              collapsedSize: 0,
            },
            { id: "main" },
          ]}
          onExpand={() => setWidth.mutate({ data: MIN_WIDTH })}
          onCollapse={() => setWidth.mutate({ data: 0 })}
          defaultSize={[sidebarWidth, 100 - sidebarWidth]}
          onResizeEnd={(d) => setWidth.mutate({ data: d.size[0] })}
        >
          {props.children}
        </Splitter.Root>
      </Sheet.Root>
    </ClientOnly>
  );
}

export function Handle() {
  const mobileSidebar = useMediaQuery(1024);

  if (mobileSidebar) {
    return null;
  }

  return <Splitter.ResizeTrigger id="sidebar:main" />;
}

export function Root({ className, ...props }: React.ComponentProps<"aside">) {
  const mobileSidebar = useMediaQuery(1024);

  if (mobileSidebar) {
    return (
      <Sheet.Content side="left">
        <Sheet.Header className="sr-only">
          <Sheet.Title>Sidebar</Sheet.Title>
          <Sheet.Description>Displays the mobile sidebar.</Sheet.Description>
        </Sheet.Header>
        <aside
          className={cx(
            "bg-sidebar border-r border-border flex h-full w-full flex-col",
            className,
          )}
          {...props}
        />
      </Sheet.Content>
    );
  }

  return (
    <Splitter.Panel id="sidebar" data-slot="sidebar-root" asChild>
      <div className="group peer relative hidden text-sidebar-foreground md:block [view-transition-name:sidebar]">
        <div className="relative bg-transparent transition-[width] duration-200 ease-linear" />

        <div className="z-10 hidden fixe h-svh transition-[left,right,width] duration-200 ease-linear md:flex border-r">
          <aside
            data-sidebar="sidebar"
            className={cx("flex h-full w-full flex-col bg-sidebar", className)}
            {...props}
          />
        </div>
      </div>
    </Splitter.Panel>
  );
}

export function Header({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-sidebar="header"
      className={cx("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

export function Footer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-sidebar="footer"
      className={cx("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

export function Content({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-sidebar="content"
      className={cx(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto",
        className,
      )}
      {...props}
    />
  );
}

export function Main({ className, ...props }: React.ComponentProps<"main">) {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <main
        className={cx("px-4 py-2 bg-background w-full", className)}
        {...props}
      />
    );
  }

  return (
    <Splitter.Panel id="main" asChild>
      <main className={cx("px-4 py-2 !overflow-auto", className)} {...props} />
    </Splitter.Panel>
  );
}

export function Menu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-sidebar="menu"
      className={cx("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

export function MenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-sidebar="menu-item"
      className={cx("group/menu-item relative", className)}
      {...props}
    />
  );
}

export function MenuButton({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : Button;
  return (
    <Comp
      variant="ghost"
      data-sidebar="menu-button"
      className={cx(
        "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:hover:text-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-8",
        className,
      )}
      {...props}
    />
  );
}

export function MenuAction({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-sidebar="menu-action"
      className={cx(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        className,
      )}
      {...props}
    />
  );
}

export function MenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-sidebar="menu-sub"
      className={cx(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        className,
      )}
      {...props}
    />
  );
}

export function MenuSubItem(props: React.ComponentProps<"li">) {
  return <li {...props} />;
}

export function MenuSubButton({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-sidebar="menu-sub-button"
      className={cx(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-accent hover:text-sidebar-foreground focus-visible:ring-2 active:bg-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground text-sm",
        className,
      )}
      {...props}
    />
  );
}

export function Group({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-sidebar="group"
      className={cx("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
}

export function GroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-sidebar="group-label"
      className={cx(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

export function GroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-sidebar="group-content"
      className={cx("w-full text-sm", className)}
      {...props}
    />
  );
}
