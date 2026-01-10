import { Metadata } from "next";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { getBlogPosts } from "@/lib/actions/blog";

export const metadata: Metadata = {
    title: "Manajemen Blog | e-Maktab",
    description: "Kelola artikel dan berita",
};

export default async function BlogManagementPage() {
    const posts = await getBlogPosts({ published: undefined }); // Get all posts

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900">
                        Manajemen Blog
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Kelola artikel dan berita pesantren
                    </p>
                </div>
                <Link href="/dashboard/website/blog/new">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Tulis Artikel
                    </Button>
                </Link>
            </div>

            {/* Blog List */}
            <Card>
                <CardHeader>
                    <CardTitle>Daftar Artikel</CardTitle>
                    <CardDescription>
                        Total {posts.length} artikel
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BlogPostList posts={posts} />
                </CardContent>
            </Card>
        </div>
    );
}
