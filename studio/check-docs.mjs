import { createClient } from '@sanity/client';
import 'dotenv/config';

const client = createClient({
    projectId: 'yamgwplz',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-24',
});

async function checkDocuments() {
    try {
        console.log('=== CHECKING ALL LANDING PAGE DOCUMENTS ===\n');

        const docs = await client.fetch(`*[_type == "landingPage"]{
            _id,
            _rev,
            _updatedAt,
            "heroTitle": hero.title[0].children[0].text,
            "heroBadge": hero.badge,
            "heroDesc": hero.description
        }`);

        console.log(`Found ${docs.length} landingPage document(s):\n`);

        docs.forEach((doc, idx) => {
            console.log(`Document #${idx + 1}:`);
            console.log(`  ID: ${doc._id}`);
            console.log(`  Last Updated: ${doc._updatedAt}`);
            console.log(`  Hero Title: "${doc.heroTitle || 'NULL'}"`);
            console.log(`  Hero Badge: "${doc.heroBadge || 'NULL'}"`);
            console.log(`  Hero Desc: "${doc.heroDesc ? doc.heroDesc.substring(0, 50) + '...' : 'NULL'}"`);
            console.log('');
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

checkDocuments();
