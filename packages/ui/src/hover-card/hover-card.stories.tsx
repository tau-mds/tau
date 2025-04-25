import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard } from "./index";
import { Button } from "../button";
import { Avatar } from "../avatar";

import Calendar from "~icons/radix-icons/calendar";

const meta = {
  title: "Components / Hover Card",
  component: HoverCard.Root,

  render: () => (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCard.Trigger>
      <HoverCard.Content className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar.Root>
            <Avatar.Image src="https://github.com/vercel.png" />
            <Avatar.Fallback>VC</Avatar.Fallback>
          </Avatar.Root>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <Calendar className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  ),
} satisfies Meta<typeof HoverCard.Root>;
export default meta;

export type Story = StoryObj<typeof meta>;
export const Default: Story = {};
