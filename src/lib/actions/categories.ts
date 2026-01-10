"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { generateSlug } from "@/lib/blog-utils";

export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    color: string;
    icon?: string;
    display_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export async function getCategories(includeInactive = false) {
    const supabase = createClient();

    let query = supabase
        .from("blog_categories")
        .select("*")
        .order("display_order", { ascending: true });

    if (!includeInactive) {
        query = query.eq("is_active", true);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching categories:", error);
        return [];
    }

    return data as BlogCategory[];
}

export async function getCategory(slug: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("Error fetching category:", error);
        return null;
    }

    return data as BlogCategory;
}

export async function createCategory(formData: FormData) {
    const supabase = createClient();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const color = formData.get("color") as string;
    const icon = formData.get("icon") as string;
    const display_order = parseInt(formData.get("display_order") as string) || 0;

    const { data, error } = await supabase
        .from("blog_categories")
        .insert({
            name,
            slug,
            description,
            color,
            icon,
            display_order,
            is_active: true,
        })
        .select()
        .single();

    if (error) {
        console.error("Error creating category:", error);
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/website/categories");
    revalidatePath("/berita");
    return data;
}

export async function updateCategory(id: string, formData: FormData) {
    const supabase = createClient();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const color = formData.get("color") as string;
    const icon = formData.get("icon") as string;
    const display_order = parseInt(formData.get("display_order") as string) || 0;
    const is_active = formData.get("is_active") === "true";

    const { data, error } = await supabase
        .from("blog_categories")
        .update({
            name,
            slug,
            description,
            color,
            icon,
            display_order,
            is_active,
            updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error updating category:", error);
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/website/categories");
    revalidatePath("/berita");
    return data;
}

export async function deleteCategory(id: string) {
    const supabase = createClient();

    // Check if category has posts
    const { count } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true })
        .eq("category_id", id);

    if (count && count > 0) {
        throw new Error("Cannot delete category with existing posts");
    }

    const { error } = await supabase
        .from("blog_categories")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting category:", error);
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/website/categories");
    revalidatePath("/berita");
}

export async function toggleCategoryStatus(id: string, isActive: boolean) {
    const supabase = createClient();

    const { error } = await supabase
        .from("blog_categories")
        .update({ is_active: isActive, updated_at: new Date().toISOString() })
        .eq("id", id);

    if (error) {
        console.error("Error toggling category status:", error);
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/website/categories");
    revalidatePath("/berita");
}
