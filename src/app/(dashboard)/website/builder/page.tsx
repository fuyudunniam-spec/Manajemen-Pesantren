'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { Layout, Plus, Edit, Trash2, Copy, GripVertical, Eye, EyeOff, Filter } from 'lucide-react';
import { toast } from 'sonner';
import {
    getSections,
    deleteSection,
    duplicateSection,
    toggleSectionVisibility,
    reorderSections,
} from '@/lib/actions/sections';

interface Section {
    id: string;
    section_key: string;
    page: string;
    section_type: string;
    title: string;
    is_visible: boolean;
    order_index: number;
}

function SortableItem({ section, onEdit, onDelete, onDuplicate, onToggleVisibility }: any) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: section.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const sectionTypeColors: Record<string, string> = {
        hero: 'bg-purple-100 text-purple-700 border-purple-300',
        features: 'bg-blue-100 text-blue-700 border-blue-300',
        cta: 'bg-orange-100 text-orange-700 border-orange-300',
        stats: 'bg-green-100 text-green-700 border-green-300',
        contact: 'bg-pink-100 text-pink-700 border-pink-300',
        generic: 'bg-gray-100 text-gray-700 border-gray-300',
    };

    return (
        <div ref={setNodeRef} style={style} className="bg-white border rounded-lg p-4 mb-3">
            <div className="flex items-center gap-3">
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                >
                    <GripVertical className="w-5 h-5" />
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-slate-900">{section.title || 'Untitled'}</h3>
                        <Badge variant="outline" className={sectionTypeColors[section.section_type] || sectionTypeColors.generic}>
                            {section.section_type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                            {section.page}
                        </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">{section.section_key}</p>
                </div>

                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onToggleVisibility(section.id, section.is_visible)}
                        className={section.is_visible ? 'text-green-600' : 'text-muted-foreground'}
                    >
                        {section.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onEdit(section.id)}>
                        <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDuplicate(section.id)}>
                        <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(section.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function VisualPageBuilderPage() {
    const router = useRouter();
    const [sections, setSections] = useState<Section[]>([]);
    const [filteredSections, setFilteredSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [filterPage, setFilterPage] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        fetchSections();
    }, []);

    useEffect(() => {
        let filtered = sections;

        if (filterPage !== 'all') {
            filtered = filtered.filter((s) => s.page === filterPage);
        }

        if (searchQuery) {
            filtered = filtered.filter(
                (s) =>
                    s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.section_key.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredSections(filtered);
    }, [sections, filterPage, searchQuery]);

    const fetchSections = async () => {
        try {
            const data = await getSections();
            setSections(data || []);
        } catch (error: any) {
            toast.error('Gagal memuat data', {
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = filteredSections.findIndex((s) => s.id === active.id);
            const newIndex = filteredSections.findIndex((s) => s.id === over.id);

            const newOrder = arrayMove(filteredSections, oldIndex, newIndex);
            setFilteredSections(newOrder);

            // Update order_index in database
            const updates = newOrder.map((section, index) => ({
                id: section.id,
                order_index: index,
            }));

            try {
                await reorderSections(updates);
                toast.success('Urutan berhasil diubah');
            } catch (error: any) {
                toast.error('Gagal mengubah urutan', {
                    description: error.message,
                });
                fetchSections(); // Revert on error
            }
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            await deleteSection(deleteId);
            toast.success('Section berhasil dihapus');
            setSections(sections.filter((s) => s.id !== deleteId));
            setDeleteId(null);
        } catch (error: any) {
            toast.error('Gagal menghapus section', {
                description: error.message,
            });
        }
    };

    const handleDuplicate = async (id: string) => {
        try {
            await duplicateSection(id);
            toast.success('Section berhasil diduplikasi');
            fetchSections();
        } catch (error: any) {
            toast.error('Gagal menduplikasi section', {
                description: error.message,
            });
        }
    };

    const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
        // Optimistic UI
        setSections(sections.map((s) => (s.id === id ? { ...s, is_visible: !currentStatus } : s)));

        try {
            await toggleSectionVisibility(id, currentStatus);
            toast.success(currentStatus ? 'Section disembunyikan' : 'Section ditampilkan');
        } catch (error: any) {
            // Revert on error
            setSections(sections.map((s) => (s.id === id ? { ...s, is_visible: currentStatus } : s)));
            toast.error('Gagal mengubah visibility', {
                description: error.message,
            });
        }
    };

    const pages = Array.from(new Set(sections.map((s) => s.page)));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
                        <Layout className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-display font-bold text-slate-900">
                            Visual Page Builder
                        </h1>
                        <p className="text-sm text-slate-500">
                            Atur section website dengan drag & drop
                        </p>
                    </div>
                </div>
                <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4" />
                    Tambah Section
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Cari section..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Select value={filterPage} onValueChange={setFilterPage}>
                            <SelectTrigger className="w-48">
                                <Filter className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="Filter halaman" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Halaman</SelectItem>
                                {pages.map((page) => (
                                    <SelectItem key={page} value={page}>
                                        {page}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Sections List with Drag & Drop */}
            <Card>
                <CardHeader>
                    <CardTitle>Sections</CardTitle>
                    <CardDescription>
                        Drag untuk mengubah urutan, total {filteredSections.length} section
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8 text-muted-foreground">
                            Memuat data...
                        </div>
                    ) : filteredSections.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            {searchQuery || filterPage !== 'all'
                                ? 'Tidak ada hasil'
                                : 'Belum ada section'}
                        </div>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={filteredSections.map((s) => s.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {filteredSections.map((section) => (
                                    <SortableItem
                                        key={section.id}
                                        section={section}
                                        onEdit={(id: string) =>
                                            router.push(`/dashboard/website/builder/${id}/edit`)
                                        }
                                        onDelete={setDeleteId}
                                        onDuplicate={handleDuplicate}
                                        onToggleVisibility={handleToggleVisibility}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    )}
                </CardContent>
            </Card>

            {/* Delete Dialog */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Section?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Section akan dihapus secara permanen.
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
