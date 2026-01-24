export const GET = () => {
    return new Response(null, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
