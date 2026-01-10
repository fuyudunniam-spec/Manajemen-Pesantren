"use client";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DaftarPsbPage() {
    const [step, setStep] = useState(1);

    return (
        <PublicLayout>
            <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <Link href="/psb" className="inline-flex items-center text-slate-500 hover:text-emerald-600 mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke Informasi PSB
                        </Link>

                        <div className="bg-white rounded-2xl shadow-elevated border-t-4 border-gold-500 p-8 md:p-10">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl md:text-3xl font-display font-bold text-emerald-950 mb-2">Formulir Pendaftaran</h1>
                                <p className="text-slate-500">Silakan isi data calon santri dengan benar.</p>
                            </div>

                            {/* Progress Indicator */}
                            <div className="flex items-center justify-between mb-10 text-sm">
                                {[1, 2, 3].map((s) => (
                                    <div key={s} className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                            {s}
                                        </div>
                                        <span className={`hidden md:inline ${step >= s ? 'text-emerald-700 font-medium' : 'text-slate-400'}`}>
                                            {s === 1 ? 'Data Diri' : s === 2 ? 'Data Wali' : 'Konfirmasi'}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <form className="space-y-6">
                                <div className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
                                            <Input placeholder="Sesuai Akta Kelahiran" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">NISN</label>
                                            <Input placeholder="Nomor Induk Siswa Nasional" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Jenjang Pendidikan</label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih jenjang" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="smp">SMP / MTs</SelectItem>
                                                <SelectItem value="sma">SMA / MA</SelectItem>
                                                <SelectItem value="tahfidz">Tahfidz Intensif</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Asal Sekolah</label>
                                        <Input placeholder="Nama sekolah sebelumnya" />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100 flex gap-4">
                                    <Button type="button" variant="outline" className="w-full">Batal</Button>
                                    <Button type="button" className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold">Lanjut</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
