-- Add navigation fields to blog_posts and static_pages for unified navigation
-- Migration: 20260112_unified_navigation.sql
-- Created: 2026-01-12

-- Add show_in_nav field to blog_posts if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='blog_posts' AND column_name='show_in_nav') THEN
        ALTER TABLE public.blog_posts ADD COLUMN show_in_nav BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Add nav_order field to blog_posts if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='blog_posts' AND column_name='nav_order') THEN
        ALTER TABLE public.blog_posts ADD COLUMN nav_order INTEGER;
    END IF;
END $$;

-- Add nav_label field to blog_posts if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='blog_posts' AND column_name='nav_label') THEN
        ALTER TABLE public.blog_posts ADD COLUMN nav_label TEXT;
    END IF;
END $$;

-- Add show_in_nav field to static_pages if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='static_pages' AND column_name='show_in_nav') THEN
        ALTER TABLE public.static_pages ADD COLUMN show_in_nav BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Add nav_order field to static_pages if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='static_pages' AND column_name='nav_order') THEN
        ALTER TABLE public.static_pages ADD COLUMN nav_order INTEGER;
    END IF;
END $$;

-- Add nav_label field to static_pages if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='static_pages' AND column_name='nav_label') THEN
        ALTER TABLE public.static_pages ADD COLUMN nav_label TEXT;
    END IF;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_show_in_nav ON public.blog_posts(show_in_nav) WHERE show_in_nav = true;
CREATE INDEX IF NOT EXISTS idx_static_pages_show_in_nav ON public.static_pages(show_in_nav) WHERE show_in_nav = true;

-- Comment on columns
COMMENT ON COLUMN public.blog_posts.show_in_nav IS 'Whether this blog post should appear in the main navigation menu';
COMMENT ON COLUMN public.blog_posts.nav_order IS 'Order position in navigation menu (lower numbers appear first)';
COMMENT ON COLUMN public.blog_posts.nav_label IS 'Custom label to show in navigation (defaults to title if empty)';

COMMENT ON COLUMN public.static_pages.show_in_nav IS 'Whether this page should appear in the main navigation menu';
COMMENT ON COLUMN public.static_pages.nav_order IS 'Order position in navigation menu (lower numbers appear first)';
COMMENT ON COLUMN public.static_pages.nav_label IS 'Custom label to show in navigation (defaults to title if empty)';
