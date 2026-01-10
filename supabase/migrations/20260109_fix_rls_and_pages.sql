-- Migration: Fix RLS policies and enhance static pages
-- Created: 2026-01-09
-- Purpose: Fix 403 error on website_settings and add columns for static pages

-- ============================================================================
-- FIX: website_settings RLS Policy (403 Error)
-- ============================================================================

-- Drop the incorrect policy that uses auth.role()
DROP POLICY IF EXISTS "Authenticated users can manage settings" ON public.website_settings;

-- Create correct policy for authenticated users
CREATE POLICY "Authenticated users can manage settings" ON public.website_settings
    FOR ALL 
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- ENHANCE: website_pages table for images and menu integration
-- ============================================================================

-- Add columns if they don't exist
ALTER TABLE public.website_pages 
ADD COLUMN IF NOT EXISTS hero_image TEXT,
ADD COLUMN IF NOT EXISTS show_in_nav BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS nav_label TEXT,
ADD COLUMN IF NOT EXISTS nav_order INTEGER DEFAULT 999,
ADD COLUMN IF NOT EXISTS page_type TEXT DEFAULT 'static';

-- Create index for navigation queries (performance optimization)
CREATE INDEX IF NOT EXISTS idx_website_pages_nav 
ON public.website_pages(show_in_nav, nav_order, is_published)
WHERE show_in_nav = true;

-- ============================================================================
-- VERIFY: Ensure RLS is enabled
-- ============================================================================

-- Make sure RLS is enabled on the tables
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_pages ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON COLUMN public.website_pages.hero_image IS 'URL to hero/banner image for the page';
COMMENT ON COLUMN public.website_pages.show_in_nav IS 'Whether this page should appear in header navigation menu';
COMMENT ON COLUMN public.website_pages.nav_label IS 'Custom label for navigation menu (if different from title)';
COMMENT ON COLUMN public.website_pages.nav_order IS 'Order in navigation menu (lower numbers first)';
COMMENT ON COLUMN public.website_pages.page_type IS 'Type of page: static, gallery, custom';
