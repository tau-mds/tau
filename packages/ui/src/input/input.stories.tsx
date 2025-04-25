import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Label } from "../label";
import { Button } from "../button";

const meta = {
  title: "Components / Input",
  component: Input,
} satisfies Meta<typeof Input>;
export default meta;

type Story = StoryObj<typeof Input>;
export const Default: Story = {};

export const File: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => <Input disabled type="email" placeholder="Email" />,
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
  ),
};
