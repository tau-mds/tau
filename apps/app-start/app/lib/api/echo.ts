import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import { db, foo } from "@tau/db";

export * as echo from "./echo";

const handler = createServerFn({ method: "GET" })
  .validator(
    v.object({
      salute: v.picklist(["Hi", "Hello", "Hola"]),
      message: v.pipe(
        v.string(),
        v.minLength(1),
        v.maxLength(255),
        v.description("Message for echoing"),
      ),
    }),
  )
  .handler(async (ctx) => {
    const res = await db
      .select({ id: foo.table.id, bar: foo.table.bar })
      .from(foo.table)
      .then((r) => r[0]);
    return `${ctx.data.salute}, ${ctx.data.message}, ${res?.id}`;
  });

export const queries = {
  plm: (data: Parameters<typeof handler>[0]["data"]) =>
    queryOptions({
      queryKey: ["echo"],
      queryFn: () => handler({ data }),
    }),
};
