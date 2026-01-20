-- Migration: Add Authors Table for Blog System
-- Created: 2026-01-11
-- Purpose: Separate author profiles from authentication system

-- ============================================================================
-- Table: authors
-- Description: Stores author/contributor profiles for blog posts
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.authors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    bio TEXT,
    avatar_url TEXT,
    email TEXT,
    website TEXT,
    twitter TEXT,
    facebook TEXT,
    instagram TEXT,
    linkedin TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_authors_slug ON public.authors(slug);
CREATE INDEX IF NOT EXISTS idx_authors_active ON public.authors(is_active, display_order);

-- ============================================================================
-- Modify blog_posts table to add author relationship
-- ============================================================================
-- Add author_id column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'blog_posts' 
        AND column_name = 'author_id'
    ) THEN
        ALTER TABLE public.blog_posts 
        ADD COLUMN author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL;
        
        CREATE INDEX idx_blog_posts_author ON public.blog_posts(author_id);
    END IF;
END $$;

-- ============================================================================
-- Row Level Security Policies
-- ============================================================================
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;

-- Public can read active authors
DROP POLICY IF EXISTS "Public can read active authors" ON public.authors;
CREATE POLICY "Public can read active authors" ON public.authors 
    FOR SELECT 
    USING (is_active = true);

-- Authenticated users can read all authors
DROP POLICY IF EXISTS "Authenticated can read all authors" ON public.authors;
CREATE POLICY "Authenticated can read all authors" ON public.authors 
    FOR SELECT 
    TO authenticated 
    USING (true);

-- Authenticated users can manage authors
DROP POLICY IF EXISTS "Authenticated can manage authors" ON public.authors;
CREATE POLICY "Authenticated can manage authors" ON public.authors 
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

-- ============================================================================
-- Default Authors
-- ============================================================================
INSERT INTO public.authors (name, slug, bio, is_active) VALUES
    ('Admin Pesantren', 'admin-pesantren', 'Tim redaksi dan pengelola konten website Pesantren Al-Bisri', true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- Triggers
-- ============================================================================
-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_authors_updated_at ON public.authors;
CREATE TRIGGER update_authors_updated_at
    BEFORE UPDATE ON public.authors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
