import type React from "react";
import { useHydrated } from "~/lib/use-hydrated";

export function ClientOnly(props: {
	children: () => React.ReactNode;
	fallback?: React.ReactNode;
}) {
	const hydrated = useHydrated();

	if (!hydrated) {
		return <>{props.fallback}</>;
	}

	return <>{props.children()}</>;
}
