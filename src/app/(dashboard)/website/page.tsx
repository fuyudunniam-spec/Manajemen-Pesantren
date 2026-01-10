import { Metadata } from 'next';
import { Globe, FileText, Layout, Palette, BookText, Tag } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Manajemen Website | e-Maktab',
    description: 'Kelola konten dan tampilan website',
};

const websiteMenus = [
    {
        title: 'Pengaturan Website',
        description: 'Kelola identitas, logo, dan konfigurasi dasar website',
        href: '/dashboard/website/settings',
        icon: Globe,
        color: 'from-emerald-500 to-emerald-600',
    },
    {
        title: 'Blog & Artikel',
        description: 'Tulis dan kelola artikel serta berita pesantren',
        href: '/dashboard/website/blog',
        icon: BookText,
        color: 'from-blue-500 to-blue-600',
    },
    {
        title: 'Kategori Artikel',
        description: 'Kelola kategori untuk mengorganisir artikel',
        href: '/dashboard/website/categories',
        icon: Tag,
        color: 'from-purple-500 to-purple-600',
    },
    {
        title: 'Halaman Statis',
        description: 'Buat dan edit halaman seperti Profil, Kontak, dll',
        href: '/dashboard/website/pages',
        icon: FileText,
        color: 'from-cyan-500 to-cyan-600',
    },
    {
        title: 'Visual Page Builder',
        description: 'Atur section dan konten website dengan drag & drop',
        href: '/dashboard/website/builder',
        icon: Layout,
        color: 'from-violet-500 to-violet-600',
    },
    {
        title: 'Theme Customizer',
        description: 'Sesuaikan warna, font, dan gaya visual website',
        href: '/dashboard/website/theme',
        icon: Palette,
        color: 'from-amber-500 to-amber-600',
    },
];

export default function WebsiteManagementPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold text-slate-900">
                    Manajemen Website
                </h1>
                <p className="text-slate-500 mt-1">
                    Kelola seluruh aspek website publik e-Maktab
                </p>
            </div>

            {/* Menu Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {websiteMenus.map((menu) => {
                    const Icon = menu.icon;
                    return (
                        <Link key={menu.href} href={menu.href}>
                            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                                <CardHeader>
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${menu.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                                        >
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="group-hover:text-emerald-600 transition-colors">
                                                {menu.title}
                                            </CardTitle>
                                            <CardDescription className="mt-1.5">
                                                {menu.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                    );
                })}
            </div>

            {/* Quick Stats */}
            <Card>
                <CardHeader>
                    <CardTitle>Informasi</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-emerald-600">Real-time</span>
                            <span className="text-sm text-muted-foreground">
                                Perubahan langsung muncul di website publik
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-emerald-600">Autosave</span>
                            <span className="text-sm text-muted-foreground">
                                Draft otomatis tersimpan setiap 30 detik
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-emerald-600">Preview</span>
                            <span className="text-sm text-muted-foreground">
                                Lihat tampilan sebelum publish
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
