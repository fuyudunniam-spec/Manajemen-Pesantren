"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSection } from "@/hooks/useSection";
import { Heart, HandCoins, Gift, ArrowRight } from "lucide-react";

interface DonationContent {
    title?: string;
    subtitle?: string;
    options?: {
        type: string;
        title: string;
        description: string;
        icon: string;
        link?: string;
    }[];
}

export function DonationSection() {
    const { data } = useSection<DonationContent>('donation');

    const title = data?.title || "Salurkan Kebaikan Anda";
    const subtitle = data?.subtitle || "Mari berpartisipasi dalam program kebaikan untuk masa depan anak yatim yang lebih cerah.";
    const options = data?.content?.options || [
        {
            type: "zakat",
            title: "Zakat Maal",
            description: "Tunaikan kewajiban zakat harta Anda untuk membersihkan jiwa dan harta.",
            icon: "hand-coins",
            link: "/donasi?type=zakat"
        },
        {
            type: "infaq",
            title: "Infaq & Sedekah",
            description: "Investasi akhirat terbaik dengan membantu operasional pendidikan santri.",
            icon: "gift",
            link: "/donasi?type=infaq"
        },
        {
            type: "orang-tua-asuh",
            title: "Orang Tua Asuh",
            description: "Menanggung biaya hidup dan pendidikan satu santri yatim secara rutin.",
            icon: "heart",
            link: "/donasi?type=ota"
        }
    ];

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'hand-coins': return <HandCoins className="w-8 h-8" />;
            case 'gift': return <Gift className="w-8 h-8" />;
            case 'heart': return <Heart className="w-8 h-8" />;
            default: return <Heart className="w-8 h-8" />;
        }
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background with Dark Emerald Theme & Gold Gradient */}
            <div className="absolute inset-0 bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-emerald-50"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-sm font-bold tracking-wide uppercase mb-6">
                            <Heart className="w-4 h-4" />
                            <span>Mari Berbagi</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-emerald-950 mb-6 leading-tight">
                            {title}
                        </h2>
                        <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                            {subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild size="lg" className="bg-gold-500 hover:bg-gold-600 text-white font-bold border-none shadow-lg shadow-gold-500/20">
                                <Link href="/donasi">
                                    Donasi Sekarang <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 bg-transparent">
                                <Link href="/dukungan">
                                    Bentuk Dukungan Lain
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    <div className="grid gap-6">
                        {options.map((option, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                            >
                                <Link href={option.link || '/donasi'} className="block group">
                                    <div className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-6 hover:border-gold-400 hover:shadow-lg transition-all duration-300">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                                            {getIcon(option.icon)}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-emerald-950 mb-1 group-hover:text-gold-600 transition-colors">{option.title}</h3>
                                            <p className="text-slate-500 text-sm leading-relaxed">{option.description}</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-gold-500 group-hover:text-white transition-all">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
