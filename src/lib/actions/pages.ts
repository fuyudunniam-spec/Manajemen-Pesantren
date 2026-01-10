'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface PageData {
    id?: string;
    slug: string;
    title: string;
    content: string;
    meta_description?: string;
    hero_image?: string;
    is_published: boolean;
    show_in_nav: boolean;
    nav_label?: string;
    nav_order?: number;
}

export async function getPages() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('website_pages')
        .select('*')
        .order('updated_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getPageBySlug(slug: string, preview = false) {
    const supabase = await createClient();

    let query = supabase
        .from('website_pages')
        .select('*')
        .eq('slug', slug);

    // Only show published in non-preview mode
    if (!preview) {
        query = query.eq('is_published', true);
    }

    const { data, error } = await query.single();

    if (error) {
        return null;
    }

    return data;
}

export async function getPageById(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('website_pages')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function createPage(page: PageData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase
        .from('website_pages')
        .insert({
            ...page,
            created_by: user.id,
            updated_by: user.id,
        });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/website/pages');
    revalidatePath(`/${page.slug}`);

    return { success: true };
}

export async function updatePage(id: string, page: Partial<PageData>) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase
        .from('website_pages')
        .update({
            ...page,
            updated_by: user.id,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/website/pages');
    if (page.slug) {
        revalidatePath(`/${page.slug}`);
    }

    return { success: true };
}

export async function deletePage(id: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase
        .from('website_pages')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/website/pages');

    return { success: true };
}

export async function togglePublish(id: string, currentStatus: boolean) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase
        .from('website_pages')
        .update({
            is_published: !currentStatus,
            updated_by: user.id,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/website/pages');

    return { success: true, newStatus: !currentStatus };
}
