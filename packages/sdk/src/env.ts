import * as v from "valibot";

const envSchema = v.object({
  API_URL: v.pipe(v.string(), v.url()),
});

export const env = v.parse(envSchema, process.env);
export type env = v.InferOutput<typeof envSchema>;
