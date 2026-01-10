'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface ThemeSettings {
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    background_color: string;
    foreground_color: string;
    heading_font: string;
    body_font: string;
    border_radius: string;
    sidebar_style: string;
}

export async function getTheme(): Promise<ThemeSettings | null> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('website_themes')
        .select('*')
        .eq('key', 'default')
        .single();

    if (error) {
        console.error('Error fetching theme:', error);
        return null;
    }

    return data as ThemeSettings;
}

export async function updateTheme(theme: Partial<ThemeSettings>) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase
        .from('website_themes')
        .update({
            ...theme,
            updated_by: user.id,
            updated_at: new Date().toISOString(),
        })
        .eq('key', 'default');

    if (error) {
        throw new Error(error.message);
    }

    // Revalidate all pages to apply new theme
    revalidatePath('/', 'layout');

    return { success: true };
}

