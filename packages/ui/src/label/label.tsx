import { Label as LabelPrimitive } from "radix-ui";
import type React from "react";

import { cx } from "@tau/utils";

export namespace Label {
	export type Props = React.ComponentProps<typeof LabelPrimitive.Root>;
}
export function Label({ className, ...props }: Label.Props) {
	return (
		<LabelPrimitive.Root
			data-slot="label"
			className={cx(
				"flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}
