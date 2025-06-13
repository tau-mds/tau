import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    name: "@tau/app",
    globals: true,
    setupFiles: ["./app/lib/tests/setup.ts"],
    alias: {
      "~/": new URL("./app/", import.meta.url).pathname,
    },

    browser: {
      enabled: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }],
    },
  },
});
