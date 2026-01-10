"use client";

import { motion } from "framer-motion";
import { useSection } from "@/hooks/useSection";

interface GalleryContent {
    title?: string;
    subtitle?: string;
    images?: {
        src: string;
        caption: string;
        span?: string; // 'col-span-1' | 'col-span-2'
    }[];
}

export function GallerySection() {
    const { data } = useSection<GalleryContent>('gallery');

    const title = data?.title || "Galeri Kegiatan";
    const subtitle = data?.subtitle || "Momen kebersamaan dan kegiatan harian santri di Pesantren Albisri.";
    const images = data?.content?.images || [
        {
            src: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=80&w=1000",
            caption: "Kegiatan Belajar Mengajar",
            span: "md:col-span-2 md:row-span-2"
        },
        {
            src: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1000",
            caption: "Halaqah Quran",
            span: "md:col-span-1 md:row-span-1"
        },
        {
            src: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000",
            caption: "Masjid Pesantren",
            span: "md:col-span-1 md:row-span-1"
        },
        {
            src: "https://images.unsplash.com/photo-1585036156171-40b3866281a7?q=80&w=1000",
            caption: "Ekstrakurikuler",
            span: "md:col-span-1 md:row-span-1"
        },
        {
            src: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=1000",
            caption: "Kajian Kitab Kuning",
            span: "md:col-span-1 md:row-span-1"
        }
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-display font-bold text-emerald-950 mb-2"
                    >
                        {title}
                    </motion.h2>
                    <p className="text-slate-600">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group overflow-hidden rounded-xl cursor-pointer ${img.span || 'md:col-span-1'}`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${img.src})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <p className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {img.caption}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
