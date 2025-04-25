import { defineWorkspace } from "vitest/config";

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineWorkspace(["/packages/*", "/apps/*"]);
