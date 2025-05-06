import { addons, types, useGlobals } from "@storybook/manager-api";
import React from "react";
import theme from "./theme";

addons.setConfig({ theme });

function Toolbar() {
  const [globals] = useGlobals();

  React.useEffect(() => {
    for (const elem of document.querySelectorAll(".docs-story")) {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      elem.classList.add(globals["theme"] as string);
    }
  }, [globals]);

  return null;
}

function registerAddons() {
  addons.register("docs-theme", () => {
    addons.add("docs-theme-addon", {
      title: "Change theme addon",
      type: types.TOOL,
      match: ({ viewMode }) => !!viewMode?.match(/^(?:story|docs)$/),
      render: Toolbar,
    });
  });
}

registerAddons();
