"use client";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <PublicLayout>
            <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
                <div className="container mx-auto px-4">

                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-emerald-950 mb-4">Hubungi Kami</h1>
                        <p className="text-slate-600">
                            Silakan hubungi kami untuk informasi lebih lanjut mengenai pendaftaran, donasi, atau program pesantren.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
                            >
                                <h3 className="text-2xl font-display font-bold text-emerald-950 mb-6 border-b border-slate-100 pb-4">
                                    Informasi Kontak
                                </h3>
                                <ul className="space-y-6">
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Alamat</h4>
                                            <p className="text-slate-600 text-sm">Jl. Raya Pesantren No. 99, Kecamatan Klojen, Kota Malang, Jawa Timur</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Telepon / WhatsApp</h4>
                                            <p className="text-slate-600 text-sm">(0341) 123-4567</p>
                                            <p className="text-slate-600 text-sm">0812-3456-7890 (Admin)</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Email</h4>
                                            <p className="text-slate-600 text-sm">info@albisri.com</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Jam Operasional Kantor</h4>
                                            <p className="text-slate-600 text-sm">Senin - Jumat: 08:00 - 16:00</p>
                                            <p className="text-slate-600 text-sm">Sabtu: 08:00 - 12:00</p>
                                        </div>
                                    </li>
                                </ul>
                            </motion.div>

                            {/* Google Maps Embed Placeholder */}
                            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 h-64 overflow-hidden relative">
                                <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
                                    Google Maps Embed
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl shadow-elevated border-t-4 border-gold-500"
                        >
                            <h3 className="text-2xl font-display font-bold text-emerald-950 mb-2">Kirim Pesan</h3>
                            <p className="text-slate-500 mb-8 text-sm">Kami akan segera membalas pesan Anda melalui email.</p>

                            <form className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
                                        <Input placeholder="Nama Anda" className="bg-slate-50 border-slate-200 focus:border-gold-500 focus:ring-gold-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Email</label>
                                        <Input type="email" placeholder="email@contoh.com" className="bg-slate-50 border-slate-200 focus:border-gold-500 focus:ring-gold-500" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Subjek</label>
                                    <Input placeholder="Perihal pesan" className="bg-slate-50 border-slate-200 focus:border-gold-500 focus:ring-gold-500" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Pesan</label>
                                    <Textarea placeholder="Tulis pesan Anda di sini..." className="h-32 bg-slate-50 border-slate-200 focus:border-gold-500 focus:ring-gold-500 resize-none" />
                                </div>

                                <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold h-12">
                                    <Send className="w-4 h-4 mr-2" /> Kirim Pesan
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
