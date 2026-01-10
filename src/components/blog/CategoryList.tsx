"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BlogCategory, deleteCategory, toggleCategoryStatus } from "@/lib/actions/categories";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface CategoryListProps {
    categories: BlogCategory[];
}

export function CategoryList({ categories: initialCategories }: CategoryListProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [categories, setCategories] = useState(initialCategories);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            await toggleCategoryStatus(id, !currentStatus);
            setCategories(cats =>
                cats.map(cat =>
                    cat.id === id ? { ...cat, is_active: !currentStatus } : cat
                )
            );
            toast({
                title: "Berhasil",
                description: "Status kategori berhasil diubah",
            });
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Gagal mengubah status kategori",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        setIsDeleting(true);
        try {
            await deleteCategory(deleteId);
            setCategories(cats => cats.filter(cat => cat.id !== deleteId));
            toast({
                title: "Berhasil",
                description: "Kategori berhasil dihapus",
            });
            router.refresh();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Gagal menghapus kategori",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Warna</TableHead>
                        <TableHead>Urutan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-slate-500 py-8">
                                Belum ada kategori
                            </TableCell>
                        </TableRow>
                    ) : (
                        categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="font-medium">{category.name}</TableCell>
                                <TableCell className="text-slate-500">{category.slug}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-6 h-6 rounded border border-slate-200"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <span className="text-xs text-slate-500">{category.color}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{category.display_order}</TableCell>
                                <TableCell>
                                    {category.is_active ? (
                                        <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">
                                            Aktif
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary">Nonaktif</Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleToggleStatus(category.id, category.is_active)}
                                            title={category.is_active ? "Nonaktifkan" : "Aktifkan"}
                                        >
                                            {category.is_active ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => router.push(`/dashboard/website/categories/${category.id}`)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setDeleteId(category.id)}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Kategori?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Kategori yang memiliki artikel tidak dapat dihapus.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? "Menghapus..." : "Hapus"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
