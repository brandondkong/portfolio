// sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from '@kong/sanity';

export default defineConfig({
    name: 'kongly',
    title: 'kong.ly',
    projectId: 'mpaopctd',
    dataset: 'production',
    plugins: [structureTool()],
    schema: {
        types: schemaTypes,
    },
});
