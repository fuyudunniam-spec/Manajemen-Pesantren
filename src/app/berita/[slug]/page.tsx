import { PublicLayout } from "@/components/layout/PublicLayout";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getBlogPost } from "@/lib/actions/blog";
import { CategoryBadge } from "@/components/blog/CategoryBadge";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        return {
            title: "Artikel Tidak Ditemukan",
        };
    }

    return {
        title: `${post.title} | e-Maktab`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <PublicLayout>
            <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Back Button */}
                    <Link href="/berita">
                        <Button variant="ghost" className="mb-6">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke Berita
                        </Button>
                    </Link>

                    <article className="bg-white rounded-2xl overflow-hidden shadow-sm">
                        {/* Featured Image */}
                        {post.featured_image && (
                            <div className="relative h-[400px] overflow-hidden">
                                <img
                                    src={post.featured_image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                                {post.image_caption && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm py-2 px-4">
                                        {post.image_caption}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="p-8 md:p-12">
                            {/* Category and Date */}
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                {post.blog_categories && (
                                    <CategoryBadge
                                        name={post.blog_categories.name}
                                        color={post.blog_categories.color}
                                    />
                                )}
                                <span className="flex items-center gap-2 text-slate-600 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(post.published_at || post.created_at)}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-emerald-950 mb-6">
                                {post.title}
                            </h1>

                            {/* Excerpt */}
                            <p className="text-xl text-slate-600 leading-relaxed mb-8 pb-8 border-b border-slate-200">
                                {post.excerpt}
                            </p>

                            {/* Content */}
                            <div className="prose prose-lg max-w-none prose-headings:text-emerald-950 prose-headings:font-display prose-a:text-emerald-600 prose-strong:text-emerald-950">
                                {post.content.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="mb-4 text-slate-700 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-slate-200">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-sm font-semibold text-slate-600">Tags:</span>
                                        {post.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Share */}
                            <div className="mt-8 pt-8 border-t border-slate-200">
                                <Button variant="outline" className="gap-2">
                                    <Share2 className="w-4 h-4" />
                                    Bagikan Artikel
                                </Button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </PublicLayout>
    );
}
