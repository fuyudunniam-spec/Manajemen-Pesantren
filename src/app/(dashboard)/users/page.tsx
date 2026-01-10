"use client"

import { useEffect, useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserPlus, Search, Filter, MoreVertical, Key, Edit, Power, PowerOff, Trash2 } from "lucide-react"
import UserModal from "@/components/users/UserModal"
import EditUserModal from "@/components/users/EditUserModal"
import UserPermissionModal from "@/components/users/UserPermissionModal"

export default function UsersPage() {
    const [profiles, setProfiles] = useState<any[]>([])
    const [roles, setRoles] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedUserForEdit, setSelectedUserForEdit] = useState<any>(null)
    const [selectedUserForPermissions, setSelectedUserForPermissions] = useState<any>(null)
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
    const supabase = createClient()

    async function fetchData() {
        setLoading(true)
        try {
            // Fetch Profiles
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*, roles(*)')
                .order('created_at', { ascending: false })

            if (profileError) {
                console.error('Error fetching profiles:', profileError)
            } else {
                setProfiles(profileData || [])
            }

            // Fetch Roles - Critical for dropdown
            const { data: roleData, error: roleError } = await supabase
                .from('roles')
                .select('id, name, slug, description')
                .order('created_at', { ascending: true })

            if (roleError) {
                console.error('Error fetching roles:', roleError)
                console.error('Role error details:', JSON.stringify(roleError, null, 2))
                setRoles([])
            } else {
                console.log('Roles fetched successfully:', roleData)
                setRoles(roleData || [])
            }
        } catch (error) {
            console.error('Error in fetchData:', error)
        } finally {
            setLoading(false)
        }
    }

    // Fetch roles separately when modal opens to ensure fresh data
    async function fetchRoles() {
        const { data: roleData, error: roleError } = await supabase
            .from('roles')
            .select('id, name, slug, description')
            .order('created_at', { ascending: true })

        if (roleError) {
            console.error('Error fetching roles:', roleError)
            return []
        }
        return roleData || []
    }

    useEffect(() => {
        fetchData()
    }, [])

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            Object.keys(dropdownRefs.current).forEach(key => {
                const ref = dropdownRefs.current[key]
                if (ref && !ref.contains(event.target as Node)) {
                    setOpenDropdownId(null)
                }
            })
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    async function toggleUserStatus(profile: any) {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    is_active: !profile.is_active,
                    updated_at: new Date().toISOString()
                })
                .eq('id', profile.id)

            if (error) {
                console.error('Error toggling user status:', error)
                alert('Gagal mengubah status user: ' + error.message)
            } else {
                fetchData()
                setOpenDropdownId(null)
            }
        } catch (err) {
            console.error('Exception toggling user status:', err)
            alert('Terjadi kesalahan saat mengubah status user')
        }
    }

    async function handleDeleteUser(profile: any) {
        if (!confirm(`Apakah Anda yakin ingin menghapus user "${profile.full_name}"?`)) {
            return
        }

        try {
            // Note: In production, you might want to soft delete or use admin API
            // For now, we'll just update is_active to false
            const { error } = await supabase
                .from('profiles')
                .update({
                    is_active: false,
                    updated_at: new Date().toISOString()
                })
                .eq('id', profile.id)

            if (error) {
                console.error('Error deleting user:', error)
                alert('Gagal menghapus user: ' + error.message)
            } else {
                fetchData()
                setOpenDropdownId(null)
            }
        } catch (err) {
            console.error('Exception deleting user:', err)
            alert('Terjadi kesalahan saat menghapus user')
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900">Manajemen User</h1>
                    <p className="text-slate-600 mt-1">Kelola role dan izin akses semua pengguna e-Maktab</p>
                </div>
                <Button
                    variant="gold"
                    className="gap-2"
                    onClick={async () => {
                        // Ensure roles are loaded before opening modal
                        if (roles.length === 0) {
                            const freshRoles = await fetchRoles()
                            setRoles(freshRoles)
                        }
                        setIsModalOpen(true)
                    }}
                >
                    <UserPlus className="w-4 h-4" />
                    <span>User Baru</span>
                </Button>
            </div>

            <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Cari nama, email, atau ID Santri..."
                            className="w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-slate-900 placeholder:text-slate-500 shadow-sm"
                        />
                    </div>
                    <Button variant="ghost" className="gap-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Santri ID</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Tgl Dibuat</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {loading ? (
                                    [1, 2, 3].map(i => (
                                        <tr key={i} className="animate-pulse">
                                            <td colSpan={6} className="px-6 py-8 text-center text-slate-500">Memuat data...</td>
                                        </tr>
                                    ))
                                ) : profiles.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">Belum ada user terdaftar.</td>
                                    </tr>
                                ) : (
                                    profiles.map((profile) => (
                                        <tr key={profile.id} className={`hover:bg-slate-50/80 transition-colors group ${!profile.is_active ? 'opacity-60' : ''}`}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm text-white shadow-sm ring-2 ${profile.is_active
                                                            ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 ring-emerald-100'
                                                            : 'bg-gradient-to-br from-slate-400 to-slate-500 ring-slate-200'
                                                        }`}>
                                                        {profile.full_name?.charAt(0) || '?'}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900">{profile.full_name || 'N/A'}</p>
                                                        <p className="text-xs text-slate-500 font-mono">{profile.id.slice(0, 8)}...</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border",
                                                    profile.roles?.slug === 'superadmin' ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
                                                        profile.roles?.slug === 'operator' ? "bg-amber-50 text-amber-700 border-amber-200" :
                                                            profile.roles?.slug === 'pengajar' ? "bg-blue-50 text-blue-700 border-blue-200" :
                                                                profile.roles?.slug === 'santri' ? "bg-slate-100 text-slate-700 border-slate-200" :
                                                                    "bg-slate-50 text-slate-600 border-slate-200"
                                                )}>
                                                    {profile.roles?.name || 'Tidak ada role'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border",
                                                    profile.is_active
                                                        ? "bg-green-50 text-green-700 border-green-200"
                                                        : "bg-red-50 text-red-700 border-red-200"
                                                )}>
                                                    {profile.is_active ? 'Aktif' : 'Nonaktif'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-mono text-slate-700">
                                                    {profile.santri_id || <span className="text-slate-400">-</span>}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs text-slate-600">
                                                    {new Date(profile.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2 relative">
                                                    {profile.roles?.slug === 'operator' && (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedUserForPermissions(profile)
                                                                setOpenDropdownId(null)
                                                            }}
                                                            className="p-2 text-slate-600 hover:text-amber-600 transition-colors bg-white rounded-lg border border-slate-200 hover:border-amber-300 hover:bg-amber-50 shadow-sm"
                                                            title="Atur Hak Akses"
                                                        >
                                                            <Key className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <div className="relative" ref={el => { dropdownRefs.current[profile.id] = el }}>
                                                        <button
                                                            onClick={() => setOpenDropdownId(openDropdownId === profile.id ? null : profile.id)}
                                                            className="p-2 text-slate-600 hover:text-emerald-700 transition-colors bg-white rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 shadow-sm"
                                                        >
                                                            <MoreVertical className="w-4 h-4" />
                                                        </button>
                                                        {openDropdownId === profile.id && (
                                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-10 overflow-hidden">
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedUserForEdit(profile)
                                                                        setOpenDropdownId(null)
                                                                    }}
                                                                    className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                    Edit User
                                                                </button>
                                                                <button
                                                                    onClick={() => toggleUserStatus(profile)}
                                                                    className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                                                >
                                                                    {profile.is_active ? (
                                                                        <>
                                                                            <PowerOff className="w-4 h-4" />
                                                                            Nonaktifkan
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Power className="w-4 h-4" />
                                                                            Aktifkan
                                                                        </>
                                                                    )}
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteUser(profile)}
                                                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                    Hapus
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {isModalOpen && (
                <UserModal
                    roles={roles}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={fetchData}
                />
            )}

            {selectedUserForEdit && (
                <EditUserModal
                    user={selectedUserForEdit}
                    roles={roles}
                    onClose={() => setSelectedUserForEdit(null)}
                    onSuccess={fetchData}
                />
            )}

            {selectedUserForPermissions && (
                <UserPermissionModal
                    user={selectedUserForPermissions}
                    onClose={() => setSelectedUserForPermissions(null)}
                    onSuccess={fetchData}
                />
            )}
        </div>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}
