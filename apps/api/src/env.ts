import * as v from "valibot";

const envSchema = v.object({
  NODE_ENV: v.optional(
    v.picklist(["development", "production", "test"]),
    "development",
  ),
  PORT: v.optional(v.number(), 8080),
  APP_URL: v.pipe(v.string(), v.url()),
});

export const env = v.parse(envSchema, process.env);
export type env = v.InferOutput<typeof envSchema>;
