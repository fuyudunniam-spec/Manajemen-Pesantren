import Link from "next/link"
import { Plus, Search, Filter, MoreHorizontal, Download } from "lucide-react"

export default function StudentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-slate-900">Data Santri</h1>
                    <p className="text-slate-500">Monitoring akademik dan data santri.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition flex items-center gap-2">
                        <Download className="w-4 h-4" /> Export
                    </button>
                    <Link href="/dashboard/akademik/santri/baru" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Santri Baru
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Cari santri..." className="pl-9 pr-4 py-2 text-sm bg-slate-50 rounded-lg w-full focus:outline-none" />
                    </div>
                    <button className="px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">Nama Santri</th>
                                <th className="px-6 py-4">NIS</th>
                                <th className="px-6 py-4">Program</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Hafalan</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition">
                                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200" />
                                        Ahmad Fulan {i}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">202400{i}</td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold uppercase">Takhassus</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Aktif
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">5 Juz</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-slate-600">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-center">
                    <button className="text-sm font-bold text-slate-500 hover:text-slate-800">Muat Lebih Banyak</button>
                </div>
            </div>
        </div>
    )
}
