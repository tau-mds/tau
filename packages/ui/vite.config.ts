import tailwindcss from "@tailwindcss/vite";
import { buildConfig } from "@tau/vite";
import react from "@vitejs/plugin-react";
import icons from "unplugin-icons/vite";
import { defineConfig, mergeConfig } from "vite";

import pkg from "./package.json";

export default mergeConfig(
	defineConfig({
		plugins: [react(), tailwindcss(), icons({ compiler: "jsx", jsx: "react" })],
	}),
	buildConfig({
		entry: ["./src/index.ts"],
		srcDir: "./src",
		exclude: ["**/*.stories.tsx"],
		externalDeps: Object.keys(pkg.dependencies),
	}),
);
