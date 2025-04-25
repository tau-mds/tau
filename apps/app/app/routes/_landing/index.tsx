import { createFileRoute } from "@tanstack/react-router";
import { Button, Dialog } from "@tau/ui";
import React from "react";
import { env } from "~/lib/env";
import { echo } from "~/lib/api/echo";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_landing/")({
  component: Component,
  loader: async (opts) => {
    opts.context.queryClient.ensureQueryData(
      echo.queries.plm({ salute: "Hi", message: "there" }),
    );
  },
});

function Component() {
  const [count, setCount] = React.useState(0);
  const echoQuery = useSuspenseQuery(
    echo.queries.plm({ salute: "Hi", message: "there" }),
  );

  return (
    <main>
      <h1>Proj. Tau</h1>
      <div className="inline-flex items-center justify-between gap-3">
        <Button size="icon" onClick={() => setCount((prev) => prev - 1)}>
          <span className="size-5 grid place-content-center">-</span>
        </Button>
        <p>{count}</p>
        <Button size="icon" onClick={() => setCount((prev) => prev + 1)}>
          <span className="size-5 grid place-content-center">+</span>
        </Button>

        <pre>{env.VITE_API_URL}</pre>
        <pre>{JSON.stringify(echoQuery.data, null, 2)}</pre>
      </div>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </main>
  );
}
