export const brandingConfig = {
    app: {
        name: 'e-Maktab',
        fullName: 'e-Maktab - Islamic Modern Management System',
        tagline: 'Islamic Modern Management System',
        description: 'Sistem Informasi Manajemen Pondok Pesantren',
    },

    logo: {
        icon: 'م', // Arabic letter Mim
        alt: 'e-Maktab Logo',
        path: '/logo.svg', // Optional: for custom logo file
    },

    colors: {
        primary: {
            50: 'hsl(158 45% 97%)',
            100: 'hsl(158 45% 92%)',
            200: 'hsl(158 50% 82%)',
            300: 'hsl(158 55% 70%)',
            400: 'hsl(158 60% 55%)',
            500: 'hsl(158 64% 45%)',
            600: 'hsl(158 64% 32%)',
            700: 'hsl(158 64% 25%)',
            800: 'hsl(158 64% 20%)',
            900: 'hsl(158 64% 15%)',
            950: 'hsl(158 64% 10%)',
        },
        secondary: {
            50: 'hsl(43 74% 97%)',
            100: 'hsl(43 74% 92%)',
            200: 'hsl(43 74% 82%)',
            300: 'hsl(43 74% 70%)',
            400: 'hsl(43 74% 60%)',
            500: 'hsl(43 74% 49%)',
            600: 'hsl(35 80% 45%)',
            700: 'hsl(30 85% 40%)',
            800: 'hsl(25 90% 35%)',
            900: 'hsl(20 95% 30%)',
        },
    },

    typography: {
        heading: 'Playfair Display, serif',
        body: 'Inter, sans-serif',
    },

    backgrounds: {
        login: 'bg-emerald-950',
        dashboard: 'bg-gradient-to-br from-slate-50 to-slate-100',
        sidebar: 'bg-emerald-900',
        sidebarDark: 'bg-emerald-950',
    },

    theme: {
        name: 'Islamic Royal',
        style: 'Modern Futuristic',
        primaryColor: 'emerald',
        accentColor: 'amber',
    },
} as const;

export type BrandingConfig = typeof brandingConfig;
