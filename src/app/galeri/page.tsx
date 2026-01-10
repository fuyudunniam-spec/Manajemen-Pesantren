"use client";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { GallerySection } from "@/components/home/GallerySection";

export default function GalleryPage() {
    return (
        <PublicLayout>
            <div className="pt-20">
                <div className="bg-emerald-950 py-20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 pattern-overlay opacity-5" />
                    <div className="relative z-10 container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Galeri Kami</h1>
                        <p className="text-emerald-100/80 max-w-2xl mx-auto">Dokumentasi kegiatan dan fasilitas di Pesantren Albisri.</p>
                    </div>
                </div>
                <GallerySection />
            </div>
        </PublicLayout>
    );
}
