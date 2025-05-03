import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import { Tooltip } from "./index";

const meta = {
	title: "Components / Tooltip",
	component: Tooltip.Root,

	render: () => (
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<Button variant="outline">Hover</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Add to library</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	),
} satisfies Meta<typeof Tooltip.Root>;
export default meta;

type Story = StoryObj<typeof Tooltip.Root>;

export const Default = {} satisfies Story;
