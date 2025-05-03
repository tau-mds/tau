import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../checkbox";
import { Label } from "./index";

const meta = {
	title: "Components / Label",
	component: Label,

	render: () => (
		<div>
			<div className="flex items-center space-x-2">
				<Checkbox id="terms" />
				<Label htmlFor="terms">Accept terms and conditions</Label>
			</div>
		</div>
	),
} satisfies Meta<typeof Label>;
export default meta;

type Story = StoryObj<typeof Label>;

export const Default = {} satisfies Story;
