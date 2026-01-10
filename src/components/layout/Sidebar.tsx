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
    ChevronRight,
    Globe,
    FileText,
    Layout as LayoutIcon,
    Palette,
    ChevronDown,
    ChevronUp
} from "lucide-react"

const MENU_ITEMS = [
    { name: 'Dashboard', slug: 'dashboard', icon: LayoutDashboard, path: '/dashboard' },
    {
        name: 'Manajemen Website',
        slug: 'website',
        icon: Globe,
        path: '/website',
        submenu: [
            { name: 'Pengaturan Website', path: '/website/settings', icon: Settings },
            { name: 'Halaman Statis', path: '/website/pages', icon: FileText },
            { name: 'Visual Page Builder', path: '/website/builder', icon: LayoutIcon },
            { name: 'Theme Customizer', path: '/website/theme', icon: Palette },
        ]
    },
    { name: 'Manajemen User', slug: 'users', icon: Users, path: '/users', role: ['superadmin'] },
    { name: 'Keuangan', slug: 'keuangan', icon: Wallet, path: '/keuangan' },
    { name: 'Akademik', slug: 'akademik', icon: GraduationCap, path: '/akademik' },
    { name: 'Donasi', slug: 'donasi', icon: Heart, path: '/donasi' },
]

export default function Sidebar({ user, profile, permissions }: any) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({})
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()
    const userRole = profile?.roles?.slug?.toLowerCase() || ''
    const isSuperadmin = userRole === 'superadmin' || user?.email === 'superadmin@gmail.com'

    const filteredMenu = MENU_ITEMS.filter(item => {
        if (isSuperadmin) return true
        if (item.role && !item.role.includes(userRole)) return false
        if (item.slug === 'dashboard' || item.slug === 'website') return true
        return permissions.some((p: any) => p.slug === item.slug)
    })

    const toggleSubmenu = (slug: string) => {
        setExpandedMenus(prev => ({ ...prev, [slug]: !prev[slug] }))
    }

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
                    <div className="w-10 h-10 rounded-xl bg-mint-500 flex-shrink-0 flex items-center justify-center shadow-lg shadow-mint-500/30">
                        <span className="text-white font-display font-bold text-lg">M</span>
                    </div>
                    <div className="whitespace-nowrap">
                        <h2 className="text-xl font-display font-bold text-slate-800 leading-tight">e-Maktab</h2>
                        <p className="text-[10px] text-mint-600 uppercase tracking-widest font-bold">Pesantren Modern</p>
                    </div>
                </div>

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-mint-600 transition-colors"
                >
                    {isCollapsed ? <Menu className="w-6 h-6" /> : <ChevronLeft className="w-5 h-5" />}
                </button>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto overflow-x-hidden">
                {filteredMenu.map((item) => {
                    const isActive = pathname === item.path || pathname.startsWith(item.path + '/')
                    const hasSubmenu = item.submenu && item.submenu.length > 0
                    const isExpanded = expandedMenus[item.slug]

                    return (
                        <div key={item.slug}>
                            {hasSubmenu ? (
                                <>
                                    <button
                                        onClick={() => toggleSubmenu(item.slug)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                                            pathname.includes(`/dashboard/${item.slug}`)
                                                ? "bg-mint-50 text-mint-700 font-bold shadow-sm"
                                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
                                            isCollapsed ? "justify-center" : ""
                                        )}
                                        title={isCollapsed ? item.name : undefined}
                                    >
                                        <item.icon className={cn(
                                            "w-5 h-5 flex-shrink-0 transition-colors",
                                            pathname.includes(`/dashboard/${item.slug}`) ? "text-mint-600" : "text-slate-400 group-hover:text-mint-500"
                                        )} />

                                        {!isCollapsed && (
                                            <>
                                                <span className="flex-1 text-left">{item.name}</span>
                                                {isExpanded ? (
                                                    <ChevronUp className="w-4 h-4" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4" />
                                                )}
                                            </>
                                        )}
                                    </button>

                                    {/* Submenu */}
                                    {!isCollapsed && isExpanded && (
                                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-200 pl-3">
                                            {item.submenu.map((subitem: any) => {
                                                const isSubActive = pathname === subitem.path
                                                return (
                                                    <Link
                                                        key={subitem.path}
                                                        href={subitem.path}
                                                        className={cn(
                                                            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                                                            isSubActive
                                                                ? "bg-mint-50 text-mint-700 font-semibold"
                                                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                                        )}
                                                    >
                                                        <subitem.icon className={cn(
                                                            "w-4 h-4",
                                                            isSubActive ? "text-mint-600" : "text-slate-400"
                                                        )} />
                                                        <span>{subitem.name}</span>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={item.path}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                                        isActive
                                            ? "bg-mint-50 text-mint-700 font-bold shadow-sm"
                                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
                                        isCollapsed ? "justify-center" : ""
                                    )}
                                    title={isCollapsed ? item.name : undefined}
                                >
                                    <item.icon className={cn(
                                        "w-5 h-5 flex-shrink-0 transition-colors",
                                        isActive ? "text-mint-600" : "text-slate-400 group-hover:text-mint-500"
                                    )} />

                                    {!isCollapsed && (
                                        <span>{item.name}</span>
                                    )}

                                    {isActive && !isCollapsed && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-mint-500" />
                                    )}
                                </Link>
                            )}
                        </div>
                    )
                })}
            </nav>

            <div className="p-4 mt-auto border-t border-slate-100">
                <div className={cn(
                    "rounded-2xl transition-all duration-300",
                    isCollapsed ? "bg-transparent p-0 flex flex-col items-center gap-4" : "bg-slate-50 p-4 border border-slate-100"
                )}>
                    <div className={cn("flex items-center gap-3 mb-3", isCollapsed ? "justify-center mb-0" : "")}>
                        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-xs font-bold text-mint-700 uppercase">
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
