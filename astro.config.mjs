// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from "astro-icon";

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
  },{
    provider: fontProviders.fontsource(),
    name: "Fragment Mono",
    cssVariable: "--font-fragment-mono",
  }],

  integrations: [icon()]
});