"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Phone, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSection } from "@/hooks/useSection";

interface CTAContent {
  button_text?: string;
  button_link?: string;
  registration_period?: string;
  academic_year?: string;
}

export function CTASection() {
  const { data, loading } = useSection<CTAContent>('cta');

  const title = data?.title || "Pendaftaran Santri Baru";
  const subtitle = data?.subtitle || "Mari bergabung menjadi bagian dari keluarga besar Pesantren Albisri. Kuota terbatas!";
  const buttonText = data?.content?.button_text || "Daftar Sekarang";
  const registrationPeriod = data?.content?.registration_period || "Gelombang 1: Jan - Mar 2024";
  const academicYear = data?.content?.academic_year || "2024/2025";

  if (loading) return null;

  return (
    <section className="py-24 relative overflow-hidden bg-emerald-900">
      {/* Background Decor */}
      <div className="absolute inset-0 pattern-overlay opacity-10" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-900 border border-emerald-700 p-8 md:p-16 text-center"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            {title} <span className="text-gold-400 italic block md:inline">{academicYear}</span>
          </h2>
          <p className="text-emerald-100/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <div className="bg-emerald-950/50 backdrop-blur-sm border border-emerald-700 rounded-xl px-6 py-4 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gold-400" />
              <div className="text-left">
                <p className="text-xs text-emerald-300 uppercase tracking-widest font-bold">Periode</p>
                <p className="text-white font-semibold">{registrationPeriod}</p>
              </div>
            </div>
            <div className="bg-emerald-950/50 backdrop-blur-sm border border-emerald-700 rounded-xl px-6 py-4 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gold-400" />
              <div className="text-left">
                <p className="text-xs text-emerald-300 uppercase tracking-widest font-bold">Tahun Ajaran</p>
                <p className="text-white font-semibold">{academicYear}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="xl" className="bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-full px-8 shadow-xl shadow-gold-500/20 border-none transition-transform hover:scale-105">
              <Link href="/psb/daftar">
                {buttonText} <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="border-emerald-500 text-emerald-100 hover:bg-emerald-800 hover:text-white rounded-full px-8 bg-transparent">
              <Link href="/kontak">
                <Phone className="w-4 h-4 mr-2" />
                Hubungi Admin
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
