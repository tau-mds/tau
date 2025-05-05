import { type VariantProps, cva } from "class-variance-authority";
import type React from "react";

import { cx } from "@tau/utils";

const alertVariants = cva(
	"relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
	{
		variants: {
			variant: {
				default: "bg-card text-card-foreground",
				destructive:
					"text-destructive-11 bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive-11/90",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export namespace Alert {
	export type Variant = VariantProps<typeof alertVariants>;
	export type Props = React.ComponentProps<"div"> & Variant;
}
export function Alert({ className, variant, ...props }: Alert.Props) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cx(alertVariants({ variant }), className)}
			{...props}
		/>
	);
}

export namespace AlertTitle {
	export type Props = React.ComponentProps<"div">;
}
export function AlertTitle({ className, ...props }: AlertTitle.Props) {
	return (
		<div
			data-slot="alert-title"
			className={cx(
				"col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

export namespace AlertDescription {
	export type Props = React.ComponentProps<"div">;
}
export function AlertDescription({ className, ...props }: AlertDescription.Props) {
	return (
		<div
			data-slot="alert-description"
			className={cx(
				"text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
				className,
			)}
			{...props}
		/>
	);
}
