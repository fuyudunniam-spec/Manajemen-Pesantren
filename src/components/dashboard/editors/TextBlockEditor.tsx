import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Save, Loader2 } from 'lucide-react';

interface TextBlockEditorProps {
    sectionId: string;
    initialTitle: string;
    initialSubtitle: string;
    initialContent: Record<string, any>;
    onSave: (data: { title: string; subtitle: string; content: any }) => Promise<void>;
    onCancel: () => void;
}

export function TextBlockEditor({
    sectionId,
    initialTitle,
    initialSubtitle,
    initialContent,
    onSave,
    onCancel,
}: TextBlockEditorProps) {
    const [saving, setSaving] = useState(false);
    const [title, setTitle] = useState(initialTitle || '');
    const [subtitle, setSubtitle] = useState(initialSubtitle || '');
    const [content, setContent] = useState(initialContent?.content || '');
    const [alignment, setAlignment] = useState(initialContent?.alignment || 'left');

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave({
                title,
                subtitle,
                content: {
                    content,
                    alignment,
                },
            });
        } catch (error) {
            // Error handled in parent
        } finally {
            setSaving(false);
        }
    };

    const alignmentOptions = [
        { value: 'left', label: 'Kiri', icon: '⬅️' },
        { value: 'center', label: 'Tengah', icon: '↔️' },
        { value: 'right', label: 'Kanan', icon: '➡️' },
    ];

    return (
        <div className="space-y-6 py-4">
            {/* Title & Subtitle */}
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label>Judul (Opsional)</Label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Tentang Kami"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Subtitle (Opsional)</Label>
                    <Input
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="Sejarah singkat pesantren"
                    />
                </div>
            </div>

            {/* Alignment */}
            <div className="space-y-2">
                <Label>Perataan Teks</Label>
                <div className="flex gap-2">
                    {alignmentOptions.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => setAlignment(opt.value)}
                            className={`px-4 py-2 rounded-lg border-2 transition-all ${alignment === opt.value
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                    : 'border-slate-200 hover:border-slate-300'
                                }`}
                        >
                            <span className="mr-2">{opt.icon}</span>
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
                <Label>Konten Teks</Label>
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tulis konten teks di sini. Anda bisa menggunakan paragraf dengan memisahkan baris..."
                    className="min-h-[200px]"
                />
                <p className="text-xs text-slate-500">
                    Tips: Gunakan baris kosong untuk memisahkan paragraf
                </p>
            </div>

            {/* Preview */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-normal text-slate-500">Preview</CardTitle>
                </CardHeader>
                <CardContent className={`text-${alignment}`}>
                    {title && <h3 className="text-xl font-display font-bold text-slate-900 mb-2">{title}</h3>}
                    {subtitle && <p className="text-sm text-emerald-600 mb-4">{subtitle}</p>}
                    <div className="prose prose-slate max-w-none">
                        {content.split('\n\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-3 text-slate-700 last:mb-0">
                                {paragraph}
                            </p>
                        ))}
                        {!content && <p className="text-slate-400">Konten teks akan muncul di sini...</p>}
                    </div>
                </CardContent>
            </Card>

            <DialogFooter>
                <Button variant="outline" onClick={onCancel}>
                    Batal
                </Button>
                <Button onClick={handleSave} disabled={saving} className="gap-2">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Simpan
                </Button>
            </DialogFooter>
        </div>
    );
}
