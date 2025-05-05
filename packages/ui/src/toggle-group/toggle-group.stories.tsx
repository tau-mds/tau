import type { Meta, StoryObj } from "@storybook/react";
import { ToggleGroup } from "./index";

import Bold from "~icons/radix-icons/font-bold";
import Italic from "~icons/radix-icons/font-italic";
import Underline from "~icons/radix-icons/underline";

const meta = {
	title: "Components / Toggle Group",
	component: ToggleGroup.Root,
} satisfies Meta<typeof ToggleGroup.Root>;
export default meta;

type Story = StoryObj<typeof ToggleGroup.Root>;

export const Default = {
	render: () => (
		<ToggleGroup.Root type="multiple">
			<ToggleGroup.Item value="bold" aria-label="Toggle bold">
				<Bold className="size-4" />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="italic" aria-label="Toggle italic">
				<Italic className="size-4" />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
				<Underline className="size-4" />
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	),
} satisfies Story;

export const Outline = {
	render: () => (
		<ToggleGroup.Root type="multiple" variant="outline">
			<ToggleGroup.Item value="bold" aria-label="Toggle bold">
				<Bold className="size-4" />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="italic" aria-label="Toggle italic">
				<Italic className="size-4" />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
				<Underline className="size-4" />
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	),
} satisfies Story;

export const Single = {
	render: () => (
		<ToggleGroup.Root type="single">
			<ToggleGroup.Item value="bold" aria-label="Toggle bold">
				<Bold className="size-4" />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="italic" aria-label="Toggle italic">
				<Italic className="size-4" />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
				<Underline className="size-4" />
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	),
} satisfies Story;

export const Small = {
	render: () => (
		<ToggleGroup.Root type="single" size="sm">
			<ToggleGroup.Item value="bold" aria-label="Toggle bold">
				<Bold className="size-4" />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="italic" aria-label="Toggle italic">
				<Italic className="size-4" />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
				<Underline className="size-4" />
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	),
} satisfies Story;

export const Large = {
	render: () => (
		<ToggleGroup.Root type="single" size="lg">
			<ToggleGroup.Item value="bold" aria-label="Toggle bold">
				<Bold className="size-4" />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="italic" aria-label="Toggle italic">
				<Italic className="size-4" />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
				<Underline className="size-4" />
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	),
} satisfies Story;

export const Disabled = {
	render: () => (
		<ToggleGroup.Root type="multiple" disabled>
			<ToggleGroup.Item value="bold" aria-label="Toggle bold">
				<Bold className="size-4" />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="italic" aria-label="Toggle italic">
				<Italic className="size-4" />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
				<Underline className="size-4" />
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	),
} satisfies Story;
