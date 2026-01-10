import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from "next/link"

export default function AccessDeniedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-emerald-950">
            <Card className="max-w-md w-full glass-card text-center p-8">
                <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-display font-bold text-white mb-2">Akses Ditolak</h1>
                <p className="text-white/50 mb-8 font-sans">
                    Maaf, Anda tidak memiliki izin untuk mengakses modul ini. Silakan hubungi Superadmin jika Anda merasa ini adalah kesalahan.
                </p>
                <Link href="/dashboard">
                    <Button variant="outline" className="w-full">
                        Kembali ke Dashboard
                    </Button>
                </Link>
            </Card>
        </div>
    )
}
