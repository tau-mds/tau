import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/react-start/config";
import icons from "unplugin-icons/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  tsr: {
    routeToken: "layout",
    quoteStyle: "double",
    semicolons: true,
  },

  server: {
    preset: "node-server",
  },

  vite: {
    plugins: [
      tailwindcss(),
      icons({ compiler: "jsx", jsx: "react" }),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
