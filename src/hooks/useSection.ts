'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface SectionData<T = Record<string, any>> {
    title: string;
    subtitle: string;
    content: T;
    is_visible: boolean;
}

export function useSection<T = Record<string, any>>(sectionKey: string) {
    const [data, setData] = useState<SectionData<T> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let mounted = true;

        async function fetchSection() {
            try {
                const { data: section, error } = await supabase
                    .from('website_sections')
                    .select('title, subtitle, content, is_visible')
                    .eq('section_key', sectionKey)
                    .single();

                if (error) throw error;

                if (mounted && section) {
                    setData({
                        title: section.title || '',
                        subtitle: section.subtitle || '',
                        content: section.content as T,
                        is_visible: section.is_visible,
                    });
                }
            } catch (err) {
                if (mounted) {
                    setError(err as Error);
                    console.error(`Error fetching section ${sectionKey}:`, err);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        fetchSection();

        return () => {
            mounted = false;
        };
    }, [sectionKey]);

    return { data, loading, error };
}

// Hook to fetch multiple sections for a page
export function usePageSections(page: string) {
    const [sections, setSections] = useState<Record<string, SectionData>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSections() {
            try {
                const { data, error } = await supabase
                    .from('website_sections')
                    .select('section_key, title, subtitle, content, is_visible')
                    .eq('page', page)
                    .order('order_index', { ascending: true });

                if (error) throw error;

                const sectionsMap: Record<string, SectionData> = {};
                data?.forEach(section => {
                    sectionsMap[section.section_key] = {
                        title: section.title || '',
                        subtitle: section.subtitle || '',
                        content: section.content,
                        is_visible: section.is_visible,
                    };
                });

                setSections(sectionsMap);
            } catch (err) {
                console.error(`Error fetching sections for page ${page}:`, err);
            } finally {
                setLoading(false);
            }
        }

        fetchSections();
    }, [page]);

    return { sections, loading };
}
