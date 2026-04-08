import eslintPluginAstro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
    {
        ignores: ['dist/', '.astro/', 'node_modules/'],
    },
    ...eslintPluginAstro.configs['flat/recommended'],
    {
        files: ['**/*.astro'],
        languageOptions: {
            parserOptions: {
                parser: tsParser,
            },
        },
    },
    {
        files: ['**/*.astro/*.js', '**/*.astro/*.ts'],
        languageOptions: {
            parser: tsParser,
        },
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
        },
    },
];
