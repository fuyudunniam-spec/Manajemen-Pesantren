'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Loader2, AlertTriangle } from 'lucide-react';

interface PageData {
    id: string;
    slug: string;
    title: string;
    content: string;
    hero_image?: string;
    page_type?: string;
    is_published: boolean;
}

export default function GenericLandingPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const { user } = useAuth();
    const [page, setPage] = useState<PageData | null>(null);
    const [loading, setLoading] = useState(true);

    const slug = params?.slug as string;
    const isPreview = searchParams?.get('preview') === 'true';

    useEffect(() => {
        async function fetchPage() {
            if (!slug) {
                setLoading(false);
                return;
            }

            try {
                let query = supabase
                    .from('website_pages')
                    .select('*')
                    .eq('slug', slug);

                // If not preview mode, only show published pages
                if (!isPreview || !user) {
                    query = query.eq('is_published', true);
                }

                const { data, error } = await query.single();

                if (error) throw error;

                setPage(data);
                if (data.title) {
                    document.title = `${data.title} - e-Maktab`;
                }
            } catch (err) {
                console.error('Error fetching page:', err);
                setPage(null);
            } finally {
                setLoading(false);
            }
        }

        fetchPage();
    }, [slug, isPreview, user]);

    if (loading) {
        return (
            <PublicLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </PublicLayout>
        );
    }

    if (!page) {
        return (
            <PublicLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                    <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">404</h1>
                    <p className="text-slate-600 mb-8">Halaman tidak ditemukan</p>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            {/* Preview Banner */}
            {isPreview && page && !page.is_published && (
                <div className="bg-amber-500 text-amber-950 px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Mode Preview - Halaman ini belum dipublikasikan
                </div>
            )}

            {/* Hero Section with Background Image */}
            {page.hero_image && (
                <section
                    className="relative h-96 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${page.hero_image})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
                    <div className="relative container mx-auto px-4 h-full flex items-center">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                                {page.title}
                            </h1>
                        </div>
                    </div>
                </section>
            )}

            {/* Title (if no hero image) */}
            {!page.hero_image && (
                <section className="bg-gradient-to-br from-primary to-primary-dark py-16">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white">
                            {page.title}
                        </h1>
                    </div>
                </section>
            )}

            {/* Content */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div
                        className="prose prose-lg prose-slate max-w-none 
                       prose-headings:font-display prose-headings:text-foreground
                       prose-p:text-muted-foreground prose-p:leading-relaxed
                       prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                       prose-strong:text-foreground prose-strong:font-semibold
                       prose-img:rounded-xl prose-img:shadow-lg"
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                </div>
            </section>
        </PublicLayout>
    );
}
