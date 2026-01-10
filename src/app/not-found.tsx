export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="text-center">
                <h1 className="mb-4 text-7xl font-display font-bold text-emerald-600">404</h1>
                <p className="mb-8 text-xl text-slate-600">Halaman tidak ditemukan</p>
                <a
                    href="/"
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    Kembali ke Beranda
                </a>
            </div>
        </div>
    );
}
