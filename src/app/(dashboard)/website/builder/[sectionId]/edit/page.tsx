'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { MediaUpload } from '@/components/dashboard/MediaUpload';
import { getSectionById, updateSection } from '@/lib/actions/sections';

export default function SectionEditorPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.sectionId as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [section, setSection] = useState<any>(null);
    const [content, setContent] = useState<any>({});

    useEffect(() => {
        if (id) {
            fetchSection();
        }
    }, [id]);

    const fetchSection = async () => {
        try {
            const data = await getSectionById(id);
            setSection(data);
            setContent(data.content || {});
        } catch (error: any) {
            toast.error('Gagal memuat data', {
                description: error.message,
            });
            router.push('/dashboard/website/builder');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateSection(id, {
                content: content,
                title: content.title || section.title,
            });
            toast.success('Section berhasil disimpan');
            router.push('/dashboard/website/builder');
        } catch (error: any) {
            toast.error('Gagal menyimpan', {
                description: error.message,
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    const renderEditor = () => {
        switch (section.section_type) {
            case 'hero':
                return (
                    <div className="space-y-6">
                        <div>
                            <Label>Judul</Label>
                            <Input
                                value={content.title || ''}
                                onChange={(e) => setContent({ ...content, title: e.target.value })}
                                placeholder="Selamat Datang di e-Maktab"
                            />
                        </div>
                        <div>
                            <Label>Subtitle</Label>
                            <Textarea
                                value={content.subtitle || ''}
                                onChange={(e) =>
                                    setContent({ ...content, subtitle: e.target.value })
                                }
                                placeholder="Sistem informasi manajemen pesantren modern"
                                className="resize-none"
                            />
                        </div>
                        <div>
                            <Label>Background Image</Label>
                            <MediaUpload
                                defaultValue={content.background_image || ''}
                                onUploadComplete={(url) =>
                                    setContent({ ...content, background_image: url })
                                }
                                bucket="website-assets"
                            />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <Label>Button Text</Label>
                                <Input
                                    value={content.button_text || ''}
                                    onChange={(e) =>
                                        setContent({ ...content, button_text: e.target.value })
                                    }
                                    placeholder="Daftar Sekarang"
                                />
                            </div>
                            <div>
                                <Label>Button Link</Label>
                                <Input
                                    value={content.button_link || ''}
                                    onChange={(e) =>
                                        setContent({ ...content, button_link: e.target.value })
                                    }
                                    placeholder="/psb"
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'features':
                return (
                    <div className="space-y-6">
                        <div>
                            <Label>Section Title</Label>
                            <Input
                                value={content.title || ''}
                                onChange={(e) => setContent({ ...content, title: e.target.value })}
                                placeholder="Fitur Unggulan"
                            />
                        </div>
                        <div>
                            <Label>Section Subtitle</Label>
                            <Textarea
                                value={content.subtitle || ''}
                                onChange={(e) =>
                                    setContent({ ...content, subtitle: e.target.value })
                                }
                                placeholder="Description..."
                                className="resize-none"
                            />
                        </div>
                        <div>
                            <Label>Features (JSON Array)</Label>
                            <Textarea
                                value={JSON.stringify(content.features || [], null, 2)}
                                onChange={(e) => {
                                    try {
                                        const parsed = JSON.parse(e.target.value);
                                        setContent({ ...content, features: parsed });
                                    } catch { }
                                }}
                                placeholder='[{"icon": "check", "title": "Feature 1", "description": "..."}]'
                                className="font-mono resize-none min-h-[200px]"
                            />
                        </div>
                    </div>
                );

            case 'cta':
                return (
                    <div className="space-y-6">
                        <div>
                            <Label>Headline</Label>
                            <Input
                                value={content.headline || ''}
                                onChange={(e) =>
                                    setContent({ ...content, headline: e.target.value })
                                }
                                placeholder="Siap Bergabung?"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea
                                value={content.description || ''}
                                onChange={(e) =>
                                    setContent({ ...content, description: e.target.value })
                                }
                                className="resize-none"
                            />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <Label>Button Text</Label>
                                <Input
                                    value={content.button_text || ''}
                                    onChange={(e) =>
                                        setContent({ ...content, button_text: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Button Link</Label>
                                <Input
                                    value={content.button_link || ''}
                                    onChange={(e) =>
                                        setContent({ ...content, button_link: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'stats':
                return (
                    <div className="space-y-6">
                        <div>
                            <Label>Stats (JSON Array)</Label>
                            <Textarea
                                value={JSON.stringify(content.stats || [], null, 2)}
                                onChange={(e) => {
                                    try {
                                        const parsed = JSON.parse(e.target.value);
                                        setContent({ ...content, stats: parsed });
                                    } catch { }
                                }}
                                placeholder='[{"label": "Santri", "value": "500+", "icon": "users"}]'
                                className="font-mono resize-none min-h-[200px]"
                            />
                        </div>
                    </div>
                );

            case 'contact':
                return (
                    <div className="space-y-6">
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={content.title || ''}
                                onChange={(e) => setContent({ ...content, title: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={content.email || ''}
                                    onChange={(e) =>
                                        setContent({ ...content, email: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Phone</Label>
                                <Input
                                    value={content.phone || ''}
                                    onChange={(e) =>
                                        setContent({ ...content, phone: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <Label>Address</Label>
                            <Textarea
                                value={content.address || ''}
                                onChange={(e) =>
                                    setContent({ ...content, address: e.target.value })
                                }
                                className="resize-none"
                            />
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="space-y-6">
                        <div>
                            <Label>Content (JSON)</Label>
                            <Textarea
                                value={JSON.stringify(content, null, 2)}
                                onChange={(e) => {
                                    try {
                                        const parsed = JSON.parse(e.target.value);
                                        setContent(parsed);
                                    } catch { }
                                }}
                                className="font-mono resize-none min-h-[400px]"
                            />
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push('/dashboard/website/builder')}
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-display font-bold text-slate-900">
                        Edit Section: {section.title}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Type: {section.section_type} • Page: {section.page}
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Section Content</CardTitle>
                </CardHeader>
                <CardContent>{renderEditor()}</CardContent>
            </Card>

            <div className="flex justify-end gap-3">
                <Button
                    variant="outline"
                    onClick={() => router.push('/dashboard/website/builder')}
                >
                    Batal
                </Button>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Simpan
                </Button>
            </div>
        </div>
    );
}
