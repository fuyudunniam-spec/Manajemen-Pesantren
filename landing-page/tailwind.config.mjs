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
                    800: '#166534',
                    900: '#14532d',
                    950: '#052e16',
                },
                gold: {
                    100: '#fef9c3',
                    400: '#d4af37',
                    500: '#b4941f',
                    600: '#8c7318',
                },
                paper: '#FAFAF9',
            },
            fontFamily: {
                // Royal Gold Fonts
                serif: ['"Cormorant Garamond"', 'serif'],
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                display: ['"Cinzel"', 'serif'],
            },
            borderRadius: {
                '4xl': '2.5rem',
                '5xl': '3rem',
            },
        },
    },
    plugins: [],
}
