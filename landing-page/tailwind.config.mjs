/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: '#2D3A18', // Deep Forest Green
                secondary: '#B8860B', // Warm Gold
                accent: '#FDFBF7', // Ivory Cream
                // Additional Shadcn-like tokens
                background: '#FDFBF7',
                foreground: '#2D3A18',
                muted: '#F5F5F0',
                'muted-foreground': '#64748B',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
