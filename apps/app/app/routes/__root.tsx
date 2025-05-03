import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type React from "react";

import { ClientHint } from "~/lib/client-hint";
import { theme } from "~/lib/theme";

import styles from "~/root.css?url";

import { Toaster } from "@tau/ui";
import { ErrorBoundary } from "~/components/error-boundary";

type Context = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<Context>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tau" },
    ],
    links: [{ rel: "stylesheet", href: styles }],
  }),
  loader: async (ctx) => {
    await ctx.context.queryClient.ensureQueryData(theme.queries.get());
  },
  component: Component,
  errorComponent: (props) => (
    <Document>
      <ErrorBoundary {...props} />
    </Document>
  ),
});

function Component() {
  return (
    <Document>
      <Outlet />
      <Toaster richColors position="bottom-center" />
    </Document>
  );
}

function Document(props: Readonly<{ children: React.ReactNode }>) {
  const themeData = theme.useWithPrefference();

  return (
    <html lang="en" data-theme={themeData}>
      <head>
        <ClientHint />
        <HeadContent />
      </head>

      <body>
        {props.children}

        <TanStackRouterDevtools position="bottom-right" />
        {/* <ReactQueryDevtools buttonPosition="bottom-left" /> */}
        <ReactQueryDevtools buttonPosition="top-right" />
        <Scripts />
      </body>
    </html>
  );
}
