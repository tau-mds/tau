import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./index";

const meta = {
	title: "Components / Badge",
	component: Badge,
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<Badge variant="default" {...args}>
			Default
		</Badge>
	),
};

export const Secondary: Story = {
	render: (args) => (
		<Badge variant="secondary" {...args}>
			Secondary
		</Badge>
	),
};

export const Destructive: Story = {
	render: (args) => (
		<Badge variant="destructive" {...args}>
			Destructive
		</Badge>
	),
};

export const Outline: Story = {
	render: (args) => (
		<Badge variant="outline" {...args}>
			Outline
		</Badge>
	),
};
