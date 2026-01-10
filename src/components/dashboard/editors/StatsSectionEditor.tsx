import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Save, Loader2, Plus, Trash2, GripVertical } from 'lucide-react';

interface StatsSectionEditorProps {
    sectionId: string;
    initialTitle: string;
    initialSubtitle: string;
    initialContent: Record<string, any>;
    onSave: (data: { title: string; subtitle: string; content: any }) => Promise<void>;
    onCancel: () => void;
}

interface StatItem {
    label: string;
    value: string;
    suffix?: string;
}

export function StatsSectionEditor({
    sectionId,
    initialTitle,
    initialSubtitle,
    initialContent,
    onSave,
    onCancel,
}: StatsSectionEditorProps) {
    const [saving, setSaving] = useState(false);
    const [title, setTitle] = useState(initialTitle || '');
    const [subtitle, setSubtitle] = useState(initialSubtitle || '');
    const [stats, setStats] = useState<StatItem[]>(initialContent?.items || []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave({
                title,
                subtitle,
                content: {
                    items: stats,
                },
            });
        } catch (error) {
            // Error handled in parent
        } finally {
            setSaving(false);
        }
    };

    const addStat = () => {
        setStats([...stats, { label: 'Label Baru', value: '100', suffix: '+' }]);
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
                    <Label>Judul Section</Label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Statistik Kami"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Subtitle (Opsional)</Label>
                    <Input
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="Pencapaian yang membanggakan"
                    />
                </div>
            </div>

            {/* Stats Items */}
            <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Item Statistik</CardTitle>
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

                                    <div className="flex-1 grid grid-cols-3 gap-3">
                                        <div>
                                            <Label className="text-xs text-slate-500">Nilai</Label>
                                            <Input
                                                value={stat.value}
                                                onChange={(e) => updateStat(index, 'value', e.target.value)}
                                                placeholder="100"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs text-slate-500">Suffix</Label>
                                            <Input
                                                value={stat.suffix || ''}
                                                onChange={(e) => updateStat(index, 'suffix', e.target.value)}
                                                placeholder="+, %, K, dll"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs text-slate-500">Label</Label>
                                            <Input
                                                value={stat.label}
                                                onChange={(e) => updateStat(index, 'label', e.target.value)}
                                                placeholder="Santri Aktif"
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

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
            <Card className="bg-emerald-50 border-emerald-200">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-normal text-emerald-600">Preview</CardTitle>
                </CardHeader>
                <CardContent>
                    {title && <h3 className="text-lg font-display font-bold text-center text-slate-900 mb-1">{title}</h3>}
                    {subtitle && <p className="text-sm text-slate-500 text-center mb-6">{subtitle}</p>}

                    <div className={`grid gap-6 ${stats.length <= 2 ? 'grid-cols-2' :
                            stats.length === 3 ? 'grid-cols-3' :
                                'grid-cols-4'
                        }`}>
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <p className="text-3xl font-bold text-emerald-700">
                                    {stat.value}{stat.suffix || ''}
                                </p>
                                <p className="text-sm text-slate-600">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {stats.length === 0 && (
                        <p className="text-center text-slate-400">Tambahkan statistik untuk melihat preview</p>
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
