import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@tau/auth-client";
// import { useSession } from "@tau/auth";
import { Button, Dialog } from "@tau/ui";
import React, { useEffect } from "react";
import { echo } from "~/lib/api/echo";
import { env } from "~/lib/env";

export const Route = createFileRoute("/_landing/")({
  component: Component,
  loader: async (opts) => {
    opts.context.queryClient.ensureQueryData(
      echo.queries.plm({ salute: "Hi", message: "there" })
    );
  },
});

function Component() {
  const [count, setCount] = React.useState(0);
  const echoQuery = useSuspenseQuery(
    echo.queries.plm({ salute: "Hi", message: "there" })
  );

  const { data, isPending, error } = authClient.useSession();
  // const { data, isPending, error } = useSession();

  useEffect(() => {
    authClient.signIn.email({
      email: "user@email.com",
      password: "password",
    });
  }, []);

  useEffect(() => {
    console.log(data);
    if (!data?.user) {
      console.log(data);
    }
  }, [data]);

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
