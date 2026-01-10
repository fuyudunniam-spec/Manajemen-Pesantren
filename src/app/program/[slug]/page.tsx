"use client";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock Data - In real app, fetch from Supabase based on slug
const programsData: Record<string, any> = {
    "pendidikan": {
        title: "Pendidikan Formal",
        description: "Kurikulum Terpadu Nasional dan Pesantren",
        content: "Kami menyelenggarakan pendidikan formal jenjang SMP dan SMA dengan memadukan kurikulum nasional (K13/Merdeka) dengan kurikulum kepesantrenan. Lulusan kami memiliki ijazah resmi negara sekaligus bekal ilmu agama yang kuat.",
        features: ["Akreditasi A", "Laboratorium Lengkap", "Kelas Multimedia", "Program Bilingual"]
    },
    "tahfidz": {
        title: "Tahfidz Al-Quran",
        description: "Program Intensif Menghafal 30 Juz",
        content: "Program unggulan bagi santri yang ingin fokus menghafal Al-Quran. Didampingi oleh musyrif berpengalaman dengan metode yang terstruktur (Talaqqi, Murojaah, Tasmi'). Target hafalan 30 juz mutqin dalam masa pendidikan.",
        features: ["Sanad Hafalan", "Setoran Harian", "Ujian Berkala", "Wisuda Tahfidz"]
    },
    "asrama": {
        title: "Asrama Pengasuhan",
        description: "Lingkungan Tumbuh Kembang yang Islami",
        content: "Asrama bukan sekadar tempat tidur, melainkan laboratorium kehidupan. Santri dididik untuk mandiri, disiplin, toleran, dan bertanggung jawab. Suasana kekeluargaan yang erat membuat santri merasa betah seperti di rumah sendiri.",
        features: ["Kamar AC/Non-AC", "Laundry", "Makan 3x Sehari", "Keamanan 24 Jam"]
    },
    // Fallback
    "default": {
        title: "Program Pesantren",
        description: "Membentuk Generasi Robbani",
        content: "Pesantren Albisri memiliki berbagai program unggulan untuk menunjang minat dan bakat santri.",
        features: ["Pembinaan Karakter", "Life Skill", "Kajian Kitab", "Bahasa Arab & Inggris"]
    }
};

export default function SubProgramPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const data = programsData[slug] || programsData["default"];

    return (
        <PublicLayout>
            <div className="pt-20">
                <div className="bg-emerald-950 py-20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 pattern-overlay opacity-5" />
                    <div className="relative z-10 container mx-auto px-4">
                        <Link href="/program" className="inline-flex items-center text-emerald-200 hover:text-white mb-6 text-sm">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Program
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 capitalize">
                            {data.title}
                        </h1>
                        <p className="text-emerald-100/80 max-w-2xl mx-auto text-xl">{data.description}</p>
                    </div>
                </div>

                <div className="bg-slate-50 py-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
                            <div className="prose prose-lg text-slate-600 mb-12">
                                <p className="leading-relaxed">{data.content}</p>
                            </div>

                            <h3 className="text-2xl font-bold text-emerald-950 mb-6">Fasilitas & Keunggulan</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {data.features.map((feature: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                                        <CheckCircle className="w-5 h-5 text-gold-500" />
                                        <span className="font-semibold text-emerald-900">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 pt-12 border-t border-slate-100 text-center">
                                <h4 className="text-lg font-bold text-emerald-950 mb-4">Tertarik dengan program ini?</h4>
                                <Button asChild size="lg" className="bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-full">
                                    <Link href="/psb/daftar">Daftar Sekarang</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
