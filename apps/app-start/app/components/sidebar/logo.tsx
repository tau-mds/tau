import { Link } from "@tanstack/react-router";
import { Sidebar } from "./index";
import Target from "~icons/radix-icons/target";

export function SidebarLogo() {
  return (
    <Sidebar.Header>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton asChild>
            <Link to="/" className="h-12">
              <div className="grid aspect-square border shadow-sm size-8 place-content-center rounded-lg bg-gradient-to-t from-accent-8 to-accent-11">
                <Target className="text-accent-contrast size-5" />
              </div>

              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Tau</span>
                <span className="">v1.0.0</span>
              </div>
            </Link>
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Header>
  );
}
