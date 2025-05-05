import { type VariantProps, cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import type React from "react";

import { cx } from "@tau/utils";

export const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default:
					"border bg-accent shadow-xs hover:bg-accent/80 hover:text-accent-foreground",
				destructive:
					"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/40",
				outline: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
				secondary:
					"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-accent-11 underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export namespace Button {
	export type Variant = VariantProps<typeof buttonVariants>;
	export type Props = React.ComponentProps<"button"> & Variant & { asChild?: boolean };
}
export function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: Button.Props) {
	const Comp = asChild ? Slot.Root : "button";

	return (
		<Comp
			data-slot="button"
			className={cx(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}
