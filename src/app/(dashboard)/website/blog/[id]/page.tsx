import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BlogPostForm } from "@/components/blog/BlogPostForm";
import { getCategories } from "@/lib/actions/categories";
import { getBlogPostById } from "@/lib/actions/blog";

export const metadata: Metadata = {
    title: "Edit Artikel | e-Maktab",
    description: "Edit artikel",
};

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [categories, post] = await Promise.all([
        getCategories(),
        getBlogPostById(id),
    ]);

    if (!post) {
        notFound();
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/website/blog">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900">
                        Edit Artikel
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Perbarui konten artikel
                    </p>
                </div>
            </div>

            {/* Form */}
            <BlogPostForm categories={categories} post={post} />
        </div>
    );
}
