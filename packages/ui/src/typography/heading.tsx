import { ark, type HTMLArkProps } from "@ark-ui/react";
import { cx } from "@tau/utils";
import React from "react";

export namespace Heading {
	export type Variants = {
		size: "xs" | "sm" | "md" | "lg" | "xl";
		weight: "normal" | "plus";
		font: "sans" | "mono";
		align: "left" | "right" | "center";
	};

	export type Level = `h${1 | 2 | 3 | 4 | 5}`;
	export type Props = HTMLArkProps<Level> & Partial<Variants>;
}

export const Heading = React.forwardRef<HTMLHeadingElement, Heading.Props>(
	({ size, weight, font, align, className, ...props }, ref) => {
		const Component = ark[sizes[size ?? "md"]];

		return (
			<Component
				ref={ref}
				{...props}
				data-size={size ?? "md"}
				data-weight={weight ?? "normal"}
				data-font={font ?? "sans"}
				data-align={align ?? "left"}
				className={cx("tau-heading", className)}
			/>
		);
	},
);

const sizes = {
	xs: "h5",
	sm: "h4",
	md: "h3",
	lg: "h2",
	xl: "h1",
} satisfies Record<Heading.Variants["size"], Heading.Level>;
