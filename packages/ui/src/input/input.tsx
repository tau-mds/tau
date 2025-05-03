import type React from "react";

import { cx } from "@tau/utils";

export namespace Input {
	export type Props = React.ComponentProps<"input">;
}
export function Input({ className, ...props }: Input.Props) {
	return (
		<input
			data-slot="input"
			className={cx(
				"placeholder:text-muted-foreground flex h-9 w-full min-w-0 rounded-md border bg-accent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
				"file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
				"selection:bg-primary selection:text-primary-foreground",
				"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
				"aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
				"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}
