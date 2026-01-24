import { createClient } from '@sanity/client';
import 'dotenv/config';

const client = createClient({
    projectId: 'yamgwplz',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-24',
    token: process.env.SANITY_TOKEN,
});

async function deleteOldDocument() {
    try {
        console.log('🗑️  Deleting OLD landingPage document (ID: 9e498f57-c357-4afe-8675-9e4d80f3bb96)...\n');

        const result = await client.delete('9e498f57-c357-4afe-8675-9e4d80f3bb96');

        console.log('✅ Successfully deleted old document!');
        console.log(result);
        console.log('\n✨ Now only the CORRECT document (ID: landingPage) remains!');
        console.log('   Please refresh your landing page to see the changes.');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

deleteOldDocument();
