'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface MediaUploadProps {
    onUploadComplete: (url: string) => void;
    defaultValue?: string;
    bucket?: string;
}

export function MediaUpload({ onUploadComplete, defaultValue, bucket = 'website-assets' }: MediaUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(defaultValue || null);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const file = event.target.files?.[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

            setPreview(data.publicUrl);
            onUploadComplete(data.publicUrl);
            toast.success('File berhasil diupload');

        } catch (error: any) {
            toast.error('Gagal upload file', {
                description: error.message,
            });
        } finally {
            setUploading(false);
        }
    };

    const clearImage = () => {
        setPreview(null);
        onUploadComplete('');
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                {preview ? (
                    <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-slate-200 group">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <button
                            onClick={clearImage}
                            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="w-40 h-40 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                        <ImageIcon className="w-8 h-8 mb-2" />
                        <span className="text-xs text-center px-2">No image</span>
                    </div>
                )}

                <div className="flex-1">
                    <input
                        type="file"
                        id="upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                    />
                    <label htmlFor="upload">
                        <Button type="button" variant="outline" className="gap-2 cursor-pointer" disabled={uploading} asChild>
                            <span>
                                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                Upload Image
                            </span>
                        </Button>
                    </label>
                    <p className="text-xs text-slate-500 mt-2">
                        Format: JPG, PNG, GIF. Max: 2MB.
                    </p>
                </div>
            </div>
        </div>
    );
}
