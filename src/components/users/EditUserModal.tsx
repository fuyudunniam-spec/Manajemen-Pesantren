"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { X } from "lucide-react"

export default function EditUserModal({ user, roles, onClose, onSuccess }: any) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [localRoles, setLocalRoles] = useState<any[]>(roles || [])
    const supabase = createClient()

    useEffect(() => {
        if (roles && roles.length > 0) {
            setLocalRoles(roles)
        }
    }, [roles])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const fullName = (formData.get('fullName') as string)?.trim()
        const roleId = formData.get('roleId') as string

        if (!fullName || fullName.length < 2) {
            setError("Nama lengkap minimal 2 karakter")
            setLoading(false)
            return
        }

        if (!roleId) {
            setError("Silakan pilih role untuk user ini.")
            setLoading(false)
            return
        }

        try {
            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    full_name: fullName,
                    role_id: roleId,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id)

            if (updateError) {
                console.error("Update Error:", updateError)
                setError("Gagal mengupdate user: " + updateError.message)
                setLoading(false)
                return
            }

            onSuccess()
            onClose()
        } catch (err: any) {
            console.error("Exception in handleSubmit:", err)
            setError(err.message || "Terjadi kesalahan. Silakan coba lagi.")
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <Card className="w-full max-w-lg glass-card relative overflow-hidden border-slate-200/80 shadow-xl">
                <button onClick={onClose} className="absolute top-4 right-4 z-10 text-slate-500 hover:text-slate-700 transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
                    <h2 className="text-xl font-display font-bold">Edit User</h2>
                    <p className="text-emerald-50 text-xs mt-1">Ubah informasi user {user?.full_name || ''}</p>
                </CardHeader>

                <CardContent className="bg-white">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Nama Lengkap</label>
                            <Input
                                name="fullName"
                                defaultValue={user?.full_name || ''}
                                placeholder="Contoh: Ahmad Fauzan"
                                required
                                className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-emerald-600/20"
                            />
                        </div>


                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Role</label>
                            <div className="relative">
                                <select
                                    name="roleId"
                                    defaultValue={user?.role_id || ''}
                                    className="w-full h-11 bg-white border border-slate-300 rounded-lg px-4 pr-10 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 appearance-none cursor-pointer shadow-sm"
                                    required
                                >
                                    <option value="" className="text-slate-500">Pilih Role</option>
                                    {localRoles && localRoles.length > 0 ? (
                                        localRoles.map((role: any) => (
                                            <option key={role.id} value={role.id} className="text-slate-900">
                                                {role.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled className="text-slate-500">Tidak ada role tersedia</option>
                                    )}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                            <Button type="button" variant="ghost" onClick={onClose} className="text-slate-700 hover:text-slate-900 hover:bg-slate-100">Batal</Button>
                            <Button type="submit" variant="gold" disabled={loading}>
                                {loading ? "Menyimpan..." : "Simpan Perubahan"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

