"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface StaticPage {
    id: string;
    slug: string;
    title: string;
    meta_description?: string;
    hero_image?: string;
    hero_title?: string;
    hero_subtitle?: string;
    content: any[]; // JSONB content sections
    is_published: boolean;
    updated_by?: string;
    created_at: string;
    updated_at: string;
}

export async function getStaticPage(slug: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("static_pages")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

    if (error) {
        console.error("Error fetching static page:", error);
        return null;
    }

    return data as StaticPage;
}

export async function getStaticPageForEdit(slug: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("static_pages")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("Error fetching static page:", error);
        return null;
    }

    return data as StaticPage;
}

export async function updateStaticPage(slug: string, formData: FormData) {
    const supabase = await createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const title = formData.get("title") as string;
    const meta_description = formData.get("meta_description") as string;
    const hero_image = formData.get("hero_image") as string;
    const hero_title = formData.get("hero_title") as string;
    const hero_subtitle = formData.get("hero_subtitle") as string;
    const content = formData.get("content") as string;
    const is_published = formData.get("is_published") === "true";

    const { data, error } = await supabase
        .from("static_pages")
        .update({
            title,
            meta_description,
            hero_image,
            hero_title,
            hero_subtitle,
            content: content ? JSON.parse(content) : [],
            is_published,
            updated_by: user.id,
            updated_at: new Date().toISOString(),
        })
        .eq("slug", slug)
        .select()
        .single();

    if (error) {
        console.error("Error updating static page:", error);
        throw new Error(error.message);
    }

    revalidatePath(`/${slug}`);
    revalidatePath("/dashboard/website/pages");
    return data;
}
