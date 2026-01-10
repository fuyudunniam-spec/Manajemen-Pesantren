"use client";

import { motion } from "framer-motion";
import { useSection } from "@/hooks/useSection";
import { Quote } from "lucide-react";

interface TestimonialContent {
    title?: string;
    testimonials?: {
        name: string;
        role: string;
        content: string;
        image?: string;
    }[];
}

export function TestimonialSection() {
    const { data } = useSection<TestimonialContent>('testimonials');

    const title = data?.title || "Kata Mereka";
    const testimonials = data?.content?.testimonials || [
        {
            name: "H. Abdullah",
            role: "Wali Santri",
            content: "Alhamdulillah, sejak anak saya mondok di Albisri, hafalan Qurannya lancar dan akhlaknya jauh lebih baik. Fasilitasnya pun sangat memadai.",
        },
        {
            name: "Fatimah Azzahra",
            role: "Alumni 2023",
            content: "Masa-masa di pesantren adalah masa terindah. Saya tidak hanya belajar agama, tapi juga leadership yang sangat berguna di dunia perkuliahan.",
        },
        {
            name: "Ustadz Yusuf",
            role: "Tokoh Masyarakat",
            content: "Pesantren Albisri adalah aset umat yang berharga. Program sosialnya sangat membantu anak-anak yatim di lingkungan kami.",
        }
    ];

    return (
        <section className="py-24 bg-emerald-900 relative overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 pattern-overlay opacity-5" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">{title}</h2>
                    <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-emerald-800/50 backdrop-blur-sm border border-emerald-700/50 p-8 rounded-2xl relative"
                        >
                            <Quote className="w-10 h-10 text-gold-500/30 absolute top-6 right-6" />
                            <p className="text-emerald-50 leading-relaxed italic mb-8 relative z-10">
                                "{item.content}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-emerald-950 font-bold text-xl">
                                    {item.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{item.name}</h4>
                                    <p className="text-xs text-gold-400 uppercase tracking-widest">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
