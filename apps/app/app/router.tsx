import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import type React from "react";
import { ErrorBoundary } from "~/components/error-boundary";
import { routeTree } from "./routeTree.gen";
import { toast } from "@tau/ui";

export function createRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (error) => {
          toast.error(`Error: ${error.message || "Unknown error"}`);
          console.error("Fetch Round Preview Error:", error);
        },
      },
    },
  });

  const router = createTanStackRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultViewTransition: true,
    defaultErrorComponent: ErrorBoundary,
  });

  return routerWithQueryClient(router, queryClient);
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }

  interface StaticDataRouteOption {
    breadcrumb?: (data?: unknown) => React.ReactNode;
  }
}
