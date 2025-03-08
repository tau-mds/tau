import type { IconName } from "@tau/assets/icons";
import { cx } from "@tau/utils";
import React from "react";

export namespace Icon {
	export type Type = IconName;
	export type Props = Omit<React.ComponentPropsWithoutRef<"svg">, "name"> & {
		name: Icon.Type;
	};
}

export const Icon = React.forwardRef<SVGSVGElement, Icon.Props>(
	({ name, className, ...props }, ref) => {
		return (
			// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
			<svg ref={ref} {...props} className={cx("tau-icon", className)} data-scope="icon">
				<use href={`/assets/icons/sprite.svg#${name}`} />
			</svg>
		);
	},
);
