import { type HTMLArkProps, ark } from "@ark-ui/react";
import { cx } from "@tau/utils";
import React from "react";

import { dataAttr } from "../utils";

export namespace Button {
	export type Variants = {
		/**
		 * The `variant` property defines the visual style of the Button component
		 * @default "primary"
		 */
		variant: "primary" | "secondary" | "transparent" | "danger" | "accent";

		/**
		 * The `size` property defines the dimension of the Button component
		 * @default "base"
		 */
		size: "small" | "base" | "large" | "xlarge";

		/**
		 * The `state` property defines the current status of the button, controlling its behavior
		 * and appearance. It can be set to one of the following values:
		 * - `normal`: The default state, where the button is fully interactive
		 * - `loading`: Indicates that an action is in progress, accompanied by a visual cue;
		 *	 The button cannot be interacted with
		 * - `disabled`: The button cannot be interacted with
		 * @default "normal"
		 */
		state: "normal" | "loading" | "disabled";

		/**
		 * Whether the padding of the Button is the same on the x-axis and the y-axis
		 * @default false
		 */
		square: boolean;

		/**
		 * Whether the Button spans the whole width of the parent component
		 * @default false
		 */
		fullWidth: boolean;
	};

	export type Props = Omit<HTMLArkProps<"button">, "disabled"> & Partial<Variants>;
}

export const Button = React.forwardRef<HTMLButtonElement, Button.Props>(
	({ variant, size, square, state, fullWidth, className, ...props }, ref) => {
		return (
			<ark.button
				ref={ref}
				{...props}
				disabled={state === "disabled" || state === "loading"}
				data-variant={variant ?? "primary"}
				data-size={size ?? "base"}
				data-state={state ?? "normal"}
				data-square={dataAttr(square)}
				data-fullwidth={dataAttr(fullWidth)}
				data-scope="button"
				className={cx("tau-button", className)}
			/>
		);
	},
);
