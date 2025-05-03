import type { Meta, StoryObj } from "@storybook/react";
import { ContextMenu } from "./index";

const meta = {
	title: "Components / ContextMenu",
	parameters: {
		layout: "centered",
	},
	component: ContextMenu.Root,

	render: (args) => (
		<ContextMenu.Root {...args}>
			<ContextMenu.Trigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
				Right click here
			</ContextMenu.Trigger>

			<ContextMenu.Content className="w-64">
				<ContextMenu.Item inset>
					Back
					<ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item inset disabled>
					Forward
					<ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item inset>
					Reload
					<ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Sub>
					<ContextMenu.SubTrigger inset>More Tools</ContextMenu.SubTrigger>
					<ContextMenu.SubContent className="w-48">
						<ContextMenu.Item>
							Save Page As...
							<ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut>
						</ContextMenu.Item>
						<ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
						<ContextMenu.Item>Name Window...</ContextMenu.Item>
						<ContextMenu.Separator />
						<ContextMenu.Item>Developer Tools</ContextMenu.Item>
					</ContextMenu.SubContent>
				</ContextMenu.Sub>
				<ContextMenu.Separator />
				<ContextMenu.CheckboxItem checked>
					Show Bookmarks Bar
					<ContextMenu.Shortcut>⌘⇧B</ContextMenu.Shortcut>
				</ContextMenu.CheckboxItem>
				<ContextMenu.CheckboxItem>Show Full URLs</ContextMenu.CheckboxItem>
				<ContextMenu.Separator />
				<ContextMenu.RadioGroup value="pedro">
					<ContextMenu.Label inset>People</ContextMenu.Label>
					<ContextMenu.Separator />
					<ContextMenu.RadioItem value="pedro">Pedro Duarte</ContextMenu.RadioItem>
					<ContextMenu.RadioItem value="colm">Colm Tuite</ContextMenu.RadioItem>
				</ContextMenu.RadioGroup>
			</ContextMenu.Content>
		</ContextMenu.Root>
	),
} satisfies Meta<typeof ContextMenu.Root>;
export default meta;

type Story = StoryObj<typeof ContextMenu.Root>;
export const Default: Story = {};
