// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import sanity from '@sanity/astro';
import { createClient } from '@sanity/client';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const sanityProjectId = 'mpaopctd';
const sanityDataset = 'production';

let cmsLastmodPromise = null;
function getCmsLastmodMap() {
    if (!cmsLastmodPromise) {
        cmsLastmodPromise = (async () => {
            const map = new Map();
            try {
                const client = createClient({
                    projectId: sanityProjectId,
                    dataset: sanityDataset,
                    useCdn: false,
                    apiVersion: '2024-01-01',
                });
                const items = await client.fetch(
                    `*[(_type == "post" || _type == "project") && defined(slug.current)]{ _type, "slug": slug.current, _updatedAt }`,
                );
                for (const it of items) {
                    const path =
                        it._type === 'post'
                            ? `/blog/${it.slug}`
                            : `/works/${it.slug}`;
                    map.set(path, it._updatedAt);
                }
            } catch (err) {
                console.warn(
                    '[sitemap] could not fetch lastmod from Sanity:',
                    err,
                );
            }
            return map;
        })();
    }
    return cmsLastmodPromise;
}

// https://astro.build/config
export default defineConfig({
    adapter: vercel(),
    site: 'https://kong.ly',
    trailingSlash: 'never',
    vite: {
        plugins: [tailwindcss()],
        server: {
            watch: {
                ignored: ['**/.vercel/**'],
            },
        },
    },

    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: 'Inter',
            cssVariable: '--font-inter',
            weights: [300, 400, 500, 600, 700, 800, 900],
        },
        {
            provider: fontProviders.fontsource(),
            name: 'Lora',
            cssVariable: '--font-lora',
            weights: [400, 500, 600, 700],
        },
    ],

    image: {
        domains: ['cdn.sanity.io'],
    },

    prefetch: {
        prefetchAll: true,
    },

    integrations: [
        icon(),
        sanity({
            projectId: sanityProjectId,
            dataset: sanityDataset,
            useCdn: false,
        }),
        sitemap({
            async serialize(item) {
                const map = await getCmsLastmodMap();
                const pathname = new URL(item.url).pathname.replace(
                    /\/$/,
                    '',
                );
                const lastmod = map.get(pathname);
                if (lastmod) item.lastmod = lastmod;
                return item;
            },
        }),
    ],
});
