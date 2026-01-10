"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useSettings } from "@/hooks/useSettings";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Default nav items
const defaultNavItems: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Program", href: "/program" },
  { label: "Galeri", href: "/galeri" },
  { label: "Berita", href: "/berita" },
  { label: "Kontak", href: "/kontak" },
];

export function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { settings } = useSettings();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get site identity
  const siteName = settings.site_title || 'Albisri';
  const siteLogo = settings.site_logo;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled || isMenuOpen
          ? "bg-emerald-950/95 backdrop-blur-md border-emerald-900 shadow-lg py-2"
          : "bg-transparent border-transparent py-4"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`p-2 rounded-xl transition-colors duration-300 ${scrolled ? "bg-emerald-900" : "bg-white/10"}`}>
              {siteLogo ? (
                <img
                  src={siteLogo}
                  alt={siteName}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center text-gold-500 font-display font-bold text-xl">
                  <span className="group-hover:scale-110 transition-transform">ﻡ</span>
                </div>
              )}
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-white tracking-wide group-hover:text-gold-400 transition-colors">
                {siteName}
              </h1>
              <p className="text-[10px] text-emerald-200 uppercase tracking-[0.2em]">Pesantren Yatim</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {defaultNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group overflow-hidden ${pathname === item.href
                    ? "text-gold-400 bg-emerald-900/50"
                    : "text-emerald-100 hover:text-white hover:bg-white/5"
                  }`}
              >
                <span className="relative z-10">{item.label}</span>
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-emerald-900/50 rounded-full -z-0"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="text-emerald-100 hover:text-white hover:bg-emerald-900/50">
              <Link href="/login">Masuk</Link>
            </Button>
            <Button asChild size="sm" className="bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-full px-6 shadow-lg shadow-gold-500/20 border-none">
              <Link href="/donasi">Donasi Sekarang</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-emerald-100 hover:bg-emerald-900 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-emerald-950 border-b border-emerald-900 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {defaultNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors border border-transparent ${pathname === item.href
                      ? "bg-emerald-900/50 text-gold-400 border-emerald-800"
                      : "text-emerald-100 hover:text-white hover:bg-emerald-900/30"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-px bg-emerald-900 my-2" />
              <div className="grid grid-cols-2 gap-3">
                <Button asChild variant="outline" className="w-full border-emerald-800 text-emerald-100 hover:bg-emerald-900 bg-transparent">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>Masuk</Link>
                </Button>
                <Button asChild className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold border-none">
                  <Link href="/donasi" onClick={() => setIsMenuOpen(false)}>Donasi</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
