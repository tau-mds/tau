import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Command } from "./index";

import Button from "~icons/radix-icons/button";
import Calendar from "~icons/radix-icons/calendar";
import Face from "~icons/radix-icons/face";
import Gear from "~icons/radix-icons/gear";
import Input from "~icons/radix-icons/input";
import Person from "~icons/radix-icons/person";

const meta = {
	title: "Components / Command",
	component: Command.Root,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Command.Root>;
export default meta;

type Story = StoryObj<typeof Command.Root>;
export const Dialog: Story = {
	render: () => {
		const [open, setOpen] = React.useState(false);

		React.useEffect(() => {
			const down = (e: KeyboardEvent) => {
				if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
					e.preventDefault();
					setOpen((open) => !open);
				}
			};

			document.addEventListener("keydown", down);
			return () => document.removeEventListener("keydown", down);
		}, []);

		return (
			<>
				<p className="text-sm text-muted-foreground">
					Press{" "}
					<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
						<span className="text-xs">⌘</span>J
					</kbd>
				</p>
				<Command.Dialog open={open} onOpenChange={setOpen}>
					<Command.Input placeholder="Type a command or search..." />
					<Command.List>
						<Command.Empty>No results found.</Command.Empty>
						<Command.Group heading="Suggestions">
							<Command.Item>
								<Calendar />
								<span>Calendar</span>
							</Command.Item>
							<Command.Item>
								<Face />
								<span>Search Emoji</span>
							</Command.Item>
							<Command.Item>
								<Input />
								<span>Calculator</span>
							</Command.Item>
						</Command.Group>
						<Command.Separator />
						<Command.Group heading="Settings">
							<Command.Item>
								<Person />
								<span>Profile</span>
								<Command.Shortcut>⌘P</Command.Shortcut>
							</Command.Item>
							<Command.Item>
								<Button />
								<span>Billing</span>
								<Command.Shortcut>⌘B</Command.Shortcut>
							</Command.Item>
							<Command.Item>
								<Gear />
								<span>Settings</span>
								<Command.Shortcut>⌘S</Command.Shortcut>
							</Command.Item>
						</Command.Group>
					</Command.List>
				</Command.Dialog>
			</>
		);
	},
};
