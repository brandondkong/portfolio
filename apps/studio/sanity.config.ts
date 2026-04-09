import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from '@kong/sanity';

export default defineConfig({
    name: 'kongly',
    title: 'kong.ly',
    projectId: 'mpaopctd',
    dataset: 'production',
    plugins: [structureTool(), codeInput()],
    schema: {
        types: schemaTypes,
    },
});
