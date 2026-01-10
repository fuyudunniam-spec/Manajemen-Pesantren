"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { X } from "lucide-react"

export default function UserModal({ roles, onClose, onSuccess }: any) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [localRoles, setLocalRoles] = useState<any[]>(roles || [])
    const [loadingRoles, setLoadingRoles] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    // Fetch roles if not provided or empty
    useEffect(() => {
        async function loadRoles() {
            if (!roles || roles.length === 0) {
                setLoadingRoles(true)
                try {
                    const { data: roleData, error: roleError } = await supabase
                        .from('roles')
                        .select('id, name, slug, description')
                        .order('created_at', { ascending: true })

                    if (roleError) {
                        console.error('Error fetching roles in modal:', roleError)
                        setError('Gagal memuat daftar role. Silakan refresh halaman.')
                        setLocalRoles([])
                    } else {
                        console.log('Roles loaded in modal:', roleData)
                        setLocalRoles(roleData || [])
                        setError(null)
                    }
                } catch (err) {
                    console.error('Exception fetching roles:', err)
                    setError('Terjadi kesalahan saat memuat role.')
                    setLocalRoles([])
                } finally {
                    setLoadingRoles(false)
                }
            } else {
                setLocalRoles(roles)
            }
        }
        loadRoles()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = (formData.get('email') as string)?.trim().toLowerCase()
        const password = formData.get('password') as string
        const fullName = (formData.get('fullName') as string)?.trim()
        const roleId = formData.get('roleId') as string

        // Validation
        if (!email || !email.includes('@')) {
            setError("Email tidak valid. Pastikan format email benar (contoh: user@example.com)")
            setLoading(false)
            return
        }

        if (!password || password.length < 6) {
            setError("Password minimal 6 karakter")
            setLoading(false)
            return
        }

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
            // 1. Create user in Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                    emailRedirectTo: undefined // Disable email confirmation for admin-created users
                }
            })

            if (authError) {
                console.error("Auth Error:", authError)

                // Better error messages
                if (authError.message.includes('invalid') || authError.message.includes('Email address')) {
                    setError("Format email tidak valid. Pastikan email menggunakan format yang benar (contoh: user@example.com)")
                } else if (authError.message.includes('already registered') || authError.message.includes('already exists')) {
                    setError("Email ini sudah terdaftar. Gunakan email lain.")
                } else if (authError.message.includes('password')) {
                    setError("Password tidak memenuhi syarat. Minimal 6 karakter.")
                } else {
                    setError(authError.message || "Gagal membuat user. Silakan coba lagi.")
                }
                setLoading(false)
                return
            }

            if (authData.user) {
                // 2. Create profile entry
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: authData.user.id,
                        full_name: fullName,
                        role_id: roleId,
                        is_active: true
                    })

                if (profileError) {
                    console.error("Profile Error:", profileError)
                    setError("Gagal membuat profil: " + profileError.message)
                    setLoading(false)
                    return
                }

                onSuccess()
                onClose()
            } else {
                setError("Gagal membuat user. User mungkin perlu konfirmasi email terlebih dahulu.")
                setLoading(false)
            }
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
                    <h2 className="text-xl font-display font-bold">Tambah User Baru</h2>
                    <p className="text-emerald-50 text-xs mt-1">Daftarkan personil baru ke sistem e-Maktab</p>
                </CardHeader>

                <CardContent className="bg-white">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Nama Lengkap</label>
                            <Input
                                name="fullName"
                                placeholder="Contoh: Ahmad Fauzan"
                                required
                                className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-emerald-600/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Email</label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="email@example.com"
                                required
                                className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-emerald-600/20"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Role</label>
                                <div className="relative">
                                    <select
                                        name="roleId"
                                        className="w-full h-11 bg-white border border-slate-300 rounded-lg px-4 pr-10 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 appearance-none cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        required
                                        disabled={loadingRoles}
                                    >
                                        <option value="" className="text-slate-500">
                                            {loadingRoles ? 'Memuat role...' : 'Pilih Role'}
                                        </option>
                                        {localRoles && localRoles.length > 0 ? (
                                            localRoles.map((role: any) => (
                                                <option key={role.id} value={role.id} className="text-slate-900">
                                                    {role.name}
                                                </option>
                                            ))
                                        ) : (
                                            !loadingRoles && (
                                                <option value="" disabled className="text-slate-500">
                                                    Tidak ada role tersedia
                                                </option>
                                            )
                                        )}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </div>
                                </div>
                                {loadingRoles && (
                                    <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                                        <span className="animate-spin inline-block w-3 h-3 border border-amber-600 border-t-transparent rounded-full"></span>
                                        Memuat daftar role...
                                    </p>
                                )}
                                {!loadingRoles && (!localRoles || localRoles.length === 0) && (
                                    <p className="text-xs text-red-600 mt-1">⚠️ Tidak ada role tersedia. Pastikan RLS policy sudah dikonfigurasi.</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Password</label>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-emerald-600/20"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                            <Button type="button" variant="ghost" onClick={onClose} className="text-slate-700 hover:text-slate-900 hover:bg-slate-100">Batal</Button>
                            <Button type="submit" variant="gold" disabled={loading || loadingRoles || !localRoles || localRoles.length === 0}>
                                {loading ? "Menyimpan..." : "Simpan User"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
