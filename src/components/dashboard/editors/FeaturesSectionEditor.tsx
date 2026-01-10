import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ICON_OPTIONS, renderIcon } from '@/lib/iconMap';
import { Plus, Trash2, GripVertical, Save, Loader2 } from 'lucide-react';

interface FeatureItem {
    icon: string;
    title: string;
    description: string;
}

interface FeaturesSectionEditorProps {
    sectionId: string;
    initialTitle: string;
    initialSubtitle: string;
    initialContent: { items?: FeatureItem[] };
    onSave: (data: { title: string; subtitle: string; content: { items: FeatureItem[] } }) => Promise<void>;
    onCancel: () => void;
}

export function FeaturesSectionEditor({
    sectionId,
    initialTitle,
    initialSubtitle,
    initialContent,
    onSave,
    onCancel,
}: FeaturesSectionEditorProps) {
    const [title, setTitle] = useState(initialTitle || '');
    const [subtitle, setSubtitle] = useState(initialSubtitle || '');
    const [items, setItems] = useState<FeatureItem[]>(
        initialContent?.items || [
            { icon: 'book', title: '', description: '' },
        ]
    );
    const [saving, setSaving] = useState(false);

    const handleAddItem = () => {
        setItems([...items, { icon: 'book', title: '', description: '' }]);
    };

    const handleRemoveItem = (index: number) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const handleItemChange = (index: number, field: keyof FeatureItem, value: string) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave({
                title,
                subtitle,
                content: { items },
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Section Title & Subtitle */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Informasi Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Judul Section</Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Mengapa Memilih Pondok Pesantren Kami?"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Subtitle / Deskripsi</Label>
                        <Textarea
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            placeholder="Deskripsi singkat tentang keunggulan..."
                            className="min-h-[80px]"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Feature Items */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Daftar Fitur / Keunggulan</CardTitle>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddItem}
                        className="gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Fitur
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="relative border rounded-lg p-4 bg-slate-50/50 space-y-4"
                        >
                            {/* Item Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <GripVertical className="w-4 h-4" />
                                    <span>Fitur #{index + 1}</span>
                                </div>
                                {items.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemoveItem(index)}
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>

                            {/* Icon Selector */}
                            <div className="space-y-2">
                                <Label>Ikon</Label>
                                <Select
                                    value={item.icon}
                                    onValueChange={(value) => handleItemChange(index, 'icon', value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue>
                                            <div className="flex items-center gap-2">
                                                {renderIcon(item.icon, 'w-4 h-4')}
                                                <span>{ICON_OPTIONS.find(o => o.value === item.icon)?.label || item.icon}</span>
                                            </div>
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ICON_OPTIONS.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                <div className="flex items-center gap-2">
                                                    {renderIcon(option.value, 'w-4 h-4')}
                                                    <span>{option.label}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Title */}
                            <div className="space-y-2">
                                <Label>Judul Fitur</Label>
                                <Input
                                    value={item.title}
                                    onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                                    placeholder="Contoh: Kurikulum Terpadu"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label>Deskripsi</Label>
                                <Textarea
                                    value={item.description}
                                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                    placeholder="Deskripsi singkat tentang fitur ini..."
                                    className="min-h-[80px]"
                                />
                            </div>
                        </div>
                    ))}

                    {items.length === 0 && (
                        <div className="text-center py-8 text-slate-500">
                            <p>Belum ada fitur. Klik "Tambah Fitur" untuk menambahkan.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Batal
                </Button>
                <Button onClick={handleSave} disabled={saving} className="gap-2">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Simpan Perubahan
                </Button>
            </div>
        </div>
    );
}
