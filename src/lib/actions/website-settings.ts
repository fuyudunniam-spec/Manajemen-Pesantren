'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface WebsiteSettings {
    site_title: string;
    site_tagline: string;
    site_description: string;
    site_logo: string;
    site_logo_small: string;
    footer_text: string;
    // Social media & contact (stored as JSON stringified values for flexibility)
    social_links?: string; // JSON array
    contact_whatsapp?: string;
    contact_email?: string;
    contact_phone?: string;
    contact_address?: string;
}

export async function getWebsiteSettings() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('website_settings')
        .select('*');

    if (error) {
        console.error('Error fetching settings:', error);
        return {} as WebsiteSettings;
    }

    // Convert array of key-value pairs to object
    const settings: any = {};
    data?.forEach((item) => {
        settings[item.key] = item.value;
    });

    return settings as WebsiteSettings;
}

export async function updateWebsiteSettings(settings: Partial<WebsiteSettings>) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    // Convert object to array of key-value pairs for upsert
    const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value: value || '',
        updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase
        .from('website_settings')
        .upsert(updates, { onConflict: 'key' });

    if (error) {
        throw new Error(error.message);
    }

    // Revalidate public pages
    revalidatePath('/', 'layout');

    return { success: true };
}
