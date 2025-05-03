import type React from "react";

import { cx } from "@tau/utils";

export namespace Textarea {
	export type Props = React.ComponentProps<"textarea">;
}
export function Textarea({ className, ...props }: Textarea.Props) {
	return (
		<textarea
			data-slot="textarea"
			className={cx(
				"placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border bg-accent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				className,
			)}
			{...props}
		/>
	);
}
