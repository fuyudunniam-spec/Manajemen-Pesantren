import { client } from '../../../lib/sanity';

export const GET = async () => {
    try {
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

        return new Response(JSON.stringify({
            success: true,
            metadata: {
                id: data?._id,
                rev: data?._rev,
                updatedAt: data?._updatedAt,
            },
            hero: data?.hero,
            titleText: data?.hero?.title?.[0]?.children?.map((c: any) => c.text).join('') || 'NO TITLE',
        }, null, 2), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({
            success: false,
            error: error.message,
        }, null, 2), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};
