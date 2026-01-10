import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import '@/index.css'
import { Toaster } from 'sonner'
import { SettingsProvider } from '@/hooks/useSettings'

const jakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-body',
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-display',
})

export const metadata: Metadata = {
    title: 'e-Maktab | Manajemen Pesantren Modern',
    description: 'Sistem Informasi Manajemen Pesantren terintegrasi',
}

export const dynamic = 'force-dynamic';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id" className={`${jakarta.variable} ${playfair.variable}`}>
            <body className="antialiased">
                <SettingsProvider>
                    {children}
                    <Toaster position="top-center" richColors />
                </SettingsProvider>
            </body>
        </html>
    )
}
