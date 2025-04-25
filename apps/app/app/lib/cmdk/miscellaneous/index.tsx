import { Command } from "@tau/ui";

import { ToggleSidebar } from "~/lib/cmdk/miscellaneous/sidebar";

export * as Miscellaneous from "./index";

export function ItemsGroup() {
	return (
		<Command.Group heading="Miscellaneous">
			<ToggleSidebar />
		</Command.Group>
	);
}
