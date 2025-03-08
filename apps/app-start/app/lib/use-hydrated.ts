import { noop } from "@tau/utils";
import React from "react";

export function useHydrated() {
	return React.useSyncExternalStore(
		() => noop,
		() => true,
		() => false,
	);
}
