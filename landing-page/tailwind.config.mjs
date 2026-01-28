/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // Original colors (keep for backward compatibility)
                primary: 'hsl(var(--primary))',
                secondary: 'hsl(var(--secondary))',
                accent: 'hsl(var(--accent))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                muted: '#F5F5F0',
                'muted-foreground': '#64748B',

                // Royal Gold Theme Colors
                royal: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bcf5d4',
                    300: '#7ee4a0',
                    400: '#48ce6a',
                    500: '#20ae50',
                    600: '#168d40',
                    700: '#157134',
                    800: '#166534',
                    900: '#14532d',
                    950: '#052e16',
                },
                gold: {
                    50: '#fefce8', // Added
                    100: '#fef9c3',
                    200: '#fef08a',
                    300: '#fde047',
                    400: '#d4af37', // Branding Gold
                    500: '#b4941f', // Darker Gold for accents
                    600: '#8c7318',
                    700: '#a16207',
                },
                paper: '#FAFAF9',
                stone: {
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    200: '#e7e5e4',
                    300: '#d6d3d1',
                    400: '#a8a29e',
                    500: '#78716c',
                    600: '#57534e',
                    700: '#44403c',
                    800: '#292524',
                    900: '#1c1917',
                    950: '#0c0a09',
                }
            },
            fontFamily: {
                sans: ['Cormorant Garamond', 'serif'],
                display: ['Cinzel', 'serif'],
                body: ['Inter', 'sans-serif'],
                arabic: ['Amiri', 'serif', 'Noto Naskh Arabic', 'Arial'],
            },
            borderRadius: {
                '4xl': '2.5rem',
                '5xl': '3rem',
            },
        },
    },
    plugins: [],
}
