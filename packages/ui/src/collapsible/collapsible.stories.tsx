import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible } from "./index";
import { Button } from "../button";

import CaretSort from "~icons/radix-icons/caret-sort";

const meta = {
  title: "Components / Collapsible",
  component: Collapsible.Root,
} satisfies Meta<typeof Collapsible.Root>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Collapsible.Root className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            @peduarte starred 3 repositories
          </h4>
          <Collapsible.Trigger>
            <Button variant="ghost" size="sm">
              <CaretSort className="size-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </Collapsible.Trigger>
        </div>

        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/primitives
        </div>

        <Collapsible.Content className="space-y-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            @stitches/react
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    );
  },
};
