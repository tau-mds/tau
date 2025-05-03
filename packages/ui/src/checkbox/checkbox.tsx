import { Checkbox as CheckboxPrimitive } from "radix-ui";
import type React from "react";
import Check from "~icons/radix-icons/check";

import { cx } from "@tau/utils";

export namespace Checkbox {
	export type Props = React.ComponentProps<typeof CheckboxPrimitive.Root>;
}

export function Checkbox({ className, ...props }: Checkbox.Props) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cx(
				"peer data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground bg-accent focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="flex items-center justify-center text-current transition-none"
			>
				<Check className="size-3.5" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}
