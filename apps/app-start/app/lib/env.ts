import * as v from "valibot";

const envSchema = v.object({
  NODE_ENV: v.optional(
    v.picklist(["development", "production", "test"]),
    "development",
  ),
  PORT: v.optional(v.number(), 8081),
  VITE_API_URL: v.pipe(v.string(), v.url()),
});

export const env = v.parse(envSchema, import.meta.env);
export type env = v.InferOutput<typeof envSchema>;
