import { assert } from "@tau/utils";
import { createStore } from "@xstate/store";
import { useSelector } from "@xstate/store/react";

export * as cmdk from "~/lib/cmdk/store";

export const HOTKEY = "k";
export const SHORTCUT = ["Meta", HOTKEY] as const;

function createPath(to: string) {
  return { route: to, search: "" };
}

type Path = ReturnType<typeof createPath>;

const store = createStore({
  context: { path: [] as Array<Path> },
  on: {
    return: (ctx) => ({ ...ctx, path: ctx.path.slice(0, -1) }),
    navigate: (ctx, evt: { to: string }) => ({
      ...ctx,
      path: [...ctx.path, createPath(evt.to)],
    }),

    open: (ctx) => ({ ...ctx, path: [createPath("root")] }),
    close: (ctx) => ({ ...ctx, path: [] }),
    toggle: (ctx) => ({
      ...ctx,
      path: ctx.path.length > 0 ? [] : [createPath("root")],
    }),

    search: (ctx, evt: { value: string }) => {
      const page = ctx.path.at(-1);
      assert(!!page, "path cannot be empty");

      return {
        ...ctx,
        path: ctx.path.with(-1, { ...page, search: evt.value }),
      };
    },
  },
});

export function useOpen() {
  return useSelector(store, (s) => s.context.path.length > 0);
}

export function useRoute() {
  return useSelector(store, (s) => s.context.path.at(-1)?.route);
}

export function useSearch() {
  return useSelector(store, (s) => s.context.path.at(-1)?.search);
}

export const action = store.trigger;
