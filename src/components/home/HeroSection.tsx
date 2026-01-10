"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSection } from "@/hooks/useSection";
import { ArrowRight, BookOpen, Users, Award, Loader2 } from "lucide-react";

interface HeroContent {
  badge?: string;
  cta_primary?: string;
  cta_secondary?: string;
  stats?: { value: string; label: string; icon: string }[];
}

export function HeroSection() {
  const { data, loading } = useSection<HeroContent>('hero');

  // Default fallback values
  const title = data?.title || "Membentuk Generasi Qurani yang Berakhlak Mulia";
  const subtitle = data?.subtitle || "Pondok Pesantren kami berkomitmen mencetak santri yang menguasai ilmu agama, berakhlak karimah, dan siap menghadapi tantangan zaman.";
  const badge = data?.content?.badge || "Pendaftaran Santri Baru Dibuka!";
  const ctaPrimary = data?.content?.cta_primary || "Daftar Sekarang";
  const ctaSecondary = data?.content?.cta_secondary || "Pelajari Lebih Lanjut";

  if (loading) {
    return (
      <section className="relative min-h-[90vh] flex items-center justify-center bg-emerald-950">
        <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
      </section>
    );
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-emerald-950">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 pattern-overlay opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 opacity-90" />

      {/* Decorative Gold Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-300 mb-8 mx-auto lg:mx-0 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400"></span>
              </span>
              <span className="text-sm font-medium tracking-wide uppercase">{badge}</span>
            </motion.div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              {title.split(' ').map((word, i) => {
                if (word.toLowerCase().includes('qurani') || word.toLowerCase().includes('islam')) {
                  return <span key={i} className="text-gold-400 italic">{word} </span>;
                }
                return word + ' ';
              })}
            </h1>

            <p className="text-lg md:text-xl text-emerald-100/80 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="xl" className="bg-gold-500 text-emerald-950 hover:bg-gold-400 font-bold px-8 rounded-full shadow-lg shadow-gold-500/10 transition-all duration-300 hover:scale-105">
                <Link href="/psb/daftar">
                  {ctaPrimary}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="border-emerald-700/50 text-emerald-100 hover:bg-emerald-800/50 hover:text-white rounded-full bg-transparent transition-all duration-300">
                <Link href="/profil">{ctaSecondary}</Link>
              </Button>
            </div>
          </motion.div>

          {/* Decorative Visuals / Mosque Silhouette placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 w-full h-[600px] rounded-t-[200px] border-4 border-gold-500/20 p-4 backdrop-blur-[2px]">
              <div className="w-full h-full rounded-t-[190px] overflow-hidden relative group">
                <div className="absolute inset-0 bg-emerald-900/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                {/* Placeholder for Mosque Image */}
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1542385263-8d0cd3879aa8?q=80&w=2070')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"></div>
              </div>
            </div>
            {/* Decorative Circles */}
            <div className="absolute -top-10 -right-10 w-24 h-24 border border-gold-500/30 rounded-full animate-spin-slow"></div>
            <div className="absolute top-1/2 -left-12 w-16 h-16 bg-gold-500/10 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
}
