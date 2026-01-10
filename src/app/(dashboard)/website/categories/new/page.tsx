import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryForm } from "@/components/blog/CategoryForm";

export const metadata: Metadata = {
    title: "Tambah Kategori | e-Maktab",
    description: "Tambah kategori artikel baru",
};

export default function NewCategoryPage() {
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
                        Tambah Kategori
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Buat kategori baru untuk mengorganisir artikel
                    </p>
                </div>
            </div>

            {/* Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Informasi Kategori</CardTitle>
                    <CardDescription>
                        Isi formulir di bawah untuk membuat kategori baru
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CategoryForm />
                </CardContent>
            </Card>
        </div>
    );
}
