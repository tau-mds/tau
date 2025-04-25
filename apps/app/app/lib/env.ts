import * as v from "valibot";

const envSchema = v.object({
	NODE_ENV: v.optional(v.picklist(["development", "production", "test"]), "development"),
});

export const env = v.parse(envSchema, import.meta.env);
export type env = v.InferOutput<typeof envSchema>;
