import { useRouter } from "@tanstack/react-router";
import { Command } from "@tau/ui";

import { ChangeInterfaceTheme } from "~/lib/cmdk/settings/theme";
import { cmdk } from "~/lib/cmdk/store";

export * as Settings from "./index";

export function ItemsGroup() {
	const router = useRouter();

	return (
		<Command.Group heading="Settings">
			<Command.Item onSelect={() => cmdk.action.navigate({ to: "theme" })}>
				<span>Change interface theme...</span>
			</Command.Item>

			<Command.Item
				onSelect={() => {
					router.navigate({ to: "/app/settings/account/profile" });
					cmdk.action.close();
				}}
			>
				Go to settings
			</Command.Item>
		</Command.Group>
	);
}

export function Dialogs() {
	return (
		<>
			<ChangeInterfaceTheme />
		</>
	);
}
