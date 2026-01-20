"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Users,
    BookOpen,
    DollarSign,
    GraduationCap,
    UserPlus,
    BarChart3,
    Settings,
} from "lucide-react";

export default function DashboardPage() {
    const { profile } = useAuth();
    const router = useRouter();

    const modules = [
        {
            title: "Penerimaan Santri Baru",
            description: "Kelola pendaftaran santri baru",
            icon: UserPlus,
            color: "from-emerald-500 to-emerald-600",
            path: "/dashboard/psb",
        },
        {
            title: "Data Santri",
            description: "Manajemen data santri",
            icon: Users,
            color: "from-purple-500 to-purple-600",
            path: "/dashboard/santri",
        },
        {
            title: "Akademik",
            description: "Sistem pembelajaran dan nilai",
            icon: GraduationCap,
            color: "from-indigo-500 to-indigo-600",
            path: "/dashboard/akademik",
        },
        {
            title: "Keuangan",
            description: "Pembayaran dan laporan keuangan",
            icon: DollarSign,
            color: "from-amber-500 to-amber-600",
            path: "/dashboard/keuangan",
        },
        {
            title: "Perpustakaan",
            description: "Manajemen buku dan peminjaman",
            icon: BookOpen,
            color: "from-teal-500 to-teal-600",
            path: "/dashboard/perpustakaan",
        },
        {
            title: "Laporan",
            description: "Dashboard dan analitik",
            icon: BarChart3,
            color: "from-rose-500 to-rose-600",
            path: "/dashboard/laporan",
        },
        {
            title: "Manajemen User",
            description: "Kelola pengguna dan hak akses",
            icon: Settings,
            color: "from-slate-500 to-slate-600",
            path: "/dashboard/users",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div>
                <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">
                    Selamat Datang, {profile?.full_name?.split(' ')[0] || 'Admin'}!
                </h2>
                <p className="text-slate-600">
                    Kelola sistem manajemen pesantren Anda dengan mudah dan efisien.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-slate-600">Total Santri</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-slate-900">0</p>
                        <p className="text-xs text-slate-500 mt-1">Data akan segera tersedia</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-slate-600">Pendaftar Baru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-slate-900">0</p>
                        <p className="text-xs text-slate-500 mt-1">Bulan ini</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-slate-600">Pengguna Aktif</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-slate-900">2</p>
                        <p className="text-xs text-slate-500 mt-1">Terdaftar di sistem</p>
                    </CardContent>
                </Card>
            </div>

            {/* Modules Grid */}
            <div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-4">
                    Modul Sistem
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module) => {
                        const Icon = module.icon;
                        return (
                            <Card
                                key={module.path}
                                className="hover:shadow-lg transition-all cursor-pointer group"
                                onClick={() => router.push(module.path)}
                            >
                                <CardHeader>
                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <CardTitle className="text-lg">{module.title}</CardTitle>
                                    <CardDescription>{module.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
