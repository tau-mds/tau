import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import { Toaster, toast } from "./index";

const meta = {
	title: "Components / Toast",
	component: Toaster,

	render: () => (
		<>
			<Button
				variant="outline"
				onClick={() =>
					toast("Event has been created", {
						description: "Sunday, December 03, 2023 at 9:00 AM",
						action: {
							label: "Undo",
							onClick: () => console.log("Undo"),
						},
						duration: Number.POSITIVE_INFINITY,
					})
				}
			>
				Show Toast
			</Button>

			<Toaster />
		</>
	),
} satisfies Meta<typeof Toaster>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default = {} satisfies Story;
