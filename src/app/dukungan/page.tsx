"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HandHeart, Users, Share2, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function SupportUsPage() {
    return (
        <PublicLayout>
            <div className="bg-white min-h-screen">
                {/* Hero */}
                <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block py-1 px-3 rounded-full bg-slate-800 text-emerald-400 text-sm font-medium mb-6"
                        >
                            Dukungan & Kolaborasi
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-display font-bold mb-6"
                        >
                            Mari Bergandeng Tangan
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                        >
                            Selain donasi materi, Anda dapat berkontribusi melalui tenaga, pikiran, atau jaringan untuk kemajuan pendidikan anak yatim.
                        </motion.p>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Volunteer */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="p-8 rounded-2xl bg-white border border-slate-100 hover:shadow-xl hover:border-emerald-100 transition-all group"
                            >
                                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                    <HandHeart className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">Relawan Pengajar</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    Bagikan ilmu dan keahlian Anda kepada santri. Kami terbuka untuk kelas inspirasi, pelatihan skill, atau bimbingan belajar.
                                </p>
                                <Button variant="outline" className="w-full">Jadi Relawan</Button>
                            </motion.div>

                            {/* Partnership */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="p-8 rounded-2xl bg-white border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all group"
                            >
                                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Users className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">Mitra Strategis</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    Untuk perusahaan atau instansi yang ingin berkolaborasi dalam program CSR atau pengembangan fasilitas pondok.
                                </p>
                                <Button variant="outline" className="w-full">Ajukan Kemitraan</Button>
                            </motion.div>

                            {/* Ambassador */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="p-8 rounded-2xl bg-white border border-slate-100 hover:shadow-xl hover:border-amber-100 transition-all group"
                            >
                                <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-6 group-hover:bg-amber-600 group-hover:text-white transition-all">
                                    <Share2 className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">Duta Kebaikan</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    Bantu kami menyebarkan informasi program Albisri di media sosial atau lingkungan sekitar Anda.
                                </p>
                                <Button variant="outline" className="w-full">Gabung Komunitas</Button>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-display font-bold text-slate-900 mb-8">Hubungi Kami</h2>
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            <a href="mailto:info@albisri.com" className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors">
                                <Mail className="w-6 h-6 text-emerald-600" />
                                <div className="text-left">
                                    <p className="text-xs text-slate-500 font-bold uppercase">Email</p>
                                    <p className="font-semibold text-slate-900">info@albisri.com</p>
                                </div>
                            </a>
                            <a href="https://wa.me/628123456789" className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors">
                                <MessageCircle className="w-6 h-6 text-emerald-600" />
                                <div className="text-left">
                                    <p className="text-xs text-slate-500 font-bold uppercase">WhatsApp</p>
                                    <p className="font-semibold text-slate-900">+62 812 3456 789</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
