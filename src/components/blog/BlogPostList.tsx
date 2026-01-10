"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Eye, EyeOff, Calendar, User } from "lucide-react";
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
import { BlogPost, deleteBlogPost, togglePublishStatus } from "@/lib/actions/blog";
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
import { CategoryBadge } from "./CategoryBadge";

interface BlogPostListProps {
    posts: BlogPost[];
}

export function BlogPostList({ posts: initialPosts }: BlogPostListProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [posts, setPosts] = useState(initialPosts);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

    const filteredPosts = posts.filter(post => {
        if (filter === "published") return post.is_published;
        if (filter === "draft") return !post.is_published;
        return true;
    });

    const handleTogglePublish = async (id: string, currentStatus: boolean) => {
        try {
            await togglePublishStatus(id, !currentStatus);
            setPosts(posts =>
                posts.map(post =>
                    post.id === id ? { ...post, is_published: !currentStatus } : post
                )
            );
            toast({
                title: "Berhasil",
                description: currentStatus ? "Artikel dijadikan draft" : "Artikel dipublikasikan",
            });
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Gagal mengubah status publikasi",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        setIsDeleting(true);
        try {
            await deleteBlogPost(deleteId);
            setPosts(posts => posts.filter(post => post.id !== deleteId));
            toast({
                title: "Berhasil",
                description: "Artikel berhasil dihapus",
            });
            router.refresh();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Gagal menghapus artikel",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <>
            {/* Filters */}
            <div className="flex gap-2 mb-4">
                <Button
                    variant={filter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("all")}
                    className={filter === "all" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                >
                    Semua ({posts.length})
                </Button>
                <Button
                    variant={filter === "published" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("published")}
                    className={filter === "published" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                >
                    Terpublikasi ({posts.filter(p => p.is_published).length})
                </Button>
                <Button
                    variant={filter === "draft" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("draft")}
                    className={filter === "draft" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                >
                    Draft ({posts.filter(p => !p.is_published).length})
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Judul</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredPosts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-slate-500 py-8">
                                {filter === "all" ? "Belum ada artikel" : `Tidak ada artikel ${filter === "published" ? "terpublikasi" : "draft"}`}
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredPosts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell>
                                    <div>
                                        <div className="font-medium">{post.title}</div>
                                        <div className="text-sm text-slate-500 line-clamp-1">{post.excerpt}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {post.blog_categories ? (
                                        <CategoryBadge
                                            name={post.blog_categories.name}
                                            color={post.blog_categories.color}
                                        />
                                    ) : (
                                        <span className="text-slate-400 text-sm">-</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-slate-600">
                                        {post.is_published && post.published_at
                                            ? formatDate(post.published_at)
                                            : formatDate(post.created_at)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {post.is_published ? (
                                        <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">
                                            Terpublikasi
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary">Draft</Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleTogglePublish(post.id, post.is_published)}
                                            title={post.is_published ? "Jadikan Draft" : "Publikasikan"}
                                        >
                                            {post.is_published ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => router.push(`/dashboard/website/blog/${post.id}`)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setDeleteId(post.id)}
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
                        <AlertDialogTitle>Hapus Artikel?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Artikel akan dihapus secara permanen.
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
