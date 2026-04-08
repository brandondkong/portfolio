// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import sanity from '@sanity/astro';
import react from '@astrojs/react';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    adapter: node({ mode: 'standalone' }),
    site: 'https://kong.ly',
    vite: {
        plugins: [tailwindcss()],
    },

    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: 'Inter',
            cssVariable: '--font-inter',
            weights: [300, 400, 500, 600, 700, 800, 900],
        },
    ],

    integrations: [
        icon(),
        sanity({
            projectId: 'mpaopctd',
            dataset: 'production',
            useCdn: false,
        }),
        react(),
        sitemap(),
    ],
});
