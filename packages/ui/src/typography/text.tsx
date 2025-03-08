import { type HTMLArkProps, ark } from "@ark-ui/react";
import { cx } from "@tau/utils";
import React from "react";

import { dataAttr } from "../utils";

export namespace Text {
	export type Variants = {
		/**
		 * The `size` property defines the dimension of the Text component
		 * @default "md"
		 */
		size: "xs" | "sm" | "md" | "lg" | "xl";
		weight: "normal" | "plus";
		font: "sans" | "mono";
		leading: "normal" | "compact";
		align: "left" | "right" | "center";
		balance: boolean;
		color: "contrast" | "muted";
	};

	export type Props = HTMLArkProps<"p" | "span" | "div"> & Partial<Variants>;
}

export const Text = React.forwardRef<HTMLParagraphElement, Text.Props>(
	({ size, weight, font, leading, align, balance, color, className, ...props }, ref) => {
		return (
			<ark.p
				ref={ref}
				{...props}
				data-size={size ?? "md"}
				data-weight={weight ?? "normal"}
				data-font={font ?? "sans"}
				data-leading={leading ?? "normal"}
				data-align={align ?? "left"}
				data-balance={dataAttr(balance ?? true)}
				data-color={color ?? "contrast"}
				className={cx("tau-text", className)}
			/>
		);
	},
);
