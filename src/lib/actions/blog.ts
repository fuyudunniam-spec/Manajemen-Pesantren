"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { generateSlug } from "@/lib/blog-utils";

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    featured_image?: string;
    image_caption?: string;
    category_id?: string;
    category?: string; // Legacy field
    tags?: string[];
    is_published: boolean;
    published_at?: string;
    created_by: string;
    updated_by?: string;
    created_at: string;
    updated_at: string;
    // Joined data
    blog_categories?: {
        id: string;
        name: string;
        slug: string;
        color: string;
    };
}

export interface BlogPostWithCategory extends BlogPost {
    category_name?: string;
    category_slug?: string;
    category_color?: string;
}

export async function getBlogPosts(filters?: {
    published?: boolean;
    categoryId?: string;
    search?: string;
    limit?: number;
    offset?: number;
}) {
    const supabase = createClient();

    let query = supabase
        .from("blog_posts")
        .select(`
      *,
      blog_categories (
        id,
        name,
        slug,
        color
      )
    `)
        .order("created_at", { ascending: false });

    if (filters?.published !== undefined) {
        query = query.eq("is_published", filters.published);
    }

    if (filters?.categoryId) {
        query = query.eq("category_id", filters.categoryId);
    }

    if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`);
    }

    if (filters?.limit) {
        query = query.limit(filters.limit);
    }

    if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching blog posts:", error);
        return [];
    }

    return data as BlogPost[];
}

export async function getBlogPost(slug: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("blog_posts")
        .select(`
      *,
      blog_categories (
        id,
        name,
        slug,
        color
      )
    `)
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("Error fetching blog post:", error);
        return null;
    }

    return data as BlogPost;
}

export async function getBlogPostById(id: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("blog_posts")
        .select(`
      *,
      blog_categories (
        id,
        name,
        slug,
        color
      )
    `)
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching blog post:", error);
        return null;
    }

    return data as BlogPost;
}

export async function createBlogPost(formData: FormData) {
    const supabase = createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const featured_image = formData.get("featured_image") as string;
    const image_caption = formData.get("image_caption") as string;
    const category_id = formData.get("category_id") as string;
    const tags = formData.get("tags") as string;
    const is_published = formData.get("is_published") === "true";

    const { data, error } = await supabase
        .from("blog_posts")
        .insert({
            title,
            slug,
            excerpt,
            content,
            featured_image,
            image_caption,
            category_id: category_id || null,
            tags: tags ? tags.split(",").map(t => t.trim()) : [],
            is_published,
            published_at: is_published ? new Date().toISOString() : null,
            created_by: user.id,
            updated_by: user.id,
        })
        .select()
        .single();

    if (error) {
        console.error("Error creating blog post:", error);
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/website/blog");
    revalidatePath("/berita");
    return data;
}

export async function updateBlogPost(id: string, formData: FormData) {
    const supabase = createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const featured_image = formData.get("featured_image") as string;
    const image_caption = formData.get("image_caption") as string;
    const category_id = formData.get("category_id") as string;
    const tags = formData.get("tags") as string;
    const is_published = formData.get("is_published") === "true";

    // Get existing post to check if it was previously unpublished
    const existing = await getBlogPostById(id);
    const wasUnpublished = existing && !existing.is_published;

    const { data, error } = await supabase
        .from("blog_posts")
        .update({
            title,
            slug,
            excerpt,
            content,
            featured_image,
            image_caption,
            category_id: category_id || null,
            tags: tags ? tags.split(",").map(t => t.trim()) : [],
            is_published,
            // Only set published_at if newly publishing
            published_at: (is_published && wasUnpublished) ? new Date().toISOString() : existing?.published_at,
            updated_by: user.id,
            updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error updating blog post:", error);
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/website/blog");
    revalidatePath("/berita");
    revalidatePath(`/berita/${slug}`);
    return data;
}

export async function deleteBlogPost(id: string) {
    const supabase = createClient();

    const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting blog post:", error);
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/website/blog");
    revalidatePath("/berita");
}

export async function togglePublishStatus(id: string, isPublished: boolean) {
    const supabase = createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const updateData: any = {
        is_published: isPublished,
        updated_by: user.id,
        updated_at: new Date().toISOString(),
    };

    // Set published_at when publishing for the first time
    if (isPublished) {
        const existing = await getBlogPostById(id);
        if (existing && !existing.published_at) {
            updateData.published_at = new Date().toISOString();
        }
    }

    const { error } = await supabase
        .from("blog_posts")
        .update(updateData)
        .eq("id", id);

    if (error) {
        console.error("Error toggling publish status:", error);
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/website/blog");
    revalidatePath("/berita");
}
