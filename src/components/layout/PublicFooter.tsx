"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

export function PublicFooter() {
  const { settings } = useSettings();

  // Get site identity from settings with fallbacks
  const siteName = settings.site_title || 'Albisri';
  const siteTagline = settings.site_tagline || 'Pondok Pesantren Yatim';
  const siteLogo = settings.site_logo;
  const footerText = settings.footer_text || 'Membentuk generasi Qurani yang berakhlak mulia, berilmu, dan bermanfaat bagi umat, serta memuliakan anak yatim.';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-950 text-emerald-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-800 to-transparent" />

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              {siteLogo ? (
                <img
                  src={siteLogo}
                  alt={siteName}
                  className="w-12 h-12 object-contain bg-white/5 p-2 rounded-xl border border-emerald-800"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-gold-500 flex items-center justify-center text-white font-display font-bold text-xl shadow-lg shadow-gold-500/20">
                  <span>ﻡ</span>
                </div>
              )}
              <div>
                <h3 className="font-display font-bold text-2xl text-white">{siteName}</h3>
                <p className="text-xs text-gold-500 uppercase tracking-widest">{siteTagline}</p>
              </div>
            </div>
            <p className="text-emerald-100/70 text-sm leading-relaxed mb-6">
              {footerText}
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-emerald-900 border border-emerald-800 flex items-center justify-center text-emerald-400 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-gold-500 rounded-full"></span>
              Navigasi
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Profil Pesantren", href: "/profil" },
                { label: "Program Unggulan", href: "/program" },
                { label: "Pendaftaran (PSB)", href: "/psb" },
                { label: "Galeri Kegiatan", href: "/galeri" },
                { label: "Berita Terkini", href: "/berita" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-emerald-100/70 hover:text-gold-400 hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display font-semibold text-lg text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-gold-500 rounded-full"></span>
              Program Kami
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Pendidikan Formal", href: "/program/pendidikan" },
                { label: "Tahfidz Al-Quran", href: "/program/tahfidz" },
                { label: "Madrasah Diniyah", href: "/program/madin" },
                { label: "Entrepreneurship", href: "/program/entrepreneur" },
                { label: "Beasiswa Yatim", href: "/program/beasiswa" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-emerald-100/70 hover:text-gold-400 hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-gold-500 rounded-full"></span>
              Hubungi Kami
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-sm text-emerald-100/70 group">
                <div className="w-8 h-8 rounded-lg bg-emerald-900 flex items-center justify-center shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Jl. Raya Pesantren No. 99, Kecamatan Klojen, Kota Malang, Jawa Timur</span>
              </li>
              <li className="flex items-center gap-4 text-sm text-emerald-100/70 group">
                <div className="w-8 h-8 rounded-lg bg-emerald-900 flex items-center justify-center shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span>(0341) 123-4567</span>
              </li>
              <li className="flex items-center gap-4 text-sm text-emerald-100/70 group">
                <div className="w-8 h-8 rounded-lg bg-emerald-900 flex items-center justify-center shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@albisri.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-emerald-900 bg-emerald-950/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-100/40">
            <p>© {currentYear} {siteName}. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
              <Link href="/sitemap" className="hover:text-gold-400 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
