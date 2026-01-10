"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCategory, updateCategory, BlogCategory } from "@/lib/actions/categories";
import { generateSlug } from "@/lib/blog-utils";
import { useToast } from "@/hooks/use-toast";

interface CategoryFormProps {
    category?: BlogCategory;
}

export function CategoryForm({ category }: CategoryFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState(category?.name || "");
    const [slug, setSlug] = useState(category?.slug || "");
    const [description, setDescription] = useState(category?.description || "");
    const [color, setColor] = useState(category?.color || "#059669");
    const [displayOrder, setDisplayOrder] = useState(category?.display_order?.toString() || "0");
    const [isActive, setIsActive] = useState(category?.is_active ?? true);

    const handleNameChange = (value: string) => {
        setName(value);
        // Auto-generate slug if creating new category
        if (!category) {
            setSlug(generateSlug(value));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("slug", slug);
        formData.append("description", description);
        formData.append("color", color);
        formData.append("display_order", displayOrder);
        formData.append("is_active", isActive.toString());

        try {
            if (category) {
                await updateCategory(category.id, formData);
                toast({
                    title: "Berhasil",
                    description: "Kategori berhasil diperbarui",
                });
            } else {
                await createCategory(formData);
                toast({
                    title: "Berhasil",
                    description: "Kategori berhasil dibuat",
                });
            }
            router.push("/dashboard/website/categories");
            router.refresh();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Gagal menyimpan kategori",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">Nama Kategori *</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        required
                        placeholder="Pengumuman"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                        placeholder="pengumuman"
                    />
                    <p className="text-xs text-slate-500">URL-friendly version dari nama</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="color">Warna</Label>
                    <div className="flex gap-2">
                        <Input
                            id="color"
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-20 h-10 cursor-pointer"
                        />
                        <Input
                            type="text"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            placeholder="#059669"
                            className="flex-1"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="displayOrder">Urutan Tampilan</Label>
                    <Input
                        id="displayOrder"
                        type="number"
                        value={displayOrder}
                        onChange={(e) => setDisplayOrder(e.target.value)}
                        min="0"
                    />
                    <p className="text-xs text-slate-500">Semakin kecil, semakin di depan</p>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Deskripsi singkat tentang kategori ini"
                    rows={3}
                />
            </div>

            {category && (
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="isActive"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <Label htmlFor="isActive" className="cursor-pointer">
                        Kategori aktif
                    </Label>
                </div>
            )}

            <div className="flex gap-3 pt-4">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-600 hover:bg-emerald-700"
                >
                    {isSubmitting ? "Menyimpan..." : category ? "Perbarui Kategori" : "Buat Kategori"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                >
                    Batal
                </Button>
            </div>
        </form>
    );
}


