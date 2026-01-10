"use client";

import { motion } from "framer-motion";
import { useSection } from "@/hooks/useSection";
import { Users, BookOpen, UserCheck, Heart } from "lucide-react";

interface StatsContent {
    stats: {
        value: string;
        label: string;
        icon: string;
    }[];
}

export function StatsSection() {
    const { data } = useSection<StatsContent>('stats');

    const stats = data?.content?.stats || [
        { value: "500+", label: "Yatim Disantuni", icon: "heart" },
        { value: "100%", label: "Beasiswa Penuh", icon: "user-check" },
        { value: "50+", label: "Penghafal Quran", icon: "book-open" },
        { value: "1000+", label: "Penerima Manfaat", icon: "users" },
    ];

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'heart': return <Heart className="w-6 h-6 text-gold-500" />;
            case 'book-open': return <BookOpen className="w-6 h-6 text-gold-500" />;
            case 'user-check': return <UserCheck className="w-6 h-6 text-gold-500" />;
            default: return <Users className="w-6 h-6 text-gold-500" />;
        }
    };

    return (
        <section className="py-12 -mt-16 relative z-30">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-elevated border-b-4 border-gold-500 p-8 md:p-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x divide-slate-100">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center group px-4"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 mb-4 group-hover:bg-emerald-900 transition-colors duration-300">
                                    {getIcon(stat.icon)}
                                </div>
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">
                                    {stat.value}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-widest">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
