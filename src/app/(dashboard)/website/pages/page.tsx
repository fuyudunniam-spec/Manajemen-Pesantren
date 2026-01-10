'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, Search, Globe, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { getPages, deletePage, togglePublish } from '@/lib/actions/pages';

interface Page {
    id: string;
    slug: string;
    title: string;
    is_published: boolean;
    show_in_nav: boolean;
    updated_at: string;
}

export default function WebsitePagesPage() {
    const router = useRouter();
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const data = await getPages();
            setPages(data || []);
        } catch (error: any) {
            toast.error('Gagal memuat data', {
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            await deletePage(deleteId);
            toast.success('Halaman berhasil dihapus');
            setPages(pages.filter((p) => p.id !== deleteId));
            setDeleteId(null);
        } catch (error: any) {
            toast.error('Gagal menghapus halaman', {
                description: error.message,
            });
        }
    };

    const handleTogglePublish = async (id: string, currentStatus: boolean) => {
        // Optimistic UI update
        setPages(pages.map((p) => (p.id === id ? { ...p, is_published: !currentStatus } : p)));

        try {
            await togglePublish(id, currentStatus);
            toast.success(currentStatus ? 'Halaman di-unpublish' : 'Halaman dipublikasikan');
        } catch (error: any) {
            // Revert on error
            setPages(pages.map((p) => (p.id === id ? { ...p, is_published: currentStatus } : p)));
            toast.error('Gagal mengubah status', {
                description: error.message,
            });
        }
    };

    const filteredPages = pages.filter(
        (page) =>
            page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            page.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-display font-bold text-slate-900">
                            Halaman Statis
                        </h1>
                        <p className="text-sm text-slate-500">Kelola konten halaman website</p>
                    </div>
                </div>
                <Button
                    onClick={() => router.push('/dashboard/website/pages/new')}
                    className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                >
                    <Plus className="w-4 h-4" />
                    Tambah Halaman
                </Button>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Cari berdasarkan judul atau slug..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Daftar Halaman</CardTitle>
                    <CardDescription>Total {filteredPages.length} halaman</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8">
                            <p className="text-slate-500">Memuat data...</p>
                        </div>
                    ) : filteredPages.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-slate-500">
                                {searchQuery ? 'Tidak ada hasil pencarian' : 'Belum ada halaman'}
                            </p>
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Slug</TableHead>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Navigasi</TableHead>
                                        <TableHead>Terakhir Diubah</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPages.map((page) => (
                                        <TableRow key={page.id}>
                                            <TableCell className="font-mono text-sm">
                                                /{page.slug}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {page.title}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        page.is_published ? 'default' : 'secondary'
                                                    }
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        handleTogglePublish(
                                                            page.id,
                                                            page.is_published
                                                        )
                                                    }
                                                >
                                                    {page.is_published ? 'Published' : 'Draft'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {page.show_in_nav && (
                                                    <Badge variant="outline">Di Menu</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-sm text-slate-600">
                                                {formatDate(page.updated_at)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            window.open(
                                                                `/${page.slug}?preview=true`,
                                                                '_blank'
                                                            )
                                                        }
                                                        title="Preview"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            router.push(
                                                                `/dashboard/website/pages/${page.id}/edit`
                                                            )
                                                        }
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => setDeleteId(page.id)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Halaman?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Halaman akan dihapus secara
                            permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
