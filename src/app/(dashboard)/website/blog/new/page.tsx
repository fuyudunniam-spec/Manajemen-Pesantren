import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogPostForm } from "@/components/blog/BlogPostForm";
import { getCategories } from "@/lib/actions/categories";

export const metadata: Metadata = {
    title: "Tulis Artikel | e-Maktab",
    description: "Buat artikel baru",
};

export default async function NewBlogPostPage() {
    const categories = await getCategories();

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
                        Tulis Artikel Baru
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Buat artikel atau berita untuk website
                    </p>
                </div>
            </div>

            {/* Form */}
            <BlogPostForm categories={categories} />
        </div>
    );
}
