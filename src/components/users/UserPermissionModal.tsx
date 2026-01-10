"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { X, ShieldCheck, CheckSquare, Square } from "lucide-react"
import { cn } from "@/lib/utils"

// Central Module Registry
const MODULE_REGISTRY = [
    { slug: 'keuangan', name: 'Keuangan', description: 'Tabungan, SPP, & Pembayaran' },
    { slug: 'akademik', name: 'Akademik', description: 'Kurikulum & Data Nilai' },
    { slug: 'donasi', name: 'Donasi', description: 'Manajemen Donatur & Infaq' },
    { slug: 'inventory', name: 'Inventory', description: 'Aset & Inventaris Pondok' },
    { slug: 'kesehatan', name: 'Kesehatan', description: 'Catatan Medis Santri' },
]

export default function UserPermissionModal({ user, onClose, onSuccess }: any) {
    const [permissions, setPermissions] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        if (user) {
            async function fetchUserPermissions() {
                setLoading(true)
                const { data } = await supabase
                    .from('user_permissions')
                    .select('permissions(slug)')
                    .eq('user_id', user.id)

                if (data) {
                    setPermissions(data.map((p: any) => p.permissions.slug))
                } else {
                    setPermissions([])
                }
                setLoading(false)
            }
            fetchUserPermissions()
        }
    }, [user])

    const togglePermission = (slug: string) => {
        setPermissions(prev =>
            prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
        )
    }

    const handleSave = async () => {
        if (!user) return
        setSaving(true)

        // 1. Delete existing
        await supabase.from('user_permissions').delete().eq('user_id', user.id)

        // 2. Get permission IDs for the slugs
        const { data: permRecords } = await supabase
            .from('permissions')
            .select('id, slug')
            .in('slug', permissions)

        if (permRecords && permRecords.length > 0) {
            // 3. Insert new
            const toInsert = permRecords.map(p => ({
                user_id: user.id,
                permission_id: p.id
            }))
            await supabase.from('user_permissions').insert(toInsert)
        }

        setSaving(false)
        onSuccess()
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <Card className="w-full max-w-2xl glass-card relative overflow-hidden flex flex-col max-h-[90vh] border-slate-200/80 shadow-xl">
                <button onClick={onClose} className="absolute top-4 right-4 z-10 text-slate-500 hover:text-slate-700 transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
                    <h2 className="text-xl font-display font-bold">Atur Hak Akses</h2>
                    <p className="text-emerald-50 text-xs mt-1">Kelola akses modul untuk {user?.full_name || 'User'}</p>
                </CardHeader>

                <CardContent className="overflow-y-auto flex-1 bg-white">
                    {loading ? (
                        <div className="flex items-center justify-center py-10">
                            <div className="animate-spin w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {MODULE_REGISTRY.map((mod) => {
                                const isChecked = permissions.includes(mod.slug)
                                return (
                                    <button
                                        key={mod.slug}
                                        onClick={() => togglePermission(mod.slug)}
                                        className={cn(
                                            "flex items-start gap-3 p-4 rounded-lg border-2 transition-all text-left group shadow-sm",
                                            isChecked
                                                ? "bg-amber-50 border-amber-300 text-slate-900 hover:bg-amber-100"
                                                : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                                        )}
                                    >
                                        <div className="mt-0.5">
                                            {isChecked
                                                ? <CheckSquare className="w-5 h-5 text-amber-600" />
                                                : <Square className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                                            }
                                        </div>
                                        <div className="flex-1">
                                            <p className={cn("text-sm font-semibold mb-1", isChecked ? "text-amber-900" : "text-slate-900")}>
                                                {mod.name}
                                            </p>
                                            <p className="text-xs text-slate-600 leading-relaxed">{mod.description}</p>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </CardContent>

                <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose} className="text-slate-700 hover:text-slate-900 hover:bg-slate-100">Batal</Button>
                    <Button variant="gold" onClick={handleSave} disabled={saving || loading}>
                        {saving ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                </div>
            </Card>
        </div>
    )
}
