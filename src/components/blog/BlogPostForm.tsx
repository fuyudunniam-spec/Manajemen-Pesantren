"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createBlogPost, updateBlogPost, BlogPost } from "@/lib/actions/blog";
import { generateSlug } from "@/lib/blog-utils";
import { BlogCategory } from "@/lib/actions/categories";
import { useToast } from "@/hooks/use-toast";

interface BlogPostFormProps {
    categories: BlogCategory[];
    post?: BlogPost;
}

export function BlogPostForm({ categories, post }: BlogPostFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [title, setTitle] = useState(post?.title || "");
    const [slug, setSlug] = useState(post?.slug || "");
    const [excerpt, setExcerpt] = useState(post?.excerpt || "");
    const [content, setContent] = useState(post?.content || "");
    const [featuredImage, setFeaturedImage] = useState(post?.featured_image || "");
    const [imageCaption, setImageCaption] = useState(post?.image_caption || "");
    const [categoryId, setCategoryId] = useState(post?.category_id || "");
    const [tags, setTags] = useState(post?.tags?.join(", ") || "");
    const [isPublished, setIsPublished] = useState(post?.is_published || false);

    const handleTitleChange = (value: string) => {
        setTitle(value);
        // Auto-generate slug if creating new post
        if (!post) {
            setSlug(generateSlug(value));
        }
    };

    const handleSubmit = async (publishNow: boolean) => {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("excerpt", excerpt);
        formData.append("content", content);
        formData.append("featured_image", featuredImage);
        formData.append("image_caption", imageCaption);
        formData.append("category_id", categoryId);
        formData.append("tags", tags);
        formData.append("is_published", publishNow.toString());

        try {
            if (post) {
                await updateBlogPost(post.id, formData);
                toast({
                    title: "Berhasil",
                    description: "Artikel berhasil diperbarui",
                });
            } else {
                await createBlogPost(formData);
                toast({
                    title: "Berhasil",
                    description: publishNow ? "Artikel berhasil dipublikasikan" : "Draft berhasil disimpan",
                });
            }
            router.push("/dashboard/website/blog");
            router.refresh();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Gagal menyimpan artikel",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Konten Artikel</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul Artikel *</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                required
                                placeholder="Masukkan judul artikel"
                                className="text-lg font-semibold"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug URL *</Label>
                            <Input
                                id="slug"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                required
                                placeholder="judul-artikel"
                            />
                            <p className="text-xs text-slate-500">
                                URL: /berita/{slug || "judul-artikel"}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="excerpt">Ringkasan *</Label>
                            <Textarea
                                id="excerpt"
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                required
                                placeholder="Tulis ringkasan singkat artikel (ditampilkan di halaman daftar)"
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Konten Artikel *</Label>
                            <Textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                placeholder="Tulis konten lengkap artikel di sini..."
                                rows={15}
                                className="font-sans"
                            />
                            <p className="text-xs text-slate-500">
                                Tip: Gunakan paragraf untuk memisahkan konten. Tekan Enter dua kali untuk paragraf baru.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Gambar Unggulan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="featuredImage">URL Gambar</Label>
                            <Input
                                id="featuredImage"
                                type="url"
                                value={featuredImage}
                                onChange={(e) => setFeaturedImage(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        {featuredImage && (
                            <div className="rounded-lg overflow-hidden border border-slate-200">
                                <img
                                    src={featuredImage}
                                    alt="Preview"
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=Invalid+Image+URL";
                                    }}
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="imageCaption">Caption Gambar</Label>
                            <Input
                                id="imageCaption"
                                value={imageCaption}
                                onChange={(e) => setImageCaption(e.target.value)}
                                placeholder="Keterangan gambar"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Publikasi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <Button
                                onClick={() => handleSubmit(true)}
                                disabled={isSubmitting || !title || !slug || !excerpt || !content}
                                className="w-full bg-emerald-600 hover:bg-emerald-700"
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                {post?.is_published ? "Perbarui & Publikasikan" : "Publikasikan"}
                            </Button>
                            <Button
                                onClick={() => handleSubmit(false)}
                                disabled={isSubmitting || !title || !slug || !excerpt || !content}
                                variant="outline"
                                className="w-full"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Simpan sebagai Draft
                            </Button>
                        </div>

                        {post && (
                            <div className="pt-3 border-t text-xs text-slate-500 space-y-1">
                                <div>Status: {post.is_published ? "Terpublikasi" : "Draft"}</div>
                                {post.published_at && (
                                    <div>Dipublikasi: {new Date(post.published_at).toLocaleDateString("id-ID")}</div>
                                )}
                                <div>Terakhir diubah: {new Date(post.updated_at).toLocaleDateString("id-ID")}</div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Kategori & Tag</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Kategori</Label>
                            <Select value={categoryId} onValueChange={setCategoryId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-3 h-3 rounded"
                                                    style={{ backgroundColor: category.color }}
                                                />
                                                {category.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tags">Tag</Label>
                            <Input
                                id="tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="tag1, tag2, tag3"
                            />
                            <p className="text-xs text-slate-500">
                                Pisahkan tag dengan koma
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
