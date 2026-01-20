'use client';

import { useState, useEffect } from 'react';
import { Input } from './input';
import { Label } from './label';
import { Button } from './button';
import { Image as ImageIcon, X, Upload, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageFieldProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    showPreview?: boolean;
    previewSize?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function ImageField({
    value,
    onChange,
    label,
    placeholder = 'https://example.com/image.jpg',
    showPreview = true,
    previewSize = 'md',
    className,
}: ImageFieldProps) {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    // Reset error state when URL changes
    useEffect(() => {
        if (value) {
            setImageError(false);
            setImageLoading(true);
        }
    }, [value]);

    const handleClear = () => {
        onChange('');
        setImageError(false);
    };

    const previewSizeClasses = {
        sm: 'h-20 w-20',
        md: 'h-32 w-full max-w-xs',
        lg: 'h-48 w-full max-w-md',
    };

    return (
        <div className={cn('space-y-3', className)}>
            {label && <Label>{label}</Label>}

            {/* URL Input */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className="pr-8 font-mono text-sm"
                    />
                    {value && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                {value && (
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        asChild
                        className="shrink-0"
                    >
                        <a href={value} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </Button>
                )}
            </div>

            {/* Preview */}
            {showPreview && (
                <div
                    className={cn(
                        'relative rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden bg-slate-50',
                        previewSizeClasses[previewSize],
                        value && !imageError ? 'border-emerald-200' : 'border-slate-200'
                    )}
                >
                    {value && !imageError ? (
                        <>
                            {imageLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                                    <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                            <img
                                src={value}
                                alt="Preview"
                                className={cn(
                                    'w-full h-full object-cover transition-opacity',
                                    imageLoading ? 'opacity-0' : 'opacity-100'
                                )}
                                onLoad={() => setImageLoading(false)}
                                onError={() => {
                                    setImageError(true);
                                    setImageLoading(false);
                                }}
                            />
                            {/* Overlay with info */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-2">
                                <span className="text-xs text-white truncate">
                                    {value.split('/').pop()}
                                </span>
                            </div>
                        </>
                    ) : imageError ? (
                        <div className="text-center p-4">
                            <ImageIcon className="w-8 h-8 mx-auto text-red-300 mb-2" />
                            <p className="text-xs text-red-500">Gagal memuat gambar</p>
                            <p className="text-xs text-muted-foreground mt-1 truncate max-w-full">
                                Periksa URL
                            </p>
                        </div>
                    ) : (
                        <div className="text-center p-4">
                            <ImageIcon className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                            <p className="text-xs text-muted-foreground">
                                Masukkan URL gambar
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// Export a simpler version without preview for inline use
export function ImageFieldInline({
    value,
    onChange,
    placeholder = 'URL gambar...',
}: Pick<ImageFieldProps, 'value' | 'onChange' | 'placeholder'>) {
    return (
        <div className="flex gap-2 items-center">
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="font-mono text-sm"
            />
            {value && (
                <div className="w-8 h-8 rounded border overflow-hidden shrink-0">
                    <img
                        src={value}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '';
                        }}
                    />
                </div>
            )}
        </div>
    );
}
