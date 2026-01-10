import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Save, Loader2 } from 'lucide-react';

interface ContactInfoContent {
    intro?: string;
    address?: string;
    phone?: string;
    email?: string;
    hours?: string;
}

interface ContactInfoEditorProps {
    sectionId: string;
    initialTitle: string;
    initialSubtitle: string;
    initialContent: ContactInfoContent;
    onSave: (data: { title: string; subtitle: string; content: ContactInfoContent }) => Promise<void>;
    onCancel: () => void;
}

export function ContactInfoEditor({
    sectionId,
    initialTitle,
    initialSubtitle,
    initialContent,
    onSave,
    onCancel,
}: ContactInfoEditorProps) {
    const [title, setTitle] = useState(initialTitle || '');
    const [subtitle, setSubtitle] = useState(initialSubtitle || '');
    const [content, setContent] = useState<ContactInfoContent>({
        intro: initialContent?.intro || '',
        address: initialContent?.address || '',
        phone: initialContent?.phone || '',
        email: initialContent?.email || '',
        hours: initialContent?.hours || '',
    });
    const [saving, setSaving] = useState(false);

    const handleContentChange = (field: keyof ContactInfoContent, value: string) => {
        setContent({ ...content, [field]: value });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave({
                title,
                subtitle,
                content,
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
                            placeholder="Kami Siap Membantu Anda"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Subtitle / Label</Label>
                        <Input
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            placeholder="Informasi Kontak"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Contact Details */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Detail Kontak</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                    {/* Intro Text */}
                    <div className="space-y-2">
                        <Label>Teks Pengantar</Label>
                        <Textarea
                            value={content.intro}
                            onChange={(e) => handleContentChange('intro', e.target.value)}
                            placeholder="Tim kami siap menjawab pertanyaan Anda seputar pendaftaran santri baru..."
                            className="min-h-[100px]"
                        />
                        <p className="text-xs text-slate-500">
                            Teks yang ditampilkan sebelum detail kontak
                        </p>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-emerald-600" />
                            Alamat
                        </Label>
                        <Textarea
                            value={content.address}
                            onChange={(e) => handleContentChange('address', e.target.value)}
                            placeholder="Jl. Pondok Pesantren No. 123, Kecamatan, Kota, Provinsi 12345"
                            className="min-h-[80px]"
                        />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-emerald-600" />
                            Nomor Telepon
                        </Label>
                        <Input
                            value={content.phone}
                            onChange={(e) => handleContentChange('phone', e.target.value)}
                            placeholder="(021) 1234-5678 / 0812-3456-7890"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-emerald-600" />
                            Email
                        </Label>
                        <Input
                            value={content.email}
                            onChange={(e) => handleContentChange('email', e.target.value)}
                            placeholder="info@pesantren.sch.id"
                            type="email"
                        />
                    </div>

                    {/* Operating Hours */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-emerald-600" />
                            Jam Operasional
                        </Label>
                        <Textarea
                            value={content.hours}
                            onChange={(e) => handleContentChange('hours', e.target.value)}
                            placeholder="Senin - Jumat: 08:00 - 16:00 WIB | Sabtu: 08:00 - 12:00 WIB"
                            className="min-h-[60px]"
                        />
                    </div>
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
