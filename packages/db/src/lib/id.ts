import { customType } from "drizzle-orm/sqlite-core";
import * as v from "valibot";
import { ulid as genUlid } from "ulid";

export function createId<const P extends string>(prefix: P) {
  const schema = v.pipe(v.string(), v.brand(`${prefix}_id`));
  return {
    schema,
    new: () => `${prefix}_${genUlid()}` as v.InferOutput<typeof schema>,
  };
}

export type InferId<Id extends ReturnType<typeof createId>> = v.InferOutput<
  Id["schema"]
>;

export function typedId<TId extends ReturnType<typeof createId>>(_: TId) {
  return customType<{ data: v.InferOutput<TId["schema"]> }>({
    dataType: () => "text",
  })({});
}
