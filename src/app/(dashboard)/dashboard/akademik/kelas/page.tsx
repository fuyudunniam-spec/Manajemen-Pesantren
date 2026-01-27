import Link from "next/link"
import { Plus, Search, Filter, MoreVertical, BookOpen } from "lucide-react"
import { client } from "@/lib/sanity"

export default async function ClassesPage() {
    let classes = [];
    try {
        classes = await client.fetch(`*[_type == "academyClass"] {
            _id,
            title,
            description,
            level,
            duration,
            instructor->{ name },
            content { modules }
        }`);
    } catch (error) {
        console.error("Failed to fetch classes:", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-slate-900">Manajemen Kelas</h1>
                    <p className="text-slate-500">Kelola kurikulum dan jadwal mata pelajaran.</p>
                </div>
                <Link href="/dashboard/akademik/kelas/baru" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Buat Kelas Baru
                </Link>
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center bg-white p-2 rounded-xl border border-slate-100 shadow-sm w-full md:w-fit">
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Cari kelas..." className="pl-9 pr-4 py-2 text-sm bg-transparent focus:outline-none w-full md:w-64" />
                </div>
                <div className="h-6 w-px bg-slate-200"></div>
                <button className="px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-slate-900 transition">
                    <Filter className="w-4 h-4" />
                </button>
            </div>

            {/* Classes Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {classes.length > 0 ? (
                    classes.map((c: any) => (
                        <div key={c._id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition">
                            <div className="h-32 bg-slate-100 relative">
                                <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                    <BookOpen className="w-12 h-12 opacity-50" />
                                </div>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg px-2 py-1 text-xs font-bold text-slate-600 shadow-sm">
                                    {c.level || 'Beginner'}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-slate-900 mb-1">{c.title}</h3>
                                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{c.description || 'Tidak ada deskripsi.'}</p>

                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-6 h-6 rounded-full bg-slate-200" />
                                    <span className="text-xs font-medium text-slate-600">{c.instructor?.name || 'Belum ada pengajar'}</span>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <div className="text-xs text-slate-500">
                                        <strong className="text-slate-900">{c.content?.modules?.length || 0}</strong> Modul
                                    </div>
                                    <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        Belum ada data kelas yang ditemukan.
                    </div>
                )}
            </div>
        </div>
    )
}
