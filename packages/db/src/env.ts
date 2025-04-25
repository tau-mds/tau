import * as v from "valibot";

const envSchema = v.object({
  DATABASE_URL: v.string(),
  DATABASE_AUTH_TOKEN: v.string(),
});

export type env = v.InferOutput<typeof envSchema>;
export const env = v.parse(envSchema, process.env);
