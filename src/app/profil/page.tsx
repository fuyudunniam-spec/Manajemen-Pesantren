import { PublicLayout } from "@/components/layout/PublicLayout";
import { Award, BookOpen, Users, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { getStaticPage } from "@/lib/actions/static-pages";

export async function generateMetadata() {
    const page = await getStaticPage("profil");

    return {
        title: page?.title || "Profil Pesantren",
        description: page?.meta_description || "Profil Pesantren",
    };
}

export default async function ProfilPage() {
    const page = await getStaticPage("profil");

    if (!page) {
        notFound();
    }

    // Parse content sections
    const historySection = page.content.find((section: any) => section.type === "history");
    const visionSection = page.content.find((section: any) => section.type === "vision");
    const missionSection = page.content.find((section: any) => section.type === "mission");
    const statsSection = page.content.find((section: any) => section.type === "stats");

    return (
        <PublicLayout>
            <div className="pt-20">
                {/* Header Hero */}
                <div className="bg-emerald-950 py-24 text-center relative overflow-hidden">
                    <div className="absolute inset-0 pattern-overlay opacity-5" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

                    <div className="relative z-10 container mx-auto px-4">
                        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-gold-400 text-xs font-bold tracking-widest uppercase mb-4">
                            Tentang Kami
                        </span>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                            {page.hero_title || page.title}
                        </h1>
                        {page.hero_subtitle && (
                            <p className="text-emerald-100/80 max-w-2xl mx-auto text-lg leading-relaxed">
                                {page.hero_subtitle}
                            </p>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="bg-slate-50 py-20">
                    <div className="container mx-auto px-4">
                        {/* Sejarah */}
                        {historySection && (
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                                <div>
                                    <h2 className="text-3xl font-display font-bold text-emerald-950 mb-6">
                                        {historySection.title}
                                    </h2>
                                    <div className="w-20 h-1 bg-gold-500 rounded-full mb-8" />
                                    <div className="prose prose-lg text-slate-600">
                                        <p className="leading-relaxed">{historySection.content}</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gold-500 rounded-3xl transform rotate-3 translate-x-2 translate-y-2 opacity-20" />
                                    <img
                                        src={historySection.image || "https://images.unsplash.com/photo-1542385263-8d0cd3879aa8?q=80&w=1000"}
                                        alt={historySection.title}
                                        className="rounded-3xl shadow-xl relative z-10 w-full object-cover h-[400px]"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Visi Misi */}
                        <div className="grid md:grid-cols-3 gap-8 mb-24">
                            {visionSection && (
                                <div className="bg-white p-8 rounded-2xl shadow-elevated border-t-4 border-emerald-600">
                                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 mb-6">
                                        <Award className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-emerald-950 mb-4">
                                        {visionSection.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {visionSection.content}
                                    </p>
                                </div>
                            )}

                            {missionSection && (
                                <div className="bg-white p-8 rounded-2xl shadow-elevated border-t-4 border-gold-500 md:col-span-2">
                                    <div className="w-14 h-14 bg-gold-100 rounded-xl flex items-center justify-center text-gold-600 mb-6">
                                        <BookOpen className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-emerald-950 mb-4">
                                        {missionSection.title}
                                    </h3>
                                    <ul className="grid md:grid-cols-2 gap-4 text-slate-600">
                                        {missionSection.items.map((item: string, index: number) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mt-0.5">
                                                    {index + 1}
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Statistik */}
                        {statsSection && (
                            <div className="bg-emerald-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                                <div className="absolute inset-0 pattern-overlay opacity-5" />
                                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                                    {statsSection.items.map((stat: any, i: number) => {
                                        const icons = [Clock, Users, Award, BookOpen];
                                        const Icon = icons[i] || Clock;
                                        return (
                                            <div key={i}>
                                                <Icon className="w-8 h-8 text-gold-400 mx-auto mb-4" />
                                                <div className="text-4xl font-display font-bold mb-2">{stat.value}</div>
                                                <div className="text-emerald-200 text-sm uppercase tracking-widest">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
