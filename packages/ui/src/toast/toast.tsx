import type React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export namespace Toaster {
	export type Props = ToasterProps;
}
export const Toaster = (props: Toaster.Props) => {
	return (
		<Sonner
			className="toaster group"
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
				} as React.CSSProperties
			}
			{...props}
		/>
	);
};
