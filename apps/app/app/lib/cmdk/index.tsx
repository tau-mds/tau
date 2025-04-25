import { Command } from "@tau/ui";

import { Miscellaneous } from "~/lib/cmdk/miscellaneous";
import { Settings } from "~/lib/cmdk/settings";
import { cmdk } from "~/lib/cmdk/store";
import { useShortcut } from "~/lib/use-shortcut";
import { Cmdk } from "./cmdk";

export function CommandPalette() {
  useShortcut(cmdk.SHORTCUT, cmdk.action.toggle, {
    allowInEditable: true,
  });

  return (
    <>
      <Cmdk route="root">
        <Settings.ItemsGroup />
        <Miscellaneous.ItemsGroup />

        <Command.Empty>No results found.</Command.Empty>
      </Cmdk>

      <Settings.Dialogs />
    </>
  );
}
