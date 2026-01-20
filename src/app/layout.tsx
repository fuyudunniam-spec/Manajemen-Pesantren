import type { Metadata } from 'next';
import { Inter, Outfit, Playfair_Display, Lato } from 'next/font/google';
import '@/index.css';
import { Toaster } from 'sonner';
import { SettingsProvider } from '@/hooks/useSettings';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

// Fonts for Royal Theme
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const lato = Lato({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-lato',
});

export const metadata: Metadata = {
    title: 'e-Maktab | Manajemen Pesantren Modern',
    description: 'Sistem Informasi Manajemen Pesantren Terpadu',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Basic settings for the dashboard - can be expanded later if needed
    const settings = {
        site_title: 'e-Maktab',
        site_tagline: 'Manajemen Pesantren',
    };

    return (
        <html lang="id">
            <body className={`${inter.variable} ${outfit.variable} ${playfair.variable} ${lato.variable} font-sans antialiased bg-slate-50`}>
                <SettingsProvider initialSettings={settings as any}>
                    {children}
                    <Toaster position="top-center" richColors />
                </SettingsProvider>
            </body>
        </html>
    );
}
