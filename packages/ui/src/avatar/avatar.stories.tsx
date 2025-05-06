import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./index";

const meta = {
  title: "Components / Avatar",
  component: Avatar.Root,

  render: (args) => (
    <Avatar.Root {...args}>
      <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>
  ),
} satisfies Meta<typeof Avatar.Root>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};
