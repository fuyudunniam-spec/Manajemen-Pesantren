import { createClient } from '@sanity/client';

// Test with ZERO cache
const client = createClient({
    projectId: 'yamgwplz',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-24', // Today's date
    perspective: 'published', // ONLY published docs
});

async function testFetch() {
    try {
        console.log('=== FETCHING WITH ZERO CACHE ===');
        console.log('Dataset:', 'production');
        console.log('Perspective:', 'published');
        console.log('CDN:', false);
        console.log('');

        const data = await client.fetch(`*[_type == "landingPage"][0]{
            _id,
            _rev,
            _updatedAt,
            hero {
                badge,
                title,
                description
            }
        }`);

        console.log('=== DOCUMENT METADATA ===');
        console.log('ID:', data?._id);
        console.log('Revision:', data?._rev);
        console.log('Last Updated:', data?._updatedAt);
        console.log('');

        console.log('=== HERO DATA ===');
        console.log('Badge:', data?.hero?.badge);
        console.log('Description:', data?.hero?.description);
        console.log('');

        if (data?.hero?.title) {
            console.log('=== HERO TITLE ===');
            const titleText = data.hero.title[0]?.children?.map((c: any) => c.text).join('');
            console.log('Full Text:', titleText);
            console.log('');
            console.log('Raw Structure:');
            console.log(JSON.stringify(data.hero.title, null, 2));
        } else {
            console.log('❌ NO HERO TITLE FOUND!');
        }
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

testFetch();
