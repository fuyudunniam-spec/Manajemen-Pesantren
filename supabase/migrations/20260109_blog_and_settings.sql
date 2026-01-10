-- Migration: Create blog_posts and website_settings tables
-- Created: 2026-01-09

-- ============================================================================
-- Table: blog_posts
-- Description: Stores blog articles/posts for the website
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    content TEXT,
    excerpt TEXT,
    featured_image TEXT,
    category TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);

-- Create index on published status for filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(is_published, published_at DESC);

-- ============================================================================
-- Table: website_settings
-- Description: Stores website configuration (logo, name, etc.)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.website_settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- Blog Posts Policies
-- Anyone can read published posts
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;
CREATE POLICY "Public can read published posts" ON public.blog_posts
    FOR SELECT 
    USING (is_published = true);

-- Authenticated users can read all posts (for dashboard)
DROP POLICY IF EXISTS "Authenticated users can read all posts" ON public.blog_posts;
CREATE POLICY "Authenticated users can read all posts" ON public.blog_posts
    FOR SELECT 
    TO authenticated
    USING (true);

-- Authenticated users can insert posts
DROP POLICY IF EXISTS "Authenticated users can create posts" ON public.blog_posts;
CREATE POLICY "Authenticated users can create posts" ON public.blog_posts
    FOR INSERT 
    TO authenticated
    WITH CHECK (true);

-- Authenticated users can update posts
DROP POLICY IF EXISTS "Authenticated users can update posts" ON public.blog_posts;
CREATE POLICY "Authenticated users can update posts" ON public.blog_posts
    FOR UPDATE 
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Authenticated users can delete posts
DROP POLICY IF EXISTS "Authenticated users can delete posts" ON public.blog_posts;
CREATE POLICY "Authenticated users can delete posts" ON public.blog_posts
    FOR DELETE 
    TO authenticated
    USING (true);

-- Website Settings Policies
-- Anyone can read settings
DROP POLICY IF EXISTS "Public can read settings" ON public.website_settings;
CREATE POLICY "Public can read settings" ON public.website_settings
    FOR SELECT 
    USING (true);

-- Authenticated users can manage settings
DROP POLICY IF EXISTS "Authenticated users can manage settings" ON public.website_settings;
CREATE POLICY "Authenticated users can manage settings" ON public.website_settings
    FOR ALL 
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- Default Settings Data
-- ============================================================================
INSERT INTO public.website_settings (key, value) VALUES
    ('site_title', 'e-Maktab'),
    ('site_tagline', 'Pondok Pesantren'),
    ('site_description', 'Sistem manajemen pesantren modern'),
    ('site_logo', ''),
    ('site_logo_small', ''),
    ('footer_text', 'Membentuk generasi Qurani yang berakhlak mulia, berilmu, dan bermanfaat bagi umat.')
ON CONFLICT (key) DO NOTHING;

-- ============================================================================
-- Functions & Triggers
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for blog_posts
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for website_settings
DROP TRIGGER IF EXISTS update_website_settings_updated_at ON public.website_settings;
CREATE TRIGGER update_website_settings_updated_at
    BEFORE UPDATE ON public.website_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
