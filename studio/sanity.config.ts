import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes } from './schemaTypes';

import { myStructure } from './deskStructure';

export default defineConfig({
    name: 'default',
    title: 'Isyraq Annur Studio',

    projectId: 'yamgwplz',
    dataset: 'production',

    plugins: [
        structureTool({
            structure: myStructure,
        }),
        presentationTool({
            previewUrl: {
                origin: 'http://localhost:4321', // Your Astro dev server
                previewMode: {
                    enable: '/api/draft',
                },
            },
        }),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
    },
});
