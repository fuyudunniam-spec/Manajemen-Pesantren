'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
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
import { ArrowLeft, Save, Loader2, Eye, Clock, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { SlugInput } from '@/components/dashboard/slug-input';
import { MediaUpload } from '@/components/dashboard/MediaUpload';
import { RichTextEditor } from '@/components/dashboard/RichTextEditor';
import { getPageById, createPage, updatePage } from '@/lib/actions/pages';
import { useAutosave } from '@/hooks/use-autosave';
import { useUnsavedChanges } from '@/hooks/use-unsaved-changes';

const formSchema = z.object({
    slug: z
        .string()
        .min(1, 'Slug harus diisi')
        .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung'),
    title: z.string().min(3, 'Judul minimal 3 karakter'),
    content: z.string().optional(),
    meta_description: z.string().optional(),
    hero_image: z.string().optional(),
    is_published: z.boolean().default(false),
    show_in_nav: z.boolean().default(false),
    nav_label: z.string().optional(),
    nav_order: z.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PageFormPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string | undefined;

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(!!id);
    const [hasChanged, setHasChanged] = useState(false);
    const [showDraftDialog, setShowDraftDialog] = useState(false);
    const [activeTab, setActiveTab] = useState('edit');

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            slug: '',
            title: '',
            content: '',
            meta_description: '',
            hero_image: '',
            is_published: false,
            show_in_nav: false,
            nav_label: '',
            nav_order: 0,
        },
    });

    const formData = form.watch();

    // Autosave to localStorage
    const { hasDraft, lastSaved, loadDraft, clearDraft } = useAutosave({
        key: `page-draft-${id || 'new'}`,
        data: formData,
        interval: 30000, // 30 seconds
    });

    // Warn before leaving with unsaved changes
    const { confirmLeave } = useUnsavedChanges(hasChanged);

    useEffect(() => {
        if (id) {
            fetchPage();
        } else if (hasDraft) {
            setShowDraftDialog(true);
        }
    }, [id]);

    // Track form changes
    useEffect(() => {
        const subscription = form.watch(() => {
            setHasChanged(true);
        });
        return () => subscription.unsubscribe();
    }, [form]);

    const fetchPage = async () => {
        try {
            const data = await getPageById(id!);
            form.reset({
                slug: data.slug,
                title: data.title,
                content: data.content || '',
                meta_description: data.meta_description || '',
                hero_image: data.hero_image || '',
                is_published: data.is_published,
                show_in_nav: data.show_in_nav || false,
                nav_label: data.nav_label || '',
                nav_order: data.nav_order || 0,
            });
            setHasChanged(false);
        } catch (error: any) {
            toast.error('Gagal memuat data', {
                description: error.message,
            });
            router.push('/dashboard/website/pages');
        } finally {
            setInitialLoading(false);
        }
    };

    const onSubmit = async (values: FormValues) => {
        setLoading(true);

        try {
            if (id) {
                await updatePage(id, values);
                toast.success('Halaman berhasil diperbarui');
            } else {
                await createPage(values);
                toast.success('Halaman berhasil dibuat');
            }

            clearDraft();
            setHasChanged(false);
            router.push('/dashboard/website/pages');
        } catch (error: any) {
            toast.error(id ? 'Gagal memperbarui halaman' : 'Gagal membuat halaman', {
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLoadDraft = () => {
        const draft = loadDraft();
        if (draft) {
            form.reset(draft as FormValues);
            toast.info('Draft berhasil dimuat');
        }
        setShowDraftDialog(false);
    };

    const handleDiscardDraft = () => {
        clearDraft();
        setShowDraftDialog(false);
    };

    const handleBack = () => {
        if (hasChanged && !confirmLeave()) {
            return;
        }
        router.push('/dashboard/website/pages');
    };

    if (initialLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={handleBack}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-display font-bold text-slate-900">
                        {id ? 'Edit Halaman' : 'Tambah Halaman Baru'}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-slate-500">
                            {id ? 'Perbarui informasi halaman' : 'Buat halaman statis baru'}
                        </p>
                        {lastSaved && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                Autosaved {lastSaved.toLocaleTimeString('id-ID')}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Draft Dialog */}
            <AlertDialog open={showDraftDialog} onOpenChange={setShowDraftDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                            Draft Tersimpan Ditemukan
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Ada draft yang tersimpan di perangkat Anda. Apakah Anda ingin melanjutkan
                            dari draft atau memulai dari awal?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleDiscardDraft}>
                            Mulai Baru
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleLoadDraft} className="bg-emerald-600 hover:bg-emerald-700">
                            Lanjut Draft
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Form with Tabs */}
            <Card>
                <CardHeader>
                    <CardTitle>Informasi Halaman</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="edit">Edit</TabsTrigger>
                            <TabsTrigger value="preview">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="edit" className="space-y-6 mt-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Judul Halaman</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Tentang Kami" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <SlugInput
                                        value={form.watch('slug')}
                                        onChange={(value) => form.setValue('slug', value)}
                                        tableName="website_pages"
                                        currentId={id}
                                        sourceTitle={form.watch('title')}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Konten</FormLabel>
                                                <FormControl>
                                                    <RichTextEditor
                                                        content={field.value || ''}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Konten utama halaman dalam format rich text
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="hero_image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Hero Image (Opsional)</FormLabel>
                                                <FormControl>
                                                    <MediaUpload
                                                        defaultValue={field.value || ''}
                                                        onUploadComplete={field.onChange}
                                                        bucket="website-assets"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Gambar header/banner untuk halaman ini
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="meta_description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Meta Description (SEO)</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Deskripsi singkat untuk mesin pencari..."
                                                        className="min-h-[80px] resize-none"
                                                        maxLength={160}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    {field.value?.length || 0}/160 karakter
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="is_published"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>Publikasikan halaman</FormLabel>
                                                        <FormDescription>
                                                            Halaman akan ditampilkan di website publik
                                                        </FormDescription>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="show_in_nav"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>Tampilkan di Menu Navigasi</FormLabel>
                                                        <FormDescription>
                                                            Halaman akan muncul di menu website publik
                                                        </FormDescription>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        {form.watch('show_in_nav') && (
                                            <div className="grid gap-4 md:grid-cols-2 pl-7">
                                                <FormField
                                                    control={form.control}
                                                    name="nav_label"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Label Menu</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Gunakan judul jika kosong"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="nav_order"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Urutan Menu</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    {...field}
                                                                    onChange={(e) =>
                                                                        field.onChange(
                                                                            parseInt(e.target.value) || 0
                                                                        )
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-3 pt-4 border-t">
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                                        >
                                            {loading ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Save className="w-4 h-4" />
                                            )}
                                            {id ? 'Update' : 'Simpan'}
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setActiveTab('preview')}
                                            className="gap-2"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Preview
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={handleBack}
                                            disabled={loading}
                                        >
                                            Batal
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </TabsContent>

                        <TabsContent value="preview" className="mt-6">
                            <div className="border rounded-lg p-8 bg-white">
                                {/* Hero Image Preview */}
                                {form.watch('hero_image') && (
                                    <div className="mb-8 -mx-8 -mt-8">
                                        <img
                                            src={form.watch('hero_image')}
                                            alt={form.watch('title')}
                                            className="w-full h-64 object-cover"
                                        />
                                    </div>
                                )}

                                {/* Title */}
                                <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">
                                    {form.watch('title') || 'Judul Halaman'}
                                </h1>

                                {/* Content */}
                                <div
                                    className="prose prose-lg max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: form.watch('content') || '<p>Konten akan muncul di sini...</p>',
                                    }}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
