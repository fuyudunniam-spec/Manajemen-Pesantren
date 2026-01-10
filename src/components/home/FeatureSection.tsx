"use client";

import { motion } from "framer-motion";
import { useSection } from "@/hooks/useSection";
import { ShieldCheck, BookOpen, HeartHandshake, UserCog, CheckCircle2 } from "lucide-react";

interface FeatureContent {
    title?: string;
    subtitle?: string;
    features?: {
        title: string;
        description: string;
        icon: string;
    }[];
}

export function FeatureSection() {
    const { data } = useSection<FeatureContent>('features');

    const title = data?.title || "Keunggulan Pesantren";
    const subtitle = data?.subtitle || "Kami berkomitmen memberikan pendidikan terbaik dengan fasilitas dan kurikulum yang komprehensif.";
    const features = data?.content?.features || [
        {
            title: "Kurikulum Terintegrasi",
            description: "Memadukan kurikulum pesantren salaf, modern, dan pendidikan nasional.",
            icon: "book"
        },
        {
            title: "Biaya Pendidikan Terjangkau",
            description: "Subsidi silang dan program beasiswa untuk santri yatim dan dhuafa.",
            icon: "heart"
        },
        {
            title: "Lingkungan Kondusif",
            description: "Suasana asri dan islami yang mendukung fokus belajar santri.",
            icon: "shield"
        },
        {
            title: "Pengajar Kompeten",
            description: "Dididik oleh asatidz alumni pesantren ternama dalam dan luar negeri.",
            icon: "user"
        }
    ];

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'book': return <BookOpen className="w-6 h-6 text-gold-500" />;
            case 'heart': return <HeartHandshake className="w-6 h-6 text-gold-500" />;
            case 'shield': return <ShieldCheck className="w-6 h-6 text-gold-500" />;
            case 'user': return <UserCog className="w-6 h-6 text-gold-500" />;
            default: return <CheckCircle2 className="w-6 h-6 text-gold-500" />;
        }
    };

    return (
        <section className="py-20 bg-emerald-50/50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-display font-bold text-emerald-950 mb-4"
                    >
                        {title}
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "80px" }}
                        viewport={{ once: true }}
                        className="h-1 bg-gold-500 mx-auto rounded-full mb-6"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-xl border border-emerald-100 hover:border-gold-300 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-emerald-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold-500 transition-colors duration-300 shadow-md">
                                {/* Override icon color for hover effect consistency if needed, but keeping simple for now */}
                                {getIcon(feature.icon).props.children ?
                                    <div className="text-white">{getIcon(feature.icon)}</div> : // If icon is wrapped, this might not work perfectly without cloning.
                                    // Simplified approach: Render icon with white color via class override not working directly on component.
                                    // Let's just use the icon logic correctly.
                                    <div className="text-emerald-50 group-hover:text-white transition-colors">
                                        {getIcon(feature.icon)}
                                    </div>
                                }
                            </div>
                            <h3 className="text-lg font-bold text-emerald-950 mb-2 group-hover:text-gold-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
