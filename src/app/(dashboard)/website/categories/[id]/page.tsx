import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryForm } from "@/components/blog/CategoryForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Edit Kategori | e-Maktab",
    description: "Edit kategori artikel",
};

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = createClient();

    const { data: category, error } = await supabase
        .from("blog_categories")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !category) {
        notFound();
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/website/categories">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900">
                        Edit Kategori
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Perbarui informasi kategori {category.name}
                    </p>
                </div>
            </div>

            {/* Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Informasi Kategori</CardTitle>
                    <CardDescription>
                        Ubah informasi kategori sesuai kebutuhan
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CategoryForm category={category} />
                </CardContent>
            </Card>
        </div>
    );
}
