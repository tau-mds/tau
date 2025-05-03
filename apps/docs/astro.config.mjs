// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "Tau",
			social: [
				{
					icon: "github",
					href: "https://github.com/withastro/starlight",
					label: "Github",
				},
			],
			components: {
				Header: "./src/components/header.astro",
			},
			sidebar: [
				{
					label: "Guides",
					items: [
						{ label: "Example Guide", slug: "guides/example" },
						{ label: "Contributing", slug: "guides/contributing" },
					],
				},
				{
					label: "Reference",
					autogenerate: { directory: "reference" },
				},
				{
					label: "Dummy",
					items: [{ label: "Markdown", slug: "dummy/markdown" }],
				},
			],
			customCss: [
				"./src/styles/global.css",
				"./src/styles/custom.css",
				"./src/styles/heading.css",
				"./src/styles/markdown.css",
			],
		}),
		react(),
	],

	markdown: {
		rehypePlugins: [rehypeHeadingIds, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
	},
});
