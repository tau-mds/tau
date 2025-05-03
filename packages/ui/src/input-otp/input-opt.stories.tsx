import type { Meta, StoryObj } from "@storybook/react";
import { InputOTP } from "./index";

const meta = {
	title: "Components / InputOTP",
	component: InputOTP.Root,

	render: () => (
		<InputOTP.Root maxLength={6}>
			<InputOTP.Group>
				<InputOTP.Slot index={0} />
				<InputOTP.Slot index={1} />
				<InputOTP.Slot index={2} />
			</InputOTP.Group>
			<InputOTP.Separator />
			<InputOTP.Group>
				<InputOTP.Slot index={3} />
				<InputOTP.Slot index={4} />
				<InputOTP.Slot index={5} />
			</InputOTP.Group>
		</InputOTP.Root>
	),
} satisfies Meta<typeof InputOTP.Root>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};
