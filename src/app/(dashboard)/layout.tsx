import { createClient } from "@/lib/supabase/server"
import Sidebar from "@/components/layout/Sidebar"
import Header from "@/components/layout/Header"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch user profile and permissions
    const { data: profile } = await supabase
        .from('profiles')
        .select('*, roles(*)')
        .eq('id', user.id)
        .single()

    const { data: permissions } = await supabase
        .from('user_permissions')
        .select('permissions(*)')
        .eq('user_id', user.id)

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            <Sidebar user={user} profile={profile} permissions={permissions?.map(p => p.permissions) || []} />
            <div className="flex-1 flex flex-col min-w-0">
                <Header user={user} profile={profile} />
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
