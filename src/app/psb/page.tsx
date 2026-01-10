"use client";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, ArrowRight, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PsbPage() {
    return (
        <PublicLayout>
            <div className="pt-20">
                {/* Header */}
                <div className="bg-emerald-950 py-24 relative overflow-hidden">
                    <div className="absolute inset-0 pattern-overlay opacity-5" />
                    <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-white">
                            <span className="inline-block py-1 px-3 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-400 text-xs font-bold tracking-widest uppercase mb-6">
                                Penerimaan Santri Baru
                            </span>
                            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
                                Bergabung Menjadi Keluarga <span className="text-gold-500">Albisri</span>
                            </h1>
                            <p className="text-emerald-100/80 text-lg mb-8 leading-relaxed max-w-lg">
                                Mewujudkan generasi Qurani yang cerdas secara intelektual, spiritual, dan emosional.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button asChild size="lg" className="bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-full">
                                    <Link href="/psb/daftar">Daftar Sekarang <ArrowRight className="ml-2 w-4 h-4" /></Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="border-emerald-700 text-emerald-100 hover:bg-emerald-900 bg-transparent rounded-full">
                                    <Link href="/kontak">Konsultasi Admin</Link>
                                </Button>
                            </div>
                        </div>
                        {/* Image/Illustration placeholder */}
                        <div className="relative hidden md:block">
                            <div className="aspect-square rounded-full bg-gradient-to-tr from-emerald-800 to-transparent p-12 relative">
                                <div className="absolute inset-0 border border-gold-500/20 rounded-full animate-spin-slow" />
                                <div className="bg-emerald-900/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-700 shadow-2xl skew-y-3 transform hover:skew-y-0 transition-transform duration-500">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-white font-bold text-xl">1</div>
                                        <div className="text-white">
                                            <h3 className="font-bold">Gelombang 1</h3>
                                            <p className="text-emerald-200 text-sm">Januari - Maret 2024</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-2 bg-emerald-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-gold-500 w-[75%]" />
                                        </div>
                                        <p className="text-xs text-right text-gold-400 font-mono">Kuota Terisi 75%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 py-24">
                    <div className="container mx-auto px-4">
                        {/* Requirements */}
                        <div className="max-w-4xl mx-auto mb-20">
                            <h2 className="text-3xl font-display font-bold text-emerald-950 text-center mb-12">Alur Pendaftaran</h2>
                            <div className="grid md:grid-cols-4 gap-8">
                                {[
                                    { title: "Daftar Online", desc: "Isi formulir pendaftaran melalui website", icon: FileText },
                                    { title: "Tes Seleksi", desc: "Ikuti tes akademik dan baca Al-Quran", icon: FileText },
                                    { title: "Wawancara", desc: "Wawancara calon santri dan wali", icon: Users },
                                    { title: "Daftar Ulang", desc: "Lengkapi berkas dan administrasi", icon: CheckCircle },
                                ].map((step, i) => (
                                    <div key={i} className="text-center relative">
                                        <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-md flex items-center justify-center text-emerald-600 mb-6 border border-slate-100 z-10 relative">
                                            <span className="font-display font-bold text-xl">{i + 1}</span>
                                        </div>
                                        {i !== 3 && <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-slate-200 -z-0" />}
                                        <h3 className="font-bold text-emerald-950 mb-2">{step.title}</h3>
                                        <p className="text-sm text-slate-500">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Syarat */}
                        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                            <div className="bg-white p-8 rounded-2xl shadow-elevated border border-slate-100">
                                <h3 className="text-xl font-bold text-emerald-950 mb-6 flex items-center gap-3">
                                    <FileText className="w-6 h-6 text-gold-500" />
                                    Syarat Administrasi
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "Mengisi formulir pendaftaran",
                                        "Pas foto 3x4 (4 lembar)",
                                        "Fotokopi Akta Kelahiran & KK",
                                        "Fotokopi Rapor 2 semester terakhir",
                                        "Surat Keterangan Sehat dari Dokter"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-600">
                                            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-elevated border border-slate-100">
                                <h3 className="text-xl font-bold text-emerald-950 mb-6 flex items-center gap-3">
                                    <Download className="w-6 h-6 text-gold-500" />
                                    Download Brosur
                                </h3>
                                <p className="text-slate-600 mb-6">
                                    Unduh brosur digital untuk informasi lengkap rincian biaya, kurikulum, dan fasilitas pesantren.
                                </p>
                                <Button className="w-full bg-emerald-900 hover:bg-emerald-800">
                                    Download Brosur PDF
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

// Dummy Users icon for import fix if needed, but lucid-react has it. 
import { Users } from 'lucide-react';
