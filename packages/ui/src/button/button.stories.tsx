import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

const meta = {
	title: "Components / Button",
	component: Button,
	args: { children: "Button" },
	parameters: { layout: "centered" },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: "default" } };
export const Destructive: Story = { args: { variant: "destructive" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Link: Story = { args: { variant: "link" } };
