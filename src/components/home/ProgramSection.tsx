"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSection } from "@/hooks/useSection";
import { GraduationCap, Book, Home, ArrowRight } from "lucide-react";

interface ProgramContent {
    title?: string;
    subtitle?: string;
    programs?: {
        title: string;
        description: string;
        icon: string;
        link?: string;
    }[];
}

export function ProgramSection() {
    const { data } = useSection<ProgramContent>('programs');

    const title = data?.title || "Program Unggulan";
    const subtitle = data?.subtitle || "Ikhtiar kami dalam memuliakan anak yatim melalui pendidikan dan pengasuhan yang holistik.";
    const programs = data?.content?.programs || [
        {
            title: "Pendidikan Formal",
            description: "Menyediakan akses pendidikan formal dari tingkat SD hingga SMA dengan kurikulum terpadu.",
            icon: "school",
            link: "/program/pendidikan"
        },
        {
            title: "Tahfidz Al-Quran",
            description: "Program intensif menghafal Al-Quran dengan metode yang ramah anak dan target hafalan mutqin.",
            icon: "quran",
            link: "/program/tahfidz"
        },
        {
            title: "Asrama Pengasuhan",
            description: "Lingkungan asrama yang kondusif, aman, dan penuh kasih sayang untuk tumbuh kembang santri.",
            icon: "home",
            link: "/program/asrama"
        }
    ];

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'school': return <GraduationCap className="w-10 h-10 text-white" />;
            case 'quran': return <Book className="w-10 h-10 text-white" />;
            case 'home': return <Home className="w-10 h-10 text-white" />;
            default: return <GraduationCap className="w-10 h-10 text-white" />;
        }
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-gold-500 font-bold tracking-widest uppercase text-sm mb-2 block"
                        >
                            Pendidikan & Dakwah
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-display font-bold text-emerald-950"
                        >
                            {title}
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 max-w-md text-right md:text-left"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {programs.map((program, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="group relative overflow-hidden rounded-2xl h-[400px] shadow-lg cursor-pointer"
                        >
                            {/* Background Image Placeholder */}
                            <div className={`absolute inset-0 bg-emerald-900 transition-transform duration-700 group-hover:scale-110`} >
                                {/* In a real app, use dynamic images here */}
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/80 to-transparent opacity-90" />
                                {/* Pattern */}
                                <div className="absolute inset-0 pattern-overlay opacity-5" />
                            </div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="w-16 h-16 rounded-xl bg-gold-500/20 backdrop-blur-md border border-gold-500/30 flex items-center justify-center mb-6 group-hover:bg-gold-500 transition-colors duration-300">
                                    {getIcon(program.icon)}
                                </div>

                                <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-gold-300 transition-colors">
                                    {program.title}
                                </h3>

                                <p className="text-emerald-100/80 mb-6 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                                    {program.description}
                                </p>

                                <div className="w-full h-px bg-white/20 mb-6 group-hover:bg-gold-500/50 transition-colors" />

                                {program.link && (
                                    <Link href={program.link} className="inline-flex items-center text-white font-semibold group-hover:text-gold-400 transition-colors">
                                        Pelajari Program <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
