import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";
import { getCookie, setCookie } from "vinxi/http";

import { clientHintsQueries } from "./client-hint";

export * as theme from "./theme";

const opts = {
  light: "light",
  dark: "dark",
  system: "system",
} as const;

export const COOKIE = "theme";

export const light = opts.light;
export const dark = opts.dark;
export const system = opts.system;

export const type = v.union([v.literal(light), v.literal(dark), v.literal(system)]);
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
  const rawTheme = getCookie(COOKIE);
  return v.parse(v.fallback(type, system), rawTheme);
});

export const set = createServerFn({ method: "POST" })
  .validator(type)
  .handler((ctx) => {
    setCookie(COOKIE, ctx.data, {
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
