import { Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono";

const customCss = `
@font-face {
  font-family: "Overused Grotesk";
  src: url("../fonts/OverusedGrotesk-VF.woff2") format("woff2-variations");
  font-weight: 300 900;
}

:root {
  --scalar-font: "Overused Grotesk", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.dark-mode {
	--scalar-background-1: #111113;
	--scalar-background-2: #1A191B;
	--scalar-background-3: #1A191B;
	--scalar-color-1: #b5b2bc;
	--scalar-color-2: #b5b2bc;
	--scalar-color-3: #b5b2bc;
	--scalar-border-color: #2D2D2F;
	--scalar-background-accent: transparent;
	--scalar-color-accent: #93b4ff;

	.sidebar {
	  --scalar-sidebar-background-1: var(--scalar-background-1);
		border-right: .5px solid var(--scalar-border-color);
	}
}

.light-mode {
	--scalar-background-2: #fff;
	--scalar-background-1: #f2eff3;
	--scalar-color-1: #201f26;
	--scalar-color-2: #65636d;
	--scalar-color-3: #65636d;
	--scalar-border-color: #CFD0D4;
	--scalar-background-accent: transparent;
	--scalar-color-accent: #3d63dd;
}
`;

export namespace DocumentsApi {
  export const route = new Hono().get(
    Scalar({
      pageTitle: "API Docs | Tau",
      url: "/openapi.json",
      layout: "modern",
      // spec: {
      //   url: "https://cdn.jsdelivr.net/npm/@scalar/galaxy/dist/latest.yaml",
      // },
      hideClientButton: true,
      customCss,
      operationsSorter: "method",
      defaultOpenAllTags: true,
    }),
  );
}
