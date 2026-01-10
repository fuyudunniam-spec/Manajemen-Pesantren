import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Save, Loader2, Plus, Trash2, GripVertical } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface HeroSectionEditorProps {
    sectionId: string;
    initialTitle: string;
    initialSubtitle: string;
    initialContent: Record<string, any>;
    onSave: (data: { title: string; subtitle: string; content: any }) => Promise<void>;
    onCancel: () => void;
}

interface StatItem {
    icon: string;
    label: string;
    value: string;
}

const ICON_OPTIONS = [
    { value: 'users', label: '👥 Users' },
    { value: 'book', label: '📖 Book' },
    { value: 'award', label: '🏆 Award' },
    { value: 'star', label: '⭐ Star' },
    { value: 'heart', label: '❤️ Heart' },
    { value: 'home', label: '🏠 Home' },
    { value: 'calendar', label: '📅 Calendar' },
    { value: 'clock', label: '⏰ Clock' },
    { value: 'check', label: '✅ Check' },
    { value: 'graduation-cap', label: '🎓 Graduation' },
];

export function HeroSectionEditor({
    sectionId,
    initialTitle,
    initialSubtitle,
    initialContent,
    onSave,
    onCancel,
}: HeroSectionEditorProps) {
    const [saving, setSaving] = useState(false);
    const [title, setTitle] = useState(initialTitle || '');
    const [subtitle, setSubtitle] = useState(initialSubtitle || '');
    const [badge, setBadge] = useState(initialContent?.badge || '');
    const [ctaPrimary, setCtaPrimary] = useState(initialContent?.cta_primary || 'Daftar Sekarang');
    const [ctaSecondary, setCtaSecondary] = useState(initialContent?.cta_secondary || 'Pelajari Lebih Lanjut');
    const [ctaPrimaryLink, setCtaPrimaryLink] = useState(initialContent?.cta_primary_link || '/psb');
    const [ctaSecondaryLink, setCtaSecondaryLink] = useState(initialContent?.cta_secondary_link || '#tentang');
    const [stats, setStats] = useState<StatItem[]>(initialContent?.stats || []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave({
                title,
                subtitle,
                content: {
                    badge,
                    cta_primary: ctaPrimary,
                    cta_secondary: ctaSecondary,
                    cta_primary_link: ctaPrimaryLink,
                    cta_secondary_link: ctaSecondaryLink,
                    stats,
                },
            });
        } catch (error) {
            // Error handled in parent
        } finally {
            setSaving(false);
        }
    };

    const addStat = () => {
        setStats([...stats, { icon: 'users', label: 'Label', value: '100+' }]);
    };

    const updateStat = (index: number, field: keyof StatItem, value: string) => {
        const newStats = [...stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setStats(newStats);
    };

    const removeStat = (index: number) => {
        setStats(stats.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6 py-4">
            {/* Title & Subtitle */}
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label>Judul Utama</Label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Pesantren Modern Islam"
                        className="text-lg"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Badge / Label</Label>
                    <Input
                        value={badge}
                        onChange={(e) => setBadge(e.target.value)}
                        placeholder="Pendaftaran Dibuka!"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Subtitle / Deskripsi</Label>
                <Textarea
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Deskripsi singkat tentang pesantren..."
                    className="min-h-[100px]"
                />
            </div>

            {/* CTA Buttons */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Tombol Aksi (CTA)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                            <Label className="text-emerald-700">Tombol Primer</Label>
                            <Input
                                value={ctaPrimary}
                                onChange={(e) => setCtaPrimary(e.target.value)}
                                placeholder="Daftar Sekarang"
                            />
                            <Input
                                value={ctaPrimaryLink}
                                onChange={(e) => setCtaPrimaryLink(e.target.value)}
                                placeholder="/psb"
                                className="font-mono text-sm"
                            />
                        </div>
                        <div className="space-y-3 p-4 bg-slate-50 rounded-lg border">
                            <Label className="text-slate-700">Tombol Sekunder</Label>
                            <Input
                                value={ctaSecondary}
                                onChange={(e) => setCtaSecondary(e.target.value)}
                                placeholder="Pelajari Lebih Lanjut"
                            />
                            <Input
                                value={ctaSecondaryLink}
                                onChange={(e) => setCtaSecondaryLink(e.target.value)}
                                placeholder="#tentang"
                                className="font-mono text-sm"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats */}
            <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Statistik (Opsional)</CardTitle>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addStat}
                        className="gap-1"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah
                    </Button>
                </CardHeader>
                <CardContent>
                    {stats.length === 0 ? (
                        <div className="text-center py-6 text-slate-500 border-2 border-dashed rounded-lg">
                            <p className="text-sm">Belum ada statistik. Klik "Tambah" untuk menambahkan.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                    <GripVertical className="w-4 h-4 text-slate-400" />

                                    <Select
                                        value={stat.icon}
                                        onValueChange={(value) => updateStat(index, 'icon', value)}
                                    >
                                        <SelectTrigger className="w-32">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ICON_OPTIONS.map((icon) => (
                                                <SelectItem key={icon.value} value={icon.value}>
                                                    {icon.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Input
                                        value={stat.value}
                                        onChange={(e) => updateStat(index, 'value', e.target.value)}
                                        placeholder="100+"
                                        className="w-24"
                                    />

                                    <Input
                                        value={stat.label}
                                        onChange={(e) => updateStat(index, 'label', e.target.value)}
                                        placeholder="Santri"
                                        className="flex-1"
                                    />

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeStat(index)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Preview */}
            <Card className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-normal text-emerald-300">Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {badge && (
                        <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full">
                            {badge}
                        </span>
                    )}
                    <h2 className="text-2xl font-display font-bold">{title || 'Judul Hero'}</h2>
                    <p className="text-emerald-100/80 text-sm">{subtitle || 'Deskripsi hero section...'}</p>
                    <div className="flex gap-2 pt-2">
                        <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium">
                            {ctaPrimary}
                        </button>
                        <button className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium">
                            {ctaSecondary}
                        </button>
                    </div>
                    {stats.length > 0 && (
                        <div className="flex gap-6 pt-4 border-t border-emerald-700/50">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <p className="text-xl font-bold text-amber-400">{stat.value}</p>
                                    <p className="text-xs text-emerald-200">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    )}
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
