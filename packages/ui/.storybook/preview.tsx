import "./index.css";
import "@tau/assets";
import type { Preview } from "@storybook/react";

import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import type { ReactRenderer } from "@storybook/react";
import theme from "./theme";

const customViewports = {
	"720p": {
		name: "720p",
		styles: {
			width: "1280px",
			height: "720px",
		},
	},
	"1080p": {
		name: "1080p",
		styles: {
			width: "1920px",
			height: "1080px",
		},
	},
	"2k": {
		name: "2K",
		styles: {
			width: "2560px",
			height: "1440px",
		},
	},
	"4k": {
		name: "4K",
		styles: {
			width: "3840px",
			height: "2160px",
		},
	},
	"21/9": {
		name: "21/9",
		styles: {
			width: "2560px",
			height: "1080px",
		},
	},
};

export default {
	tags: ["autodocs"],
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
			expanded: true,
		},
		viewport: {
			viewports: {
				...customViewports,
				...INITIAL_VIEWPORTS,
			},
		},
		docs: { theme },
	},
	decorators: [
		withThemeByDataAttribute<ReactRenderer>({
			themes: {
				light: "light",
				dark: "dark",
			},
			defaultTheme: "dark",
			attributeName: "data-theme",
		}),
	],
} as Preview;
