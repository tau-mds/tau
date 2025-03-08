import {
	queryOptions,
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { assert } from "@tau/utils";
import * as v from "valibot";
import { getCookie, setCookie } from "vinxi/http";

import { clientHintsQueries } from "./client-hint";

export * as theme from "./theme";

const opts = {
	light: "light",
	dark: "dark",
	system: "system",
} as const;

export const light = opts.light;
export const dark = opts.dark;
export const system = opts.system;

export const type = v.union([
	v.literal(opts.light),
	v.literal(opts.dark),
	v.literal(opts.system),
]);
export type type = v.InferOutput<typeof type>;

export function is<O extends type>(value: unknown, opt: O): value is O {
	return v.is(type, value) && value === opt;
}

export function next(current: type) {
	if (is(current, system)) return light;
	if (is(current, light)) return dark;
	return system;
}

export const get = createServerFn().handler(async () => {
	const rawTheme = getCookie("theme");
	return v.parse(v.fallback(type, system), rawTheme);
});

export const set = createServerFn({ method: "POST" })
	.validator(type)
	.handler((ctx) => {
		setCookie("theme", ctx.data, {
			httpOnly: false,
			sameSite: "lax",
			secure: process.env["NODE_ENV"] === "production",
			path: "/",
			maxAge: 60 * 60 * 24 * 365 * 10,
		});
	});

export const queries = {
	get: () => queryOptions({ queryKey: ["theme"], queryFn: get }),
};

export function useToggle() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: set,
		onMutate: async (payload) => {
			await queryClient.cancelQueries(queries.get());

			queryClient.setQueryData(queries.get().queryKey, () => payload.data);
			return payload.data;
		},
		onSettled: () => queryClient.invalidateQueries(queries.get()),
	});
}

export function useWithPrefference() {
	const hintsQuery = useSuspenseQuery(clientHintsQueries.get());
	const themeQuery = useSuspenseQuery(queries.get());
	if (is(themeQuery.data, system)) {
		return hintsQuery.data.theme;
	}

	return themeQuery.data ?? hintsQuery.data.theme;
}

export function subscribeToChanges(onChange: (theme: type) => void) {
	assert(!!document, "`theme.subscribeToChanges` cannot be called from the server.");
	const query = window.matchMedia("(prefers-color-scheme: dark)");

	const handler = () => {
		const value = query.matches ? dark : light;
		document.cookie = `theme=${value}; Max-Age=31536000; Path=/`;
		onChange(value);
	};

	query.addEventListener("change", handler);
	return () => query.removeEventListener("change", handler);
}
