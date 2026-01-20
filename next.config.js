/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'hljmamcoaaqxdytupsra.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    // Suppress TypeScript errors during migration
    typescript: {
        ignoreBuildErrors: true,
    },
    async rewrites() {
        return [
            // Studio CMS (Sanity)
            {
                source: '/studio/:path*',
                destination: 'http://localhost:3333/studio/:path*',
            },
            // Website Publik (Astro) - Kita biarkan root tetap Dashboard 
            // Tapi kita bisa buat /web untuk melihat landing page di lokal
            {
                source: '/web/:path*',
                destination: 'http://localhost:4321/:path*',
            }
        ]
    },
}

export default nextConfig

