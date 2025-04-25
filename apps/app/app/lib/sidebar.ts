import {
	queryOptions,
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { useSplitter } from "@tau/ui";
import * as v from "valibot";
import { getCookie, setCookie } from "vinxi/http";

export * as sidebar from "./sidebar";

export const COOKIE = "sidebar";

export const MIN_WIDTH = 15;
export const MAX_WIDTH = 25;

export const HOTKEY = "[";
export const SHORTCUT = [HOTKEY] as const;

export const preferredWidth = v.pipe(
	v.union([v.string(), v.number()]),
	v.transform(Number),
	v.union([
		v.literal(0),
		v.pipe(v.number(), v.minValue(MIN_WIDTH), v.maxValue(MAX_WIDTH)),
	]),
);
export type preferredWidth = v.InferOutput<typeof preferredWidth>;

export const get = createServerFn().handler(async () => {
	return v.parse(v.fallback(preferredWidth, MIN_WIDTH), getCookie(COOKIE));
});

export const set = createServerFn({ method: "POST" })
	.validator(v.undefinedable(preferredWidth, MIN_WIDTH))
	.handler((ctx) => {
		setCookie(COOKIE, ctx.data.toString(), {
			httpOnly: false,
			sameSite: "lax",
			secure: process.env["NODE_ENV"] === "production",
			path: "/",
			maxAge: 60 * 60 * 24 * 365 * 10,
		});
	});

export const queries = {
	get: () => queryOptions({ queryKey: [COOKIE], queryFn: get }),
};

export function useWidth() {
	const sidebarQuery = useSuspenseQuery(queries.get());
	return Math.min(sidebarQuery.data, MAX_WIDTH);
}

export function useSetWidth() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: set,
		onMutate: async (ctx) => {
			await queryClient.cancelQueries(queries.get());

			queryClient.setQueryData(queries.get().queryKey, Number(ctx?.data ?? MIN_WIDTH));
		},
		onSettled: () => queryClient.invalidateQueries(queries.get()),
	});
}

export function useToggle_() {
	const splitter = useSplitter();

	const isOpen = useWidth() > 0;

	if (isOpen) {
		return (id: string) => splitter.collapsePanel(id);
	}

	return (id: string) => splitter.expandPanel(id);
}

export function useToggle() {
	const sidebarQuery = useSuspenseQuery(queries.get());
	const queryClient = useQueryClient();

	const data = sidebarQuery.data > 0 ? 0 : MIN_WIDTH;

	return useMutation({
		mutationFn: () => set({ data }),
		onMutate: async () => {
			await queryClient.cancelQueries(queries.get());
			queryClient.setQueryData(queries.get().queryKey, data);
		},
		onSettled: () => queryClient.invalidateQueries(queries.get()),
	});
}
