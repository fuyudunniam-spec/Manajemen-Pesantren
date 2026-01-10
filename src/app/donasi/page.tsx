"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, CreditCard, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PublicLayout } from "@/components/layout/PublicLayout";

export default function DonationPage() {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        toast.success(`Nomor rekening ${label} berhasil disalin!`);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <PublicLayout>
            <div className="bg-slate-50 min-h-screen pb-20">
                {/* Header */}
                <div className="bg-emerald-900 pt-32 pb-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/90"></div>
                    <div className="container mx-auto px-4 relative z-10 text-center text-white">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-display font-bold mb-6"
                        >
                            Salurkan Donasi Terbaik
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-emerald-100 text-lg max-w-2xl mx-auto leading-relaxed"
                        >
                            Harta yang kita sedekahkan tidak akan berkurang, melainkan akan terus bertambah keberkahannya dan menjadi penolong di akhirat kelak.
                        </motion.p>
                    </div>
                </div>

                <div className="container mx-auto px-4 -mt-10 relative z-20">
                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                        {/* Rekening Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Rekening Donasi</h2>
                            </div>

                            <div className="space-y-6">
                                {/* BSI */}
                                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 group hover:border-emerald-500 transition-colors relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-1">Bank Syariah Indonesia (BSI)</p>
                                            <p className="text-2xl font-mono font-bold text-slate-900">7123 456 7890</p>
                                        </div>
                                        <div className="h-8 w-14 bg-emerald-900 rounded flex items-center justify-center text-[10px] font-bold text-white">BSI</div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-slate-500">a.n. Yayasan Pesantren Albisri</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                            onClick={() => handleCopy("71234567890", "BSI")}
                                        >
                                            {copied === "BSI" ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                            {copied === "BSI" ? "Disalin" : "Salin"}
                                        </Button>
                                    </div>
                                </div>

                                {/* Mandiri */}
                                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 group hover:border-blue-500 transition-colors relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-1">Bank Mandiri</p>
                                            <p className="text-2xl font-mono font-bold text-slate-900">123 00 9876543 2</p>
                                        </div>
                                        <div className="h-8 w-14 bg-blue-800 rounded flex items-center justify-center text-[10px] font-bold text-white">MANDIRI</div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-slate-500">a.n. Yayasan Pesantren Albisri</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            onClick={() => handleCopy("1230098765432", "Mandiri")}
                                        >
                                            {copied === "Mandiri" ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                            {copied === "Mandiri" ? "Disalin" : "Salin"}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-2">Konfirmasi Donasi</h3>
                                <p className="text-slate-500 text-sm mb-4">
                                    Mohon konfirmasi donasi Anda melalui WhatsApp agar dapat kami catat dan salurkan sesuai akad.
                                </p>
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                    Konfirmasi via WhatsApp
                                </Button>
                            </div>
                        </motion.div>

                        {/* QRIS Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 text-center"
                        >
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Scan QRIS</h2>
                            <p className="text-slate-500 text-sm mb-8">Scan kode QR di bawah ini menggunakan aplikasi e-wallet apa saja (GoPay, OVO, Dana, LinkAja, BCA Mobile, dll)</p>

                            <div className="bg-white p-4 inline-block rounded-xl border-2 border-slate-900 mb-6">
                                {/* Placeholder QR Code */}
                                <div className="w-64 h-64 bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                                    [QRIS CODE PLACEHOLDER]
                                </div>
                            </div>

                            <p className="font-bold text-slate-900 text-lg">YAYASAN PESANTREN ALBISRI</p>
                            <p className="text-slate-400 text-sm">NMID: ID1234567890</p>

                            <div className="mt-8 flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                {/* Bank Logos Placeholder - simplifikasi dengan text saja untuk mock */}
                                <span className="text-xs font-bold text-slate-400 border px-2 py-1 rounded">GOPAY</span>
                                <span className="text-xs font-bold text-slate-400 border px-2 py-1 rounded">OVO</span>
                                <span className="text-xs font-bold text-slate-400 border px-2 py-1 rounded">DANA</span>
                                <span className="text-xs font-bold text-slate-400 border px-2 py-1 rounded">M-BANKING</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
