import { Avatar, DropdownMenu } from "@tau/ui";
import { Sidebar } from "./index";
import { useIsMobile } from "~/lib/use-media-query";

import CaretSort from "~icons/radix-icons/caret-sort";
import { Link, type LinkProps } from "@tanstack/react-router";

import Person from "~icons/radix-icons/person";
import BarChart from "~icons/radix-icons/bar-chart";
import Exit from "~icons/radix-icons/exit";

const user = {
  name: "@rizesql_",
  email: "m@example.com",
  avatar: "https://avatars.githubusercontent.com/u/73390323?v=4",
};

const links = [
  {
    label: "Profile",
    href: "/settings/account/profile",
    icon: Person,
  },
  {
    label: "Billing",
    href: "/",
    icon: BarChart,
  },
] satisfies Array<{ label: string; href: LinkProps["to"]; icon: unknown }>;

export function SidebarUserMenu() {
  const isMobile = useIsMobile();

  return (
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Sidebar.MenuButton className="h-12 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar.Root className="size-8 rounded-full border">
                <Avatar.Image src={user.avatar} alt={user.name} />
                <Avatar.Fallback className="rounded-full">CN</Avatar.Fallback>
              </Avatar.Root>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>

              <CaretSort className="ml-auto size-4" />
            </Sidebar.MenuButton>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenu.Label className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar.Root className="size-8 border rounded-full">
                  <Avatar.Image src={user.avatar} alt={user.name} />
                  <Avatar.Fallback className="rounded-lg">CN</Avatar.Fallback>
                </Avatar.Root>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenu.Label>

            <DropdownMenu.Separator />
            {links.map((link) => (
              <DropdownMenu.Item key={link.label} asChild>
                <Link to={link.href}>
                  <link.icon />
                  {link.label}
                </Link>
              </DropdownMenu.Item>
            ))}

            <DropdownMenu.Separator />

            <DropdownMenu.Item variant="destructive">
              <Exit />
              Log out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  );
}
