import { Command, Kbd } from "@tau/ui";

import { cmdk } from "~/lib/cmdk/store";
import { sidebar } from "~/lib/sidebar";
import { useIsMobile } from "~/lib/use-media-query";

export function ToggleSidebar() {
  const toggle = sidebar.useToggle_();

  const sidebarWidth = sidebar.useWidth();
  const open = sidebarWidth > 0;

  const isMobile = useIsMobile();
  if (isMobile) {
    return null;
  }

  return (
    <Command.Item
      onSelect={() => {
        toggle("sidebar");
        cmdk.action.close();
      }}
    >
      {open ? "Collapse" : "Expand"} navigation sidebar
      <Kbd className="ml-auto aspect-square">{sidebar.HOTKEY}</Kbd>
    </Command.Item>
  );
}
