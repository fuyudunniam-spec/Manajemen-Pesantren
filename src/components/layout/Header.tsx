"use client"

import { Bell, Search } from "lucide-react"

export default function Header({ user, profile }: any) {
    return (
        <header className="h-20 border-b border-slate-200 bg-white px-8 flex items-center justify-between sticky top-0 z-10">
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-slate-700 placeholder:text-slate-400 transition-all shadow-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-emerald-900 transition-colors relative hover:bg-slate-50 rounded-lg">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-gold-400 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-slate-200 mx-2" />

                <div className="flex flex-col items-end">
                    <p className="text-[10px] text-gold-500 uppercase tracking-widest font-bold">Islamic Era</p>
                    <p className="text-xs text-emerald-900 font-bold font-display">Wednesday, 7 Jan 2026</p>
                </div>
            </div>
        </header>
    )
}
