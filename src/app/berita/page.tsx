import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getBlogPosts } from "@/lib/actions/blog";
import { getCategories } from "@/lib/actions/categories";
import { CategoryBadge } from "@/components/blog/CategoryBadge";

export default async function NewsPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) {
    const params = await searchParams;
    const [posts, categories] = await Promise.all([
        getBlogPosts({ published: true }),
        getCategories(),
    ]);

    // Filter by category if specified
    const filteredPosts = params.category
        ? posts.filter(post => post.blog_categories?.slug === params.category)
        : posts;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <PublicLayout>
            <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-emerald-950 mb-4">
                            Berita & Artikel
                        </h1>
                        <p className="text-slate-600">
                            Kabar terkini seputar kegiatan pesantren, prestasi santri, dan artikel islami.
                        </p>
                    </div>

                    {/* Category Filter */}
                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 justify-center mb-12">
                            <Link href="/berita">
                                <Button
                                    variant={!params.category ? "default" : "outline"}
                                    className={!params.category ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                                >
                                    Semua
                                </Button>
                            </Link>
                            {categories.map((category) => (
                                <Link key={category.id} href={`/berita?category=${category.slug}`}>
                                    <Button
                                        variant={params.category === category.slug ? "default" : "outline"}
                                        className={params.category === category.slug ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                                    >
                                        {category.name}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    )}

                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-slate-500 text-lg">Belum ada artikel yang dipublikasikan.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-100 group"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={post.featured_image || "https://images.unsplash.com/photo-1542385263-8d0cd3879aa8?q=80&w=1000"}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {post.blog_categories && (
                                            <div className="absolute top-4 left-4">
                                                <CategoryBadge
                                                    name={post.blog_categories.name}
                                                    color={post.blog_categories.color}
                                                    className="bg-white/90 backdrop-blur-sm"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(post.published_at || post.created_at)}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-emerald-950 mb-3 line-clamp-2 hover:text-gold-500 transition-colors">
                                            <Link href={`/berita/${post.slug}`}>{post.title}</Link>
                                        </h3>
                                        <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        <Link
                                            href={`/berita/${post.slug}`}
                                            className="inline-flex items-center text-emerald-700 font-semibold text-sm group-hover:text-gold-500 transition-colors"
                                        >
                                            Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
