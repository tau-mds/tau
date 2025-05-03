import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "../separator";
import { Scroll } from "./index";

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

const meta = {
	title: "Components / Scrollarea",
	component: Scroll.Area,

	render: () => (
		<Scroll.Area className="h-72 w-48 rounded-md border">
			<div className="p-4">
				<h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
				{tags.map((tag) => (
					<>
						<div key={tag} className="text-sm">
							{tag}
						</div>
						<Separator className="my-2" />
					</>
				))}
			</div>
		</Scroll.Area>
	),
} satisfies Meta<typeof Scroll.Area>;
export default meta;

type Story = StoryObj<typeof Scroll.Area>;
export const Default = {} satisfies Story;
