import {defineConfig} from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import vercel from '@astrojs/vercel/static';

const site = "https://natserract-fyi.vercel.app";

// https://astro.build/config
export default defineConfig({
    site,
    integrations: [mdx(), sitemap(), tailwind(), react()],

    markdown: {
        shikiConfig: {
            theme: "github-light",
        },
    },

    adapter: vercel(),
});