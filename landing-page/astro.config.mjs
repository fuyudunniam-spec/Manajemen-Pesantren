import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
    integrations: [
        tailwind(),
        react(),
        sanity({
            projectId: 'yamgwplz',
            dataset: 'production',
            useCdn: false, // Disable CDN for development to get fresh data
            studioUrl: '/studio', // We will set this up later
        }),
    ],
});
