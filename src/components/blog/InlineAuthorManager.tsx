'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus, Loader2, User } from 'lucide-react';
import { createAuthor } from '@/lib/actions/authors';
import { toast } from 'sonner';
import { MediaUpload } from '@/components/dashboard/MediaUpload;

interface InlineAuthorManagerProps {
    authors: { id: string; name: string; photo?: string }[];
    selectedAuthorId?: string;
    onAuthorSelect: (authorId: string) => void;
    onAuthorCreated?: () => void;
}

export function InlineAuthorManager({
    authors,
    selectedAuthorId,
    onAuthorSelect,
    onAuthorCreated,
}: InlineAuthorManagerProps) {
    const [showNewAuthorDialog, setShowNewAuthorDialog] = useState(false);
    const [creating, setCreating] = useState(false);

    // New author form state
    const [newAuthorName, setNewAuthorName] = useState('');
    const [newAuthorBio, setNewAuthorBio] = useState('');
    const [newAuthorPhoto, setNewAuthorPhoto] = useState('');

    const handleCreateAuthor = async () => {
        if (!newAuthorName.trim()) {
            toast.error('Nama penulis harus diisi');
            return;
        }

        setCreating(true);

        const formData = new FormData();
        formData.append('name', newAuthorName);
        formData.append('bio', newAuthorBio);
        formData.append('photo', newAuthorPhoto);

        try {
            const result = await createAuthor(formData);
            toast.success('Penulis baru berhasil ditambahkan');

            // Select the newly created author
            onAuthorSelect(result.id);

            // Reset form
            setNewAuthorName('');
            setNewAuthorBio('');
            setNewAuthorPhoto('');
            setShowNewAuthorDialog(false);

            // Notify parent to refresh authors list
            if (onAuthorCreated) {
                onAuthorCreated();
            }
        } catch (error: any) {
            toast.error('Gagal menambahkan penulis', {
                description: error.message,
            });
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="author">Penulis</Label>
                <Button
                    type="button"
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-blue-600 font-bold hover:text-blue-700"
                    onClick={() => setShowNewAuthorDialog(true)}
                >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    Penulis Baru
                </Button>
            </div>

            <Select value={selectedAuthorId} onValueChange={onAuthorSelect}>
                <SelectTrigger>
                    <SelectValue placeholder="Pilih penulis" />
                </SelectTrigger>
                <SelectContent>
                    {authors.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                            <div className="flex items-center gap-2">
                                {author.photo ? (
                                    <img
                                        src={author.photo}
                                        alt={author.name}
                                        className="w-5 h-5 rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="w-4 h-4 text-slate-400" />
                                )}
                                {author.name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* New Author Dialog */}
            <Dialog open={showNewAuthorDialog} onOpenChange={setShowNewAuthorDialog}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Penulis Baru</DialogTitle>
                        <DialogDescription>
                            Isi data penulis baru. Anda bisa langsung memilihnya setelah disimpan.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="newAuthorName">Nama Penulis *</Label>
                            <Input
                                id="newAuthorName"
                                placeholder="Contoh: Ahmad Fauzi"
                                value={newAuthorName}
                                onChange={(e) => setNewAuthorName(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="newAuthorBio">Bio / Deskripsi</Label>
                            <Textarea
                                id="newAuthorBio"
                                placeholder="Tuliskan sedikit tentang penulis (opsional)"
                                value={newAuthorBio}
                                onChange={(e) => setNewAuthorBio(e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Foto Profil</Label>
                            <MediaUpload
                                id="new-author-photo"
                                defaultValue={newAuthorPhoto}
                                onUploadComplete={setNewAuthorPhoto}
                                bucket="website-assets"
                            />
                            <p className="text-xs text-slate-500">
                                Upload foto profil penulis (opsional)
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowNewAuthorDialog(false)}
                            disabled={creating}
                        >
                            Batal
                        </Button>
                        <Button
                            type="button"
                            onClick={handleCreateAuthor}
                            disabled={creating || !newAuthorName.trim()}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            {creating ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Tambah Penulis
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
