-- Migration: Comprehensive Database Schema for Professional CMS
-- Created: 2026-01-10
-- Applied via MCP to project: hljmamcoaaqxdytupsra
-- Purpose: Complete schema for website management, themes, menus, media, and audit

-- ============================================================================
-- FIX: Testimonials Section Key (Applied First)
-- ============================================================================
UPDATE public.website_sections 
SET section_key = 'testimonials',
    section_type = 'testimonials'
WHERE section_key LIKE 'testimonials-%' OR section_type = 'testimonials';

-- If no testimonials section exists, create one
INSERT INTO public.website_sections (
    section_key, page, section_type, title, subtitle, content, is_visible, order_index
)
SELECT 
    'testimonials', 'home', 'testimonials', 'Kata Mereka', 'Testimoni dari wali santri, alumni, dan masyarakat',
    '{"testimonials": [
        {"name": "H. Abdullah", "role": "Wali Santri", "content": "Alhamdulillah, sejak anak saya mondok di pesantren, hafalan Qurannya lancar dan akhlaknya jauh lebih baik."},
        {"name": "Fatimah Azzahra", "role": "Alumni 2023", "content": "Masa-masa di pesantren adalah masa terindah. Saya tidak hanya belajar agama, tapi juga leadership."},
        {"name": "Ustadz Yusuf", "role": "Tokoh Masyarakat", "content": "Pesantren ini adalah aset umat yang berharga. Program sosialnya sangat membantu anak-anak yatim."}
    ]}'::jsonb, true, 7
WHERE NOT EXISTS (SELECT 1 FROM public.website_sections WHERE section_key = 'testimonials');

-- ============================================================================
-- ADD: Missing Sections for Complete Homepage
-- ============================================================================
INSERT INTO public.website_sections (section_key, page, section_type, title, subtitle, content, is_visible, order_index)
SELECT 'stats', 'home', 'stats', 'Pesantren dalam Angka', 'Data terkini tentang pesantren kami',
    '{"stats": [
        {"value": "500+", "label": "Santri Aktif", "icon": "users"},
        {"value": "50+", "label": "Pengajar", "icon": "book-open"},
        {"value": "15+", "label": "Tahun Berkarya", "icon": "clock"},
        {"value": "1000+", "label": "Alumni", "icon": "graduation-cap"}
    ]}'::jsonb, true, 2
WHERE NOT EXISTS (SELECT 1 FROM public.website_sections WHERE section_key = 'stats');

INSERT INTO public.website_sections (section_key, page, section_type, title, subtitle, content, is_visible, order_index)
SELECT 'programs', 'home', 'programs', 'Program Unggulan', 'Program pendidikan berkualitas untuk santri',
    '{"programs": [
        {"title": "Tahfidz Al-Quran", "description": "Program menghafal Al-Quran dengan metode modern", "icon": "book"},
        {"title": "Pendidikan Formal", "description": "Kurikulum diknas terintegrasi dengan pesantren", "icon": "graduation-cap"},
        {"title": "Bahasa Arab & Inggris", "description": "Program bahasa intensif untuk komunikasi global", "icon": "globe"},
        {"title": "Life Skills", "description": "Pelatihan keterampilan hidup dan kewirausahaan", "icon": "briefcase"}
    ]}'::jsonb, true, 4
WHERE NOT EXISTS (SELECT 1 FROM public.website_sections WHERE section_key = 'programs');

INSERT INTO public.website_sections (section_key, page, section_type, title, subtitle, content, is_visible, order_index)
SELECT 'gallery', 'home', 'gallery', 'Galeri Kegiatan', 'Momen-momen berharga di pesantren',
    '{"images": []}'::jsonb, true, 5
WHERE NOT EXISTS (SELECT 1 FROM public.website_sections WHERE section_key = 'gallery');

INSERT INTO public.website_sections (section_key, page, section_type, title, subtitle, content, is_visible, order_index)
SELECT 'donation', 'home', 'donation', 'Program Donasi', 'Bersama membangun generasi Qurani',
    '{"description": "Salurkan sedekah dan infaq Anda", "button_text": "Donasi Sekarang", "button_link": "/donasi"}'::jsonb, true, 6
WHERE NOT EXISTS (SELECT 1 FROM public.website_sections WHERE section_key = 'donation');

-- ============================================================================
-- Table: website_themes
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.website_themes (
    key TEXT PRIMARY KEY DEFAULT 'default',
    primary_color TEXT DEFAULT '#10B981',
    secondary_color TEXT DEFAULT '#1F2937',
    accent_color TEXT DEFAULT '#F59E0B',
    background_color TEXT DEFAULT '#FFFFFF',
    foreground_color TEXT DEFAULT '#111827',
    heading_font TEXT DEFAULT 'Plus Jakarta Sans',
    body_font TEXT DEFAULT 'Plus Jakarta Sans',
    border_radius TEXT DEFAULT '0.5rem',
    sidebar_style TEXT DEFAULT 'dark',
    updated_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.website_themes (key) VALUES ('default') ON CONFLICT (key) DO NOTHING;

-- ============================================================================
-- Table: website_menus
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.website_menus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location TEXT NOT NULL DEFAULT 'header',
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    target TEXT DEFAULT '_self',
    icon TEXT,
    parent_id UUID REFERENCES public.website_menus(id) ON DELETE CASCADE,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_website_menus_location ON public.website_menus(location, is_active, display_order);

-- ============================================================================
-- Table: media_library
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.media_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    width INTEGER,
    height INTEGER,
    alt_text TEXT,
    caption TEXT,
    folder TEXT DEFAULT 'uploads',
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_library_type ON public.media_library(file_type);
CREATE INDEX IF NOT EXISTS idx_media_library_folder ON public.media_library(folder);

-- ============================================================================
-- Table: audit_log
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    action TEXT NOT NULL,
    old_data JSONB,
    new_data JSONB,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    user_email TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_table ON public.audit_log(table_name, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON public.audit_log(user_id);

-- ============================================================================
-- Row Level Security Policies
-- ============================================================================
ALTER TABLE public.website_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.static_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- website_themes policies
DROP POLICY IF EXISTS "Public can read themes" ON public.website_themes;
CREATE POLICY "Public can read themes" ON public.website_themes FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated users can manage themes" ON public.website_themes;
CREATE POLICY "Authenticated users can manage themes" ON public.website_themes
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- website_menus policies
DROP POLICY IF EXISTS "Public can read active menus" ON public.website_menus;
CREATE POLICY "Public can read active menus" ON public.website_menus FOR SELECT USING (is_active = true);
DROP POLICY IF EXISTS "Authenticated users can manage menus" ON public.website_menus;
CREATE POLICY "Authenticated users can manage menus" ON public.website_menus
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- media_library policies
DROP POLICY IF EXISTS "Public can read media" ON public.media_library;
CREATE POLICY "Public can read media" ON public.media_library FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated users can manage media" ON public.media_library;
CREATE POLICY "Authenticated users can manage media" ON public.media_library
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- audit_log policies
DROP POLICY IF EXISTS "Authenticated users can read audit log" ON public.audit_log;
CREATE POLICY "Authenticated users can read audit log" ON public.audit_log
    FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "System can insert audit log" ON public.audit_log;
CREATE POLICY "System can insert audit log" ON public.audit_log
    FOR INSERT TO authenticated WITH CHECK (true);

-- static_pages policies
DROP POLICY IF EXISTS "Public can read published static pages" ON public.static_pages;
CREATE POLICY "Public can read published static pages" ON public.static_pages FOR SELECT USING (is_published = true);
DROP POLICY IF EXISTS "Authenticated users can read all static pages" ON public.static_pages;
CREATE POLICY "Authenticated users can read all static pages" ON public.static_pages
    FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Authenticated users can manage static pages" ON public.static_pages;
CREATE POLICY "Authenticated users can manage static pages" ON public.static_pages
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- blog_categories policies
DROP POLICY IF EXISTS "Public can read active categories" ON public.blog_categories;
CREATE POLICY "Public can read active categories" ON public.blog_categories FOR SELECT USING (is_active = true);
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON public.blog_categories;
CREATE POLICY "Authenticated users can manage categories" ON public.blog_categories
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- blog_posts policies
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;
CREATE POLICY "Public can read published posts" ON public.blog_posts FOR SELECT USING (is_published = true);
DROP POLICY IF EXISTS "Authenticated can read all posts" ON public.blog_posts;
CREATE POLICY "Authenticated can read all posts" ON public.blog_posts FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Authenticated can create posts" ON public.blog_posts;
CREATE POLICY "Authenticated can create posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Authenticated can update posts" ON public.blog_posts;
CREATE POLICY "Authenticated can update posts" ON public.blog_posts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Authenticated can delete posts" ON public.blog_posts;
CREATE POLICY "Authenticated can delete posts" ON public.blog_posts FOR DELETE TO authenticated USING (true);

-- ============================================================================
-- Default static pages
-- ============================================================================
INSERT INTO public.static_pages (slug, title, hero_title, hero_subtitle, is_published) 
SELECT 'profil', 'Profil Pesantren', 'Profil Pesantren', 'Mengenal lebih dekat sejarah dan visi misi', true
WHERE NOT EXISTS (SELECT 1 FROM public.static_pages WHERE slug = 'profil');

INSERT INTO public.static_pages (slug, title, hero_title, hero_subtitle, is_published) 
SELECT 'kontak', 'Hubungi Kami', 'Hubungi Kami', 'Silakan hubungi kami untuk informasi lebih lanjut', true
WHERE NOT EXISTS (SELECT 1 FROM public.static_pages WHERE slug = 'kontak');

INSERT INTO public.static_pages (slug, title, hero_title, hero_subtitle, is_published) 
SELECT 'donasi', 'Program Donasi', 'Program Donasi', 'Berpartisipasi dalam membangun generasi Qurani', true
WHERE NOT EXISTS (SELECT 1 FROM public.static_pages WHERE slug = 'donasi');

-- ============================================================================
-- Default navigation menus
-- ============================================================================
INSERT INTO public.website_menus (location, label, url, display_order) VALUES
    ('header', 'Beranda', '/', 1),
    ('header', 'Profil', '/profil', 2),
    ('header', 'Program', '/program', 3),
    ('header', 'Galeri', '/galeri', 4),
    ('header', 'Berita', '/berita', 5),
    ('header', 'Kontak', '/kontak', 6),
    ('header', 'PSB', '/psb', 7)
ON CONFLICT DO NOTHING;
