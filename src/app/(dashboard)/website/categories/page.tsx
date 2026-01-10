import { Metadata } from "next";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/lib/actions/categories";
import { CategoryList } from "@/components/blog/CategoryList";

export const metadata: Metadata = {
    title: "Kategori Artikel | e-Maktab",
    description: "Kelola kategori artikel dan berita",
};

export default async function CategoriesPage() {
    const categories = await getCategories(true); // Include inactive

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900">
                        Kategori Artikel
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Kelola kategori untuk mengorganisir artikel dan berita
                    </p>
                </div>
                <Link href="/dashboard/website/categories/new">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Kategori
                    </Button>
                </Link>
            </div>

            {/* Categories List */}
            <Card>
                <CardHeader>
                    <CardTitle>Daftar Kategori</CardTitle>
                    <CardDescription>
                        Total {categories.length} kategori
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CategoryList categories={categories} />
                </CardContent>
            </Card>
        </div>
    );
}
