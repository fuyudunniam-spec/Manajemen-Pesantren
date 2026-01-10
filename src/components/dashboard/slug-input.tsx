'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check, X, Loader2, RefreshCw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import slugify from 'slugify';

interface SlugInputProps {
    value: string;
    onChange: (value: string) => void;
    tableName: 'website_pages' | 'blog_posts';
    currentId?: string;
    sourceTitle?: string;
    label?: string;
}

export function SlugInput({
    value,
    onChange,
    tableName,
    currentId,
    sourceTitle,
    label = 'Slug (URL)',
}: SlugInputProps) {
    const [checking, setChecking] = useState(false);
    const [available, setAvailable] = useState<boolean | null>(null);
    const supabase = createClient();

    // Auto-generate slug from title
    const generateSlug = () => {
        if (sourceTitle) {
            const slug = slugify(sourceTitle, {
                lower: true,
                strict: true,
                remove: /[*+~.()'\"!:@]/g,
            });
            onChange(slug);
        }
    };

    // Check slug availability
    useEffect(() => {
        if (!value || value.length < 3) {
            setAvailable(null);
            return;
        }

        const checkAvailability = async () => {
            setChecking(true);
            try {
                let query = supabase
                    .from(tableName)
                    .select('id')
                    .eq('slug', value);

                // Exclude current item when editing
                if (currentId) {
                    query = query.neq('id', currentId);
                }

                const { data, error } = await query;

                if (error) throw error;

                setAvailable(data.length === 0);
            } catch (error) {
                console.error('Error checking slug:', error);
                setAvailable(null);
            } finally {
                setChecking(false);
            }
        };

        const timer = setTimeout(checkAvailability, 500);
        return () => clearTimeout(timer);
    }, [value, tableName, currentId]);

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="flex gap-2">
                <div className="flex-1 relative">
                    <Input
                        value={value}
                        onChange={(e) => {
                            const sanitized = e.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9-]/g, '-')
                                .replace(/--+/g, '-');
                            onChange(sanitized);
                        }}
                        placeholder="tentang-kami"
                        className="font-mono pr-10"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {checking && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                        {!checking && available === true && (
                            <Check className="w-4 h-4 text-green-600" />
                        )}
                        {!checking && available === false && (
                            <X className="w-4 h-4 text-red-600" />
                        )}
                    </div>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    onClick={generateSlug}
                    disabled={!sourceTitle}
                    className="gap-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    Generate
                </Button>
            </div>
            <p className="text-xs text-muted-foreground">
                URL: /{value || 'slug'}
                {available === false && (
                    <span className="text-red-600 ml-2">⚠️ Slug sudah digunakan</span>
                )}
            </p>
        </div>
    );
}
