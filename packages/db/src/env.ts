import * as v from "valibot";

const envSchema = v.variant("DATABASE_CONN_TYPE", [
  v.object({ DATABASE_CONN_TYPE: v.literal("local") }),
  v.object({
    DATABASE_CONN_TYPE: v.literal("remote"),
    DATABASE_URL: v.string(),
    DATABASE_AUTH_TOKEN: v.string(),
  }),
]);

export type env = v.InferOutput<typeof envSchema>;
export const env = v.parse(envSchema, process.env);
