import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'yamgwplz',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-23',
    token: process.env.SANITY_TOKEN,
});

async function deleteLandingPage() {
    try {
        console.log('🗑️  Deleting existing landingPage document...');

        const result = await client.delete('landingPage');

        console.log('✅ Deleted successfully!');
        console.log(result);
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

deleteLandingPage();
