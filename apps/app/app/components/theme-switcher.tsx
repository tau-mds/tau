import { useSuspenseQuery } from "@tanstack/react-query";
import { Button, ToggleGroup } from "@tau/ui";
import { entries } from "@tau/utils";
import React from "react";

import { theme } from "~/lib/theme";

import Laptop from "~icons/radix-icons/laptop";
import Moon from "~icons/radix-icons/moon";
import Sun from "~icons/radix-icons/sun";

export function ThemeSwitcher() {
	return (
		<React.Suspense fallback={<Button disabled>0</Button>}>
			<Inner />
		</React.Suspense>
	);
}

function Inner() {
	const themeQuery = useSuspenseQuery(theme.queries.get());
	const toggle = theme.useToggle();

	return (
		<ToggleGroup.Root
			onValueChange={(data) =>
				document.startViewTransition(() => toggle.mutate({ data }))
			}
			value={themeQuery.data}
			type="single"
			className="bg-accent"
			variant="outline"
		>
			{entries(options).map(([value, opt]) => (
				<ToggleGroup.Item
					value={value}
					className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
					key={`theme-${value}`}
				>
					<opt.Icon />
					<span className="sr-only">{opt.label}</span>
				</ToggleGroup.Item>
			))}
		</ToggleGroup.Root>
	);
}

const options = {
	light: {
		label: "Light",
		Icon: Sun,
	},
	dark: {
		label: "Moon",
		Icon: Moon,
	},
	system: {
		label: "System",
		Icon: Laptop,
	},
} as const satisfies Record<theme.type, { label: string; Icon: unknown }>;
