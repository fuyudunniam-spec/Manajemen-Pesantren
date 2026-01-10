"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useSection } from "@/hooks/useSection";
import { renderIcon } from "@/lib/iconMap";

interface FeaturesContent {
  items?: { icon: string; title: string; description: string }[];
}

const defaultFeatures = [
  {
    icon: "book",
    title: "Kurikulum Terpadu",
    description: "Perpaduan ilmu agama dan umum yang komprehensif untuk bekal dunia dan akhirat.",
  },
  {
    icon: "moon",
    title: "Tahfidz Al-Quran",
    description: "Program hafalan Al-Quran dengan metode modern dan bimbingan ustadz berpengalaman.",
  },
  {
    icon: "heart",
    title: "Pembinaan Akhlak",
    description: "Pembentukan karakter islami melalui kegiatan rutin dan keteladanan para asatidz.",
  },
  {
    icon: "globe",
    title: "Bahasa Arab & Inggris",
    description: "Penguasaan bahasa internasional untuk membuka wawasan dan peluang global.",
  },
  {
    icon: "graduation",
    title: "Pendidikan Formal",
    description: "Terakreditasi dengan kurikulum nasional dan pengakuan ijazah resmi.",
  },
  {
    icon: "shield",
    title: "Lingkungan Aman",
    description: "Fasilitas lengkap dan pengawasan 24 jam untuk kenyamanan santri.",
  },
];

export function FeaturesSection() {
  const { data, loading } = useSection<FeaturesContent>('features');

  const title = data?.title || "Mengapa Memilih Pondok Pesantren Kami?";
  const subtitle = data?.subtitle || "Kami menyediakan pendidikan holistik yang memadukan nilai-nilai Islam dengan pengetahuan modern untuk mencetak generasi unggul.";
  const features = data?.content?.items || defaultFeatures;

  if (loading) {
    return (
      <section className="py-20 md:py-28 bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Keunggulan Kami
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {subtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-card transition-all duration-300 border border-border/50"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                {renderIcon(feature.icon, 'w-6 h-6')}
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent/50 to-transparent rounded-tr-2xl rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
