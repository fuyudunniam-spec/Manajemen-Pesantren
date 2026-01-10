'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MediaUpload } from '@/components/dashboard/MediaUpload';
import { Save, Loader2, Settings, Eye, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { getWebsiteSettings, updateWebsiteSettings } from '@/lib/actions/website-settings';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
    site_title: z.string().min(1, 'Nama wajib diisi'),
    site_tagline: z.string().optional(),
    site_description: z.string().optional(),
    site_logo: z.string().optional(),
    site_logo_small: z.string().optional(),
    footer_text: z.string().optional(),
    contact_whatsapp: z.string().optional(),
    contact_email: z.string().email('Email tidak valid').optional().or(z.literal('')),
    contact_phone: z.string().optional(),
    contact_address: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface SocialLink {
    icon: string;
    label: string;
    url: string;
}

export default function WebsiteSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            site_title: '',
            site_tagline: '',
            site_description: '',
            site_logo: '',
            site_logo_small: '',
            footer_text: '',
            contact_whatsapp: '',
            contact_email: '',
            contact_phone: '',
            contact_address: '',
        },
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const data = await getWebsiteSettings();

            form.reset({
                site_title: data.site_title || '',
                site_tagline: data.site_tagline || '',
                site_description: data.site_description || '',
                site_logo: data.site_logo || '',
                site_logo_small: data.site_logo_small || '',
                footer_text: data.footer_text || '',
                contact_whatsapp: data.contact_whatsapp || '',
                contact_email: data.contact_email || '',
                contact_phone: data.contact_phone || '',
                contact_address: data.contact_address || '',
            });

            // Parse social links
            if (data.social_links) {
                try {
                    setSocialLinks(JSON.parse(data.social_links));
                } catch {
                    setSocialLinks([]);
                }
            }
        } catch (error: any) {
            toast.error('Gagal memuat pengaturan', {
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (values: FormValues) => {
        setSaving(true);
        try {
            await updateWebsiteSettings({
                ...values,
                social_links: JSON.stringify(socialLinks),
            });

            toast.success('Pengaturan berhasil disimpan', {
                description: 'Perubahan akan langsung muncul di website publik',
            });
        } catch (error: any) {
            toast.error('Gagal menyimpan', {
                description: error.message,
            });
        } finally {
            setSaving(false);
        }
    };

    const addSocialLink = () => {
        setSocialLinks([...socialLinks, { icon: 'facebook', label: 'Facebook', url: '' }]);
    };

    const removeSocialLink = (index: number) => {
        setSocialLinks(socialLinks.filter((_, i) => i !== index));
    };

    const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
        const updated = [...socialLinks];
        updated[index][field] = value;
        setSocialLinks(updated);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                        <Settings className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-display font-bold text-slate-900">
                            Pengaturan Website
                        </h1>
                        <p className="text-sm text-slate-500">
                            Konfigurasi identitas dan tampilan website
                        </p>
                    </div>
                </div>
                <Button variant="outline" size="sm" asChild className="gap-2">
                    <a href="/" target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4" />
                        Lihat Website
                        <ExternalLink className="w-3 h-3" />
                    </a>
                </Button>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Logo Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Logo & Branding</CardTitle>
                            <CardDescription>
                                Logo yang ditampilkan di header, footer, dan halaman website
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="site_logo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Logo Utama</FormLabel>
                                            <FormControl>
                                                <MediaUpload
                                                    defaultValue={field.value}
                                                    onUploadComplete={field.onChange}
                                                    bucket="website-assets"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Digunakan di header dan footer website
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="site_logo_small"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Logo Kecil (Favicon)</FormLabel>
                                            <FormControl>
                                                <MediaUpload
                                                    defaultValue={field.value}
                                                    onUploadComplete={field.onChange}
                                                    bucket="website-assets"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Versi kecil untuk tab browser dan mobile
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Preview */}
                            {form.watch('site_logo') && (
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <Label className="mb-2 block text-xs text-slate-500">
                                        Preview Header:
                                    </Label>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={form.watch('site_logo')}
                                            alt="Logo Preview"
                                            className="w-12 h-12 rounded-xl object-contain bg-white p-1 border"
                                        />
                                        <div>
                                            <p className="font-display font-bold text-lg">
                                                {form.watch('site_title') || 'e-Maktab'}
                                            </p>
                                            <p className="text-xs text-slate-500 -mt-0.5">
                                                {form.watch('site_tagline') || 'Pondok Pesantren'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Identity Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Identitas Website</CardTitle>
                            <CardDescription>
                                Nama dan tagline yang ditampilkan di header dan halaman website
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="site_title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Aplikasi / Pesantren</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e-Maktab" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="site_tagline"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tagline</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Pondok Pesantren Modern"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="site_description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deskripsi Meta (SEO)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Deskripsi singkat untuk mesin pencari (Google, Bing, dll)..."
                                                className="resize-none min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Digunakan di meta tag description untuk SEO
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Kontak</CardTitle>
                            <CardDescription>
                                Kontak yang ditampilkan di website publik
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="contact_whatsapp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>WhatsApp</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="62812XXXXXXXX (format internasional)"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Gunakan format internasional tanpa +, contoh: 62812XXXX
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="contact_email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="info@pesantren.ac.id"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="contact_phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Telepon</FormLabel>
                                            <FormControl>
                                                <Input placeholder="(0274) XXXXXX" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="contact_address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Alamat</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Alamat lengkap pesantren..."
                                                className="resize-none min-h-[80px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Social Media Links */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Media Sosial</CardTitle>
                            <CardDescription>
                                Tambahkan link ke akun media sosial pesantren
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {socialLinks.map((link, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        placeholder="Label (Facebook, Instagram, dll)"
                                        value={link.label}
                                        onChange={(e) =>
                                            updateSocialLink(index, 'label', e.target.value)
                                        }
                                        className="flex-1"
                                    />
                                    <Input
                                        placeholder="URL lengkap"
                                        value={link.url}
                                        onChange={(e) =>
                                            updateSocialLink(index, 'url', e.target.value)
                                        }
                                        className="flex-[2]"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => removeSocialLink(index)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addSocialLink}
                                className="w-full gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Tambah Media Sosial
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Footer Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Footer</CardTitle>
                            <CardDescription>
                                Konten yang ditampilkan di bagian bawah website
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="footer_text"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Teks Footer / Motto</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Membentuk generasi Qurani yang berakhlak mulia, berilmu, dan bermanfaat bagi umat."
                                                className="resize-none min-h-[80px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Ditampilkan di sebelah logo footer sebagai deskripsi singkat
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Save Button */}
                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            disabled={saving}
                            className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white min-w-[200px]"
                            size="lg"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
