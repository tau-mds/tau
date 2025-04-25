import { Command } from "@tau/ui";
import { cmdk } from "./store";

export function Cmdk({
	children,
	placeholder,
	route,
	...props
}: Omit<Command.Dialog.Props, "open" | "onOpenChange"> & {
	route: string;
	placeholder?: string;
}) {
	const currentRoute = cmdk.useRoute();
	const search = cmdk.useSearch();

	return (
		<Command.Dialog
			open={route === currentRoute}
			onOpenChange={() => cmdk.action.close()}
			{...props}
		>
			<Command.Input
				value={search ?? ""}
				onValueChange={(value) => cmdk.action.search({ value })}
				placeholder={placeholder ?? "Type a command or search..."}
				onKeyDown={(evt) => {
					if (evt.key === "Escape" || (evt.key === "Backspace" && !search)) {
						evt.preventDefault();
						cmdk.action.return();
					}
				}}
			/>

			<Command.List>{children}</Command.List>
		</Command.Dialog>
	);
}
