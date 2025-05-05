import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import type React from "react";

import { cx } from "@tau/utils";

export namespace ScrollArea {
	export type Props = React.ComponentProps<typeof ScrollAreaPrimitive.Root>;
}
export function ScrollArea({ className, children, ...props }: ScrollArea.Props) {
	return (
		<ScrollAreaPrimitive.Root
			data-slot="scroll-area"
			className={cx("relative", className)}
			{...props}
		>
			<ScrollAreaPrimitive.Viewport
				data-slot="scroll-area-viewport"
				className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
			>
				{children}
			</ScrollAreaPrimitive.Viewport>
			<ScrollBar />
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	);
}

export namespace ScrollBar {
	export type Props = React.ComponentProps<
		typeof ScrollAreaPrimitive.ScrollAreaScrollbar
	>;
}
export function ScrollBar({
	className,
	orientation = "vertical",
	...props
}: ScrollBar.Props) {
	return (
		<ScrollAreaPrimitive.ScrollAreaScrollbar
			data-slot="scroll-area-scrollbar"
			orientation={orientation}
			className={cx(
				"flex touch-none p-px transition-colors select-none",
				orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
				orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
				className,
			)}
			{...props}
		>
			<ScrollAreaPrimitive.ScrollAreaThumb
				data-slot="scroll-area-thumb"
				className="bg-border relative flex-1 rounded-full"
			/>
		</ScrollAreaPrimitive.ScrollAreaScrollbar>
	);
}
