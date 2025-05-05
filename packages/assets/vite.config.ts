import { buildConfig } from "@tau/vite";
import { defineConfig, mergeConfig } from "vite";

export default mergeConfig(
	defineConfig({
		css: {
			transformer: "lightningcss",
		},
		build: {
			cssCodeSplit: true,
			cssMinify: "lightningcss",
		},
	}),
	buildConfig({
		entry: ["./src/index.ts", "./src/index.css"],
		srcDir: "./src",
	}),
);
