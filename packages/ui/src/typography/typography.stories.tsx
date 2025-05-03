import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./typography";

const meta = {
	title: "Components / Text",
	component: Text,
	parameters: {
		layout: "centered",
	},

	args: {
		children: "The quick brown fox jumps over the lazy dog",
	},
} satisfies Meta<typeof Text>;
export default meta;

type Story = StoryObj<typeof Text>;

export const Showcase = {
	render: () => (
		<div className="flex flex-col items-start gap-y-2">
			<Text size="base" weight="regular" family="sans">
				Base Size, Regular Weight, Sans-Serif
			</Text>
			<Text size="base" weight="plus" family="sans">
				Base Size, Plus Weight, Sans-Serif
			</Text>
			<Text size="large" weight="regular" family="sans">
				Large Size, Regular Weight, Sans-Serif
			</Text>
			<Text size="large" weight="plus" family="sans">
				Large Size, Plus Weight, Sans-Serif
			</Text>
			<Text size="xlarge" weight="regular" family="sans">
				XLarge Size, Regular Weight, Sans-Serif
			</Text>
			<Text size="xlarge" weight="plus" family="sans">
				XLarge Size, Plus Weight, Sans-Serif
			</Text>
			<Text size="base" weight="regular" family="mono">
				Base Size, Regular Weight, Mono
			</Text>
			<Text size="large" weight="regular" family="mono">
				Large Size, Regular Weight, Mono
			</Text>
			<Text size="large" weight="plus" family="mono">
				Large Size, Plus Weight, Mono
			</Text>
			<Text size="xlarge" weight="regular" family="mono">
				XLarge Size, Regular Weight, Mono
			</Text>
			<Text size="xlarge" weight="plus" family="mono">
				XLarge Size, Plus Weight, Mono
			</Text>
		</div>
	),
} satisfies Story;

export const BaseRegularSans: Story = {
	args: {
		size: "base",
		weight: "regular",
		family: "sans",
		children: "I am a paragraph",
	},
};

export const BasePlusSans: Story = {
	args: {
		size: "base",
		weight: "plus",
		family: "sans",
		children: "I am a paragraph",
	},
};

export const LargeRegularSans: Story = {
	args: {
		size: "large",
		weight: "regular",
		family: "sans",
		children: "I am a paragraph",
	},
};

export const LargePlusSans: Story = {
	args: {
		size: "large",
		weight: "plus",
		family: "sans",
		children: "I am a paragraph",
	},
};

export const XLargeRegularSans: Story = {
	args: {
		size: "xlarge",
		weight: "regular",
		family: "sans",
		children: "I am a paragraph",
	},
};

export const XLargePlusSans: Story = {
	args: {
		size: "xlarge",
		weight: "plus",
		family: "sans",

		children: "I am a paragraph",
	},
};

export const BaseRegularMono: Story = {
	args: {
		size: "base",
		weight: "regular",
		family: "mono",
		children: "I am a paragraph",
	},
};

export const BasePlusMono: Story = {
	args: {
		size: "base",
		weight: "plus",
		family: "mono",
		children: "I am a paragraph",
	},
};

export const LargeRegularMono: Story = {
	args: {
		size: "large",
		weight: "regular",
		family: "mono",
		children: "I am a paragraph",
	},
};

export const LargePlusMono: Story = {
	args: {
		size: "large",
		weight: "plus",
		family: "mono",
		children: "I am a paragraph",
	},
};

export const XLargeRegularMono: Story = {
	args: {
		size: "xlarge",
		weight: "regular",
		family: "mono",
		children: "I am a paragraph",
	},
};

export const XLargePlusMono: Story = {
	args: {
		size: "xlarge",
		weight: "plus",
		family: "mono",
		children: "I am a paragraph",
	},
};
