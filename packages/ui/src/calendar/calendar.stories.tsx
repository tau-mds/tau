import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./calendar";

const meta = {
  title: "Components / Calendar",
  component: Calendar,
} satisfies Meta<typeof Calendar>;
export default meta;

type Story = StoryObj<typeof Calendar>;
export const Default: Story = {
  render: () => <Calendar />,
};
