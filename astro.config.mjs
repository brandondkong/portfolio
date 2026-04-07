// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from "astro-icon";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  fonts: [{
    provider: fontProviders.fontsource(),
    name: "Inter",
    cssVariable: "--font-inter",
    weights: [400, 500, 600, 700, 800, 900],
  }],

  integrations: [icon(), sanity({
    projectId: "mpaopctd",
    dataset: "production",
    useCdn: false,
    studioBasePath: '/admin',
  }), react()]
});