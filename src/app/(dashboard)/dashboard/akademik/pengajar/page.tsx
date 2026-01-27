import Link from "next/link"
import { Plus, Search, Filter, MoreHorizontal, Mail, Phone } from "lucide-react"

export default function InstructorsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-slate-900">Daftar Pengajar</h1>
                    <p className="text-slate-500">Manajemen asatidz dan staf pengajar.</p>
                </div>
                <Link href="/dashboard/akademik/pengajar/baru" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Tambah Pengajar
                </Link>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Cari nama pengajar atau NIP..." className="pl-10 pr-4 py-2 w-full text-sm bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-blue-100 transition" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-start gap-4 hover:shadow-md transition">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-900 truncate">Ustadz Abdullah {i}</h3>
                            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">Fiqih & Tafsir</p>
                            <div className="flex flex-col gap-1 text-sm text-slate-500">
                                <span className="flex items-center gap-2"><Mail className="w-3 h-3" /> email@example.com</span>
                                <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> +62 812 3456 7890</span>
                            </div>
                        </div>
                        <button className="text-slate-300 hover:text-slate-600">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
