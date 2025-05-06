import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { middleware } from "~/lib/middlewares";

export * as users from "./users";

export const current = createServerFn({ method: "GET" })
  .middleware([middleware.auth])
  .handler(async ({ context }) => {
    return context.session?.user;
  });

export const assertAuthenticated = createServerFn({ method: "GET" })
  .middleware([middleware.auth])
  .handler(async ({ context }) => {
    const user = context.session?.user;
    if (!user) {
      throw redirect({ to: "/auth" });
    }

    return user;
  });

export const assertAnonymous = createServerFn({ method: "GET" })
  .middleware([middleware.auth])
  .handler(async ({ context }) => {
    const user = context.session?.user;
    if (user) {
      throw redirect({ to: "/app" });
    }
  });
