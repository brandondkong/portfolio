import * as pluginAstro from 'prettier-plugin-astro';
import * as pluginTailwind from 'prettier-plugin-tailwindcss';

/** @type {import("prettier").Config} */
export default {
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    useTabs: false,
    trailingComma: 'all',
    plugins: [pluginAstro, pluginTailwind],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
};
