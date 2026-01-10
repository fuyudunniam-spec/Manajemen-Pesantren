"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                toast.error("Login Gagal", {
                    description: error.message === "Invalid login credentials"
                        ? "Email atau password salah. Silakan coba lagi."
                        : error.message,
                });
            } else {
                toast.success("Login Berhasil", {
                    description: "Selamat datang kembali!",
                });
                router.push("/dashboard");
                router.refresh(); // Ensure session is updated
            }
        } catch (error) {
            toast.error("Terjadi Kesalahan", {
                description: "Silakan coba lagi nanti.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-emerald-950 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-400/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-800/20 rounded-full blur-[120px]" />

            {/* Left Side - Branding (Desktop Only) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 pattern-overlay opacity-30" />
                <div className="absolute top-10 right-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-col justify-center p-12 lg:p-16">
                    <Link href="/" className="flex items-center gap-3 mb-12 group">
                        <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-400/30 group-hover:bg-amber-500/30 transition-all">
                            <span className="text-amber-400 font-display font-bold text-2xl">م</span>
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-2xl text-white">e-Maktab</h1>
                            <p className="text-sm text-white/60">Islamic Modern Management</p>
                        </div>
                    </Link>

                    <h2 className="font-display text-4xl font-bold text-white mb-4">
                        Selamat Datang di{" "}
                        <span className="text-amber-400">e-Maktab</span>
                    </h2>
                    <p className="text-lg text-white/70 max-w-md leading-relaxed">
                        Sistem Informasi Manajemen Pondok Pesantren untuk mengelola
                        data santri, akademik, keuangan, dan administrasi dengan elegan dan efisien.
                    </p>

                    {/* Decorative Islamic Pattern */}
                    <div className="mt-12 flex gap-2">
                        <div className="w-12 h-1 bg-amber-400/50 rounded-full" />
                        <div className="w-8 h-1 bg-amber-400/30 rounded-full" />
                        <div className="w-4 h-1 bg-amber-400/20 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Website
                    </Link>

                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-400/30">
                            <span className="text-amber-400 font-display font-bold text-xl">م</span>
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-xl text-white">e-Maktab</h1>
                            <p className="text-xs text-white/60">Islamic Modern Management</p>
                        </div>
                    </div>

                    {/* Glass Card */}
                    <Card className="backdrop-blur-xl bg-white/10 border-amber-400/20 shadow-2xl">
                        <CardHeader className="text-center pt-8 pb-4">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-400/20">
                                    <span className="text-amber-400 text-3xl font-display font-bold">M</span>
                                </div>
                            </div>
                            <h2 className="font-display text-3xl font-bold text-white mb-1">
                                Login ke Dashboard
                            </h2>
                            <p className="text-white/60 text-sm">
                                Masuk untuk mengakses sistem manajemen pesantren
                            </p>
                        </CardHeader>

                        <CardContent className="pb-8">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80 ml-1">
                                        Email Address
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="admin@pesantren.sch.id"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-amber-400/50 focus:ring-amber-400/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-sm font-medium text-white/80">Password</label>
                                        <a href="#" className="text-xs text-amber-400 hover:text-amber-300">
                                            Lupa password?
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-amber-400/50 focus:ring-amber-400/20 pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-amber-500 focus:ring-amber-400/20"
                                    />
                                    <label htmlFor="remember" className="text-sm text-white/70 cursor-pointer">
                                        Ingat saya
                                    </label>
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold shadow-lg shadow-amber-500/20"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Memproses...
                                        </>
                                    ) : (
                                        "Masuk"
                                    )}
                                </Button>

                                <p className="text-center text-xs text-white/40 mt-4">
                                    Authorized personnel only. Secure access.
                                </p>
                            </form>
                        </CardContent>
                    </Card>

                    <p className="text-center text-sm text-white/50 mt-6">
                        Belum memiliki akun?{" "}
                        <Link href="/kontak" className="text-amber-400 hover:text-amber-300 hover:underline">
                            Hubungi administrator
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
