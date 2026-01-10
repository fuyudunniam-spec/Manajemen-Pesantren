"use client";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { ProgramSection } from "@/components/home/ProgramSection";
import { CTASection } from "@/components/home/CTASection";

export default function ProgramPage() {
    return (
        <PublicLayout>
            <div className="pt-20">
                <div className="bg-emerald-950 py-20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 pattern-overlay opacity-5" />
                    <div className="relative z-10 container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Program Pendidikan</h1>
                        <p className="text-emerald-100/80 max-w-2xl mx-auto">Kurikulum komprehensif untuk mencetak generasi berilmu dan berakhlak.</p>
                    </div>
                </div>
                <ProgramSection />
                <div className="pb-12">
                    <CTASection />
                </div>
            </div>
        </PublicLayout>
    );
}
