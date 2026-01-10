import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Save, Loader2 } from 'lucide-react';

interface CTASectionEditorProps {
    sectionId: string;
    initialTitle: string;
    initialSubtitle: string;
    initialContent: Record<string, any>;
    onSave: (data: { title: string; subtitle: string; content: any }) => Promise<void>;
    onCancel: () => void;
}

export function CTASectionEditor({
    sectionId,
    initialTitle,
    initialSubtitle,
    initialContent,
    onSave,
    onCancel,
}: CTASectionEditorProps) {
    const [saving, setSaving] = useState(false);
    const [title, setTitle] = useState(initialTitle || '');
    const [subtitle, setSubtitle] = useState(initialSubtitle || '');
    const [buttonText, setButtonText] = useState(initialContent?.button_text || 'Daftar Sekarang');
    const [buttonLink, setButtonLink] = useState(initialContent?.button_link || '/psb');
    const [secondaryButtonText, setSecondaryButtonText] = useState(initialContent?.secondary_button_text || '');
    const [secondaryButtonLink, setSecondaryButtonLink] = useState(initialContent?.secondary_button_link || '');
    const [backgroundColor, setBackgroundColor] = useState(initialContent?.background_color || 'emerald');

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave({
                title,
                subtitle,
                content: {
                    button_text: buttonText,
                    button_link: buttonLink,
                    secondary_button_text: secondaryButtonText,
                    secondary_button_link: secondaryButtonLink,
                    background_color: backgroundColor,
                },
            });
        } catch (error) {
            // Error handled in parent
        } finally {
            setSaving(false);
        }
    };

    const colorOptions = [
        { value: 'emerald', label: 'Emerald', class: 'from-emerald-600 to-emerald-800' },
        { value: 'blue', label: 'Blue', class: 'from-blue-600 to-blue-800' },
        { value: 'purple', label: 'Purple', class: 'from-purple-600 to-purple-800' },
        { value: 'amber', label: 'Amber', class: 'from-amber-500 to-amber-700' },
        { value: 'slate', label: 'Slate', class: 'from-slate-700 to-slate-900' },
    ];

    const selectedColor = colorOptions.find(c => c.value === backgroundColor) || colorOptions[0];

    return (
        <div className="space-y-6 py-4">
            {/* Title & Subtitle */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Judul CTA</Label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Bergabung Bersama Kami"
                        className="text-lg"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Subtitle / Deskripsi</Label>
                    <Textarea
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="Daftarkan putra-putri Anda untuk mendapatkan pendidikan Islam yang berkualitas."
                        className="min-h-[80px]"
                    />
                </div>
            </div>

            {/* Background Color */}
            <div className="space-y-3">
                <Label>Warna Background</Label>
                <div className="flex gap-2">
                    {colorOptions.map((color) => (
                        <button
                            key={color.value}
                            onClick={() => setBackgroundColor(color.value)}
                            className={`px-4 py-2 rounded-lg bg-gradient-to-r ${color.class} text-white text-sm font-medium transition-all ${backgroundColor === color.value
                                    ? 'ring-2 ring-offset-2 ring-slate-500 scale-105'
                                    : 'opacity-70 hover:opacity-100'
                                }`}
                        >
                            {color.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Primary Button */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Tombol Utama</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Teks Tombol</Label>
                        <Input
                            value={buttonText}
                            onChange={(e) => setButtonText(e.target.value)}
                            placeholder="Daftar Sekarang"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Link Tombol</Label>
                        <Input
                            value={buttonLink}
                            onChange={(e) => setButtonLink(e.target.value)}
                            placeholder="/psb/daftar"
                            className="font-mono text-sm"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Secondary Button (Optional) */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Tombol Sekunder (Opsional)</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Teks Tombol</Label>
                        <Input
                            value={secondaryButtonText}
                            onChange={(e) => setSecondaryButtonText(e.target.value)}
                            placeholder="Hubungi Kami"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Link Tombol</Label>
                        <Input
                            value={secondaryButtonLink}
                            onChange={(e) => setSecondaryButtonLink(e.target.value)}
                            placeholder="/kontak"
                            className="font-mono text-sm"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Preview */}
            <div className={`p-8 rounded-xl bg-gradient-to-r ${selectedColor.class} text-white text-center`}>
                <p className="text-xs uppercase tracking-wider text-white/60 mb-2">Preview</p>
                <h2 className="text-2xl font-display font-bold mb-3">{title || 'Judul CTA'}</h2>
                <p className="text-white/80 mb-6 max-w-lg mx-auto">{subtitle || 'Deskripsi call to action...'}</p>
                <div className="flex gap-3 justify-center">
                    <button className="px-6 py-2 bg-white text-slate-800 rounded-lg font-medium text-sm">
                        {buttonText || 'Button'}
                    </button>
                    {secondaryButtonText && (
                        <button className="px-6 py-2 bg-white/20 text-white rounded-lg font-medium text-sm border border-white/30">
                            {secondaryButtonText}
                        </button>
                    )}
                </div>
            </div>

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
