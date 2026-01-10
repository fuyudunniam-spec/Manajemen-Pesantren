"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, ShieldCheck, CheckSquare, Square } from "lucide-react"

// Central Module Registry
export const MODULE_REGISTRY = [
    { slug: 'keuangan', name: 'Keuangan', description: 'Tabungan, SPP, & Pembayaran' },
    { slug: 'akademik', name: 'Akademik', description: 'Kurikulum & Data Nilai' },
    { slug: 'donasi', name: 'Donasi', description: 'Manajemen Donatur & Infaq' },
    { slug: 'inventory', name: 'Inventory', description: 'Aset & Inventaris Pondok' },
    { slug: 'kesehatan', name: 'Kesehatan', description: 'Catatan Medis Santri' },
]

export default function OperatorSettingsPage() {
    const [operators, setOperators] = useState<any[]>([])
    const [selectedOperator, setSelectedOperator] = useState<any>(null)
    const [permissions, setPermissions] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        async function fetchData() {
            // Get all users with Operator role
            const { data: users } = await supabase
                .from('profiles')
                .select('*, roles!inner(*)')
                .eq('roles.slug', 'operator')

            if (users) setOperators(users)
            setLoading(false)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (selectedOperator) {
            async function fetchUserPermissions() {
                const { data } = await supabase
                    .from('user_permissions')
                    .select('permissions(slug)')
                    .eq('user_id', selectedOperator.id)

                if (data) {
                    setPermissions(data.map((p: any) => p.permissions.slug))
                } else {
                    setPermissions([])
                }
            }
            fetchUserPermissions()
        }
    }, [selectedOperator])

    const togglePermission = (slug: string) => {
        setPermissions(prev =>
            prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
        )
    }

    const handleSave = async () => {
        if (!selectedOperator) return
        setSaving(true)

        // 1. Delete existing
        await supabase.from('user_permissions').delete().eq('user_id', selectedOperator.id)

        // 2. Get permission IDs for the slugs
        const { data: permRecords } = await supabase
            .from('permissions')
            .select('id, slug')
            .in('slug', permissions)

        if (permRecords && permRecords.length > 0) {
            // 3. Insert new
            const toInsert = permRecords.map(p => ({
                user_id: selectedOperator.id,
                permission_id: p.id
            }))
            await supabase.from('user_permissions').insert(toInsert)
        }

        setSaving(false)
        alert("Permissions updated successfully!")
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-display font-bold text-white">Settings Operator</h1>
                <p className="text-white/50">Atur hak akses modul untuk setiap personil Operator</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Operator List */}
                <Card className="glass-card">
                    <CardHeader>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest">Daftar Operator</h3>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            {operators.map((op) => (
                                <button
                                    key={op.id}
                                    onClick={() => setSelectedOperator(op)}
                                    className={cn(
                                        "w-full text-left p-4 transition-colors hover:bg-white/5 flex items-center gap-3",
                                        selectedOperator?.id === op.id ? "bg-white/10 border-r-2 border-gold-400" : ""
                                    )}
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs uppercase">
                                        {op.full_name?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{op.full_name}</p>
                                        <p className="text-[10px] text-white/40">{op.email}</p>
                                    </div>
                                </button>
                            ))}
                            {operators.length === 0 && !loading && (
                                <p className="p-4 text-xs italic text-white/30 text-center">Belum ada user Operator.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Permission Grid */}
                <Card className="lg:col-span-2 glass-card">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Akses Modul</h3>
                            {selectedOperator && (
                                <p className="text-xs text-gold-400 mt-1">Mengatur: {selectedOperator.full_name}</p>
                            )}
                        </div>
                        <Button
                            variant="gold"
                            size="sm"
                            onClick={handleSave}
                            disabled={!selectedOperator || saving}
                        >
                            {saving ? "Menyimpan..." : "Simpan Perubahan"}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {!selectedOperator ? (
                            <div className="flex flex-col items-center justify-center py-20 text-white/20">
                                <ShieldCheck className="w-16 h-16 mb-4 opacity-5" />
                                <p>Pilih operator untuk mengatur hak akses</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {MODULE_REGISTRY.map((mod) => {
                                    const isChecked = permissions.includes(mod.slug)
                                    return (
                                        <button
                                            key={mod.slug}
                                            onClick={() => togglePermission(mod.slug)}
                                            className={cn(
                                                "flex items-start gap-4 p-4 rounded-xl border transition-all text-left group",
                                                isChecked
                                                    ? "bg-gold-500/10 border-gold-400/30 text-white"
                                                    : "bg-white/5 border-white/5 text-white/50 hover:border-white/20"
                                            )}
                                        >
                                            <div className="mt-1">
                                                {isChecked
                                                    ? <CheckSquare className="w-5 h-5 text-gold-400" />
                                                    : <Square className="w-5 h-5 text-white/10 group-hover:text-white/30" />
                                                }
                                            </div>
                                            <div>
                                                <p className={cn("text-sm font-bold", isChecked ? "text-gold-400" : "text-white")}>
                                                    {mod.name}
                                                </p>
                                                <p className="text-[10px] leading-relaxed mt-1">{mod.description}</p>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}
