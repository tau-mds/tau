import { iconsSpritesheet } from "vite-plugin-icons-spritesheet";
import { defineConfig, mergeConfig } from "vite";
import { tanstackViteConfig } from "@tanstack/config/vite";

const config = defineConfig({
	plugins: [
		iconsSpritesheet({
			withTypes: true,
			inputDir: "src/icons",
			outputDir: "./dist/assets/icons",
			typesOutputFile: "./dist/icons.ts",
			iconNameTransformer: (name) =>
				name
					.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
					.toLowerCase()
					.replace(/-?element/, ""),
		}),
	],
});

export default mergeConfig(
	config,
	tanstackViteConfig({
		entry: "./src/index.ts",
		srcDir: "./src",
		cjs: false,
		outDir: "./dist/dist",
	}),
);
