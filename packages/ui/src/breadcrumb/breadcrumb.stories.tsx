import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "../dropdown-menu";
import { Breadcrumb } from "./index";
// import { Dropdown } from "../dropdown";

const meta = {
	title: "Components / Breadcrumb",
	component: Breadcrumb.Root,
	parameters: { layout: "centered" },

	render: (args) => (
		<Breadcrumb.Root {...args}>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
				</Breadcrumb.Item>

				<Breadcrumb.Separator />

				<Breadcrumb.Item>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger className="size-5 grid place-content-center">
							<Breadcrumb.Ellipsis />
						</DropdownMenu.Trigger>

						<DropdownMenu.Content>
							<DropdownMenu.Item>Documentation</DropdownMenu.Item>
							<DropdownMenu.Item>Themes</DropdownMenu.Item>
							<DropdownMenu.Item>GitHub</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Breadcrumb.Item>

				<Breadcrumb.Separator />

				<Breadcrumb.Item>
					<Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
				</Breadcrumb.Item>

				<Breadcrumb.Separator />

				<Breadcrumb.Item>
					<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	),
} satisfies Meta<typeof Breadcrumb.Root>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
