import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./index";
// import { Icon } from "../../icon";

const meta = {
	title: "Components / Alert",
	component: Alert.Root,

	render: (args) => (
		<Alert.Root {...args}>
			{/* <Icon name="check" /> */}
			<Alert.Title>Heads up!</Alert.Title>
			<Alert.Description>
				You can add components to your app using the cli.
			</Alert.Description>
		</Alert.Root>
	),
} satisfies Meta<typeof Alert.Root>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const Destructive: Story = {
	render: (args) => (
		<Alert.Root variant="destructive" {...args}>
			{/* <Icon name="sun-light" /> */}
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>
				Your session has expired. Please log in again.
			</Alert.Description>
		</Alert.Root>
	),
};
