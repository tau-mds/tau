import { useSuspenseQuery } from "@tanstack/react-query";
import { Command, Kbd } from "@tau/ui";
import { entries } from "@tau/utils";
import React from "react";

import { clientHintsQueries } from "~/lib/client-hint";
import { Cmdk } from "~/lib/cmdk/cmdk";
import { cmdk } from "~/lib/cmdk/store";
import { theme } from "~/lib/theme";

export function ChangeInterfaceTheme() {
  const id = React.useId();
  const toggle = theme.useToggle();
  const clientHintsQuery = useSuspenseQuery(clientHintsQueries.get());

  return (
    <Cmdk route="theme" placeholder="Change interface theme to...">
      {entries(itemsCopy).map(([data, label], idx) => (
        <Command.Item
          key={`${id}::${label}`}
          onSelect={() =>
            document.startViewTransition(() => {
              toggle.mutate({ data });
              cmdk.action.close();
            })
          }
          className="justify-between"
        >
          <div className="flex gap-2">
            <Kbd className="aspect-square text-xs">{idx + 1}</Kbd>
            {label}
          </div>

          <Kbd
            data-theme={theme.is(data, theme.system) ? clientHintsQuery.data.theme : data}
            className="gap-1 bg-background text-foreground border"
          >
            <div className="size-2 rounded-full bg-accent-10 content-['']" /> Aa
          </Kbd>
        </Command.Item>
      ))}
    </Cmdk>
  );
}

const itemsCopy = {
  [theme.light]: "Light",
  [theme.dark]: "Dark",
  [theme.system]: "System",
} satisfies Record<theme.type, string>;
