"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
    LayoutDashboard,
    Users,
    Wallet,
    GraduationCap,
    Heart,
    Settings,
    LogOut,
    Menu,
    ChevronLeft,
    Globe,
    Edit3,
} from "lucide-react"

const MENU_ITEMS = [
    { name: 'Dashboard', slug: 'dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Manajemen User', slug: 'users', icon: Users, path: '/dashboard/users', role: ['superadmin'] },
    { name: 'Keuangan', slug: 'keuangan', icon: Wallet, path: '/dashboard/keuangan' },
    { name: 'Akademik', slug: 'akademik', icon: GraduationCap, path: '/dashboard/akademik' },
    { name: 'Donasi', slug: 'donasi', icon: Heart, path: '/dashboard/donasi' },
]

export default function Sidebar({ user, profile, permissions }: any) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()
    const userRole = profile?.roles?.slug?.toLowerCase() || ''
    const isSuperadmin = userRole === 'superadmin' || user?.email === 'superadmin@gmail.com'

    const filteredMenu = MENU_ITEMS.filter(item => {
        if (isSuperadmin) return true
        if (item.role && !item.role.includes(userRole)) return false
        if (item.slug === 'dashboard') return true
        return permissions.some((p: any) => p.slug === item.slug)
    })



    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <aside
            className={cn(
                "glass-sidebar hidden lg:flex flex-col h-screen sticky top-0 z-20 transition-all duration-300 ease-in-out",
                isCollapsed ? "w-20" : "w-72"
            )}
        >
            <div className="p-6 flex items-center justify-between">
                <div className={cn("flex items-center gap-3 overflow-hidden transition-all", isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex-shrink-0 flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <span className="text-white font-display font-bold text-lg">M</span>
                    </div>
                    <div className="whitespace-nowrap">
                        <h2 className="text-xl font-display font-bold text-slate-800 leading-tight">e-Maktab</h2>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Pesantren Modern</p>
                    </div>
                </div>

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                >
                    {isCollapsed ? <Menu className="w-6 h-6" /> : <ChevronLeft className="w-5 h-5" />}
                </button>
            </div>

            <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto overflow-x-hidden">
                {filteredMenu.map((item) => {
                    const isActive = pathname === item.path || pathname.startsWith(item.path + '/')

                    return (
                        <Link
                            key={item.slug}
                            href={item.path}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                                isActive
                                    ? "bg-blue-50 text-blue-700 font-bold shadow-sm"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
                                isCollapsed ? "justify-center" : ""
                            )}
                            title={isCollapsed ? item.name : undefined}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 flex-shrink-0 transition-colors",
                                isActive ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500"
                            )} />

                            {!isCollapsed && (
                                <span>{item.name}</span>
                            )}

                            {isActive && !isCollapsed && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                            )}
                        </Link>
                    )
                })}

                {/* Section Website */}
                <div className="pt-4 mt-4 border-t border-slate-100/60">
                    {!isCollapsed && (
                        <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Website</p>
                    )}
                    <Link
                        href="http://localhost:4321"
                        target="_blank"
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all group",
                            isCollapsed ? "justify-center" : ""
                        )}
                        title={isCollapsed ? "Lihat Website" : undefined}
                    >
                        <Globe className="w-5 h-5 flex-shrink-0 text-slate-400 group-hover:text-emerald-500" />
                        {!isCollapsed && <span>Lihat Website</span>}
                    </Link>
                    <Link
                        href="http://localhost:3333"
                        target="_blank"
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-all group",
                            isCollapsed ? "justify-center" : ""
                        )}
                        title={isCollapsed ? "Edit Konten" : undefined}
                    >
                        <Edit3 className="w-5 h-5 flex-shrink-0 text-slate-400 group-hover:text-amber-500" />
                        {!isCollapsed && <span>Edit Konten (CMS)</span>}
                    </Link>

                </div>
            </nav>

            <div className="p-4 mt-auto border-t border-slate-100">
                <div className={cn(
                    "rounded-2xl transition-all duration-300",
                    isCollapsed ? "bg-transparent p-0 flex flex-col items-center gap-4" : "bg-slate-50 p-4"
                )}>
                    <div className={cn("flex items-center gap-3 mb-3", isCollapsed ? "justify-center mb-0" : "")}>
                        <div className="w-10 h-10 rounded-full bg-blue-600 shadow-sm flex items-center justify-center text-xs font-bold text-white uppercase">
                            {profile?.full_name?.charAt(0) || 'U'}
                        </div>

                        {!isCollapsed && (
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-800 truncate">{profile?.full_name || 'User'}</p>
                                <p className="text-[10px] text-slate-400 uppercase">{userRole || 'Role'}</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleSignOut}
                        className={cn(
                            "flex items-center gap-2 text-xs text-slate-400 hover:text-red-500 transition-colors",
                            isCollapsed ? "justify-center w-10 h-10 hover:bg-red-50 rounded-xl" : "w-full"
                        )}
                        title="Sign Out"
                    >
                        <LogOut className="w-4 h-4" />
                        {!isCollapsed && <span>Sign Out</span>}
                    </button>
                </div>
            </div>
        </aside>
    )
}
