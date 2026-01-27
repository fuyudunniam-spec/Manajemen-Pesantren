import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { BookOpen, Users, GraduationCap, ArrowRight, UserCheck } from "lucide-react"

export default async function AcademyDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-display font-bold text-slate-900">Akademi Isyraq Annur</h1>
                    <p className="text-slate-500">Overview manajemen pendidikan dan kurikulum.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
                <Link href="/dashboard/akademik/kelas" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition group">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Kelas</p>
                    <h3 className="text-3xl font-display font-bold text-slate-900 mt-1">12</h3>
                </Link>
                <Link href="/dashboard/akademik/santri" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition group">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Santri</p>
                    <h3 className="text-3xl font-display font-bold text-slate-900 mt-1">1,250</h3>
                </Link>
                <Link href="/dashboard/akademik/pengajar" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition group">
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-4 group-hover:bg-amber-600 group-hover:text-white transition">
                        <UserCheck className="w-6 h-6" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Pengajar</p>
                    <h3 className="text-3xl font-display font-bold text-slate-900 mt-1">45</h3>
                </Link>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                        <Users className="w-6 h-6" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Alumni</p>
                    <h3 className="text-3xl font-display font-bold text-slate-900 mt-1">850</h3>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-500" />
                        Kelas Terbaru
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-400 font-bold border border-slate-100">
                                        AR
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Bahasa Arab Dasar {i}</h4>
                                        <p className="text-xs text-slate-500">Ustadz Hanif • 24 Modul</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-md">Aktif</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                        <Link href="/dashboard/akademik/kelas" className="flex items-center justify-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">
                            Kelola Semua Kelas <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-emerald-500" />
                        Pendaftaran Santri Baru
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Ahmad Fulan {i}</h4>
                                        <p className="text-xs text-slate-500">Program Takhassus</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-md">Pending</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                        <Link href="/dashboard/akademik/santri" className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700">
                            Lihat Semua Data <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
