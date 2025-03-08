import { useSuspenseQuery } from "@tanstack/react-query";
import { Button, Icon } from "@tau/ui";
import React from "react";

import { theme } from "~/lib/theme";

export function ThemeSwitcher() {
	return (
		<React.Suspense fallback={<Button state="loading">0</Button>}>
			<Inner />
		</React.Suspense>
	);
}

function Inner() {
	const themeQuery = useSuspenseQuery(theme.queries.get());
	const toggle = theme.useToggle();

	return (
		<Button
			type="button"
			square
			size="large"
			onClick={() => toggle.mutate({ data: theme.next(themeQuery.data) })}
		>
			<span className="sr-only">{options[themeQuery.data].label}</span>
			<Icon name={options[themeQuery.data].icon} />
		</Button>
	);
}

const options = {
	light: {
		label: "Light",
		icon: "sun",
	},
	dark: {
		label: "Dark",
		icon: "moon",
	},
	system: {
		label: "System",
		icon: "modern-tv",
	},
} as const satisfies Record<theme.type, { label: string; icon: Icon.Type }>;
