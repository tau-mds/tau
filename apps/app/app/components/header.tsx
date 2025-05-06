import { Button, Input } from "@tau/ui";
import { Breadcrumbs } from "./breadcrumbs";
import { Sidebar } from "./sidebar";

import Bell from "~icons/radix-icons/bell";
import MagnifyingGlass from "~icons/radix-icons/magnifying-glass";

import { cmdk } from "~/lib/cmdk/store";

export function Header() {
  return (
    <header className="pb-2">
      <div className="grid grid-cols-2 xl:grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex items-center gap-4">
          <Sidebar.Trigger />
          <div className="hidden md:block">
            <Breadcrumbs />
          </div>
        </div>

        <div className="hidden xl:block *:not-first:mt-2 flex-[0_0_auto]">
          <div className="relative">
            <Input
              onClick={() => cmdk.action.open()}
              placeholder="Search or press 'Ctrl + K' for commands"
              className="peer min-w-[40ch] ps-9"
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <MagnifyingGlass aria-hidden="true" />
            </div>
          </div>
        </div>

        <Button size="icon" className="justify-self-end">
          <Bell />
        </Button>
      </div>
    </header>
  );
}
