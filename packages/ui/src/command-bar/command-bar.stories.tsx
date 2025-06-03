import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "../button";
import { CommandBar } from "./index";

const meta = {
  title: "Components / CommandBar",
  component: CommandBar.Root,
  parameters: {
    layout: "fullscreen",
  },

  render: () => {
    const [active, setActive] = React.useState(false);

    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Button onClick={() => setActive(!active)}>{active ? "Hide" : "Show"}</Button>
        <CommandBar.Root open={active}>
          <CommandBar.Bar>
            <CommandBar.Value>1 selected</CommandBar.Value>
            <CommandBar.Separator />
            <CommandBar.Command
              label="Edit"
              action={() => {
                console.log("Edit");
              }}
              shortcut="e"
            />
            <CommandBar.Separator />
            <CommandBar.Command
              label="Delete"
              action={() => {
                console.log("Delete");
              }}
              shortcut="d"
            />
          </CommandBar.Bar>
        </CommandBar.Root>
      </div>
    );
  },
} satisfies Meta<typeof CommandBar.Root>;
export default meta;

type Story = StoryObj<typeof CommandBar.Root>;
export const Default = {} satisfies Story;
