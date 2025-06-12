import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import starlight from "@astrojs/starlight";
// @ts-check
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import react from "@astrojs/react";

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
        { label: "Coding standards", slug: "coding-standards" },
        { label: "Design patterns", slug: "design-patterns" },
        {
          label: "Guides",
          items: [{ label: "Contributing", slug: "guides/contributing" }],
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
