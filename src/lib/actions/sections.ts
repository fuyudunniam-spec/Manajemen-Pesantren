'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface SectionData {
    id?: string;
    section_key: string;
    page: string;
    section_type: string;
    title?: string;
    subtitle?: string;
    content: any; // JSON content
    is_visible: boolean;
    order_index: number;
}

export async function getSections(page?: string) {
    const supabase = await createClient();

    let query = supabase
        .from('website_sections')
        .select('*')
        .order('order_index', { ascending: true });

    if (page) {
        query = query.eq('page', page);
    }

    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getSectionById(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('website_sections')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function updateSection(id: string, section: Partial<SectionData>) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase
        .from('website_sections')
        .update({
            ...section,
            updated_by: user.id,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/website/builder');
    revalidatePath('/');

    return { success: true };
}

export async function createSection(section: SectionData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase
        .from('website_sections')
        .insert({
            ...section,
            updated_by: user.id,
        });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/website/builder');
    revalidatePath('/');

    return { success: true };
}

export async function deleteSection(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('website_sections')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/website/builder');
    revalidatePath('/');

    return { success: true };
}

export async function duplicateSection(id: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    // Get original section
    const { data: original, error: fetchError } = await supabase
        .from('website_sections')
        .select('*')
        .eq('id', id)
        .single();

    if (fetchError) {
        throw new Error(fetchError.message);
    }

    // Create duplicate with new key
    const { error: insertError } = await supabase
        .from('website_sections')
        .insert({
            section_key: `${original.section_key}_copy_${Date.now()}`,
            page: original.page,
            section_type: original.section_type,
            title: `${original.title} (Copy)`,
            subtitle: original.subtitle,
            content: original.content,
            is_visible: false, // Start as hidden
            order_index: original.order_index + 1,
            updated_by: user.id,
        });

    if (insertError) {
        throw new Error(insertError.message);
    }

    revalidatePath('/dashboard/website/builder');

    return { success: true };
}

export async function toggleSectionVisibility(id: string, currentStatus: boolean) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase
        .from('website_sections')
        .update({
            is_visible: !currentStatus,
            updated_by: user.id,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/website/builder');
    revalidatePath('/');

    return { success: true, newStatus: !currentStatus };
}

export async function reorderSections(sections: { id: string; order_index: number }[]) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    // Update all sections in a transaction-like manner
    const updates = sections.map((section) =>
        supabase
            .from('website_sections')
            .update({
                order_index: section.order_index,
                updated_by: user.id,
                updated_at: new Date().toISOString(),
            })
            .eq('id', section.id)
    );

    await Promise.all(updates);

    revalidatePath('/dashboard/website/builder');
    revalidatePath('/');

    return { success: true };
}
