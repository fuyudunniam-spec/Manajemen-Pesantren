-- Migration: CMS Enhancement - Navigation, Buttons, Footer, Contact
-- Created: 2026-01-11
-- Description: Add tables for managing navigation, CTA buttons, footer sections, contact info, and social media

-- ============================================================================
-- 1. NAVIGATION ITEMS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.navigation_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label VARCHAR(100) NOT NULL,
    href VARCHAR(500) NOT NULL,
    parent_id UUID REFERENCES public.navigation_items(id) ON DELETE CASCADE,
    position INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    open_in_new_tab BOOLEAN DEFAULT false,
    icon VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_navigation_items_parent ON public.navigation_items(parent_id);
CREATE INDEX IF NOT EXISTS idx_navigation_items_position ON public.navigation_items(position);
CREATE INDEX IF NOT EXISTS idx_navigation_items_active ON public.navigation_items(is_active);

-- ============================================================================
-- 2. CTA BUTTONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.cta_buttons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(50) UNIQUE NOT NULL,
    label VARCHAR(100) NOT NULL,
    href VARCHAR(500) NOT NULL,
    variant VARCHAR(50) DEFAULT 'default',
    size VARCHAR(20) DEFAULT 'default',
    icon VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    position INTEGER DEFAULT 0,
    location VARCHAR(50) NOT NULL, -- 'header', 'hero', 'footer', etc.
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_cta_buttons_key ON public.cta_buttons(key);
CREATE INDEX IF NOT EXISTS idx_cta_buttons_location ON public.cta_buttons(location);
CREATE INDEX IF NOT EXISTS idx_cta_buttons_active ON public.cta_buttons(is_active);

-- ============================================================================
-- 3. FOOTER SECTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.footer_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    position INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_footer_sections_position ON public.footer_sections(position);
CREATE INDEX IF NOT EXISTS idx_footer_sections_active ON public.footer_sections(is_active);

-- ============================================================================
-- 4. FOOTER LINKS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.footer_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_id UUID REFERENCES public.footer_sections(id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL,
    href VARCHAR(500) NOT NULL,
    position INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_footer_links_section ON public.footer_links(section_id);
CREATE INDEX IF NOT EXISTS idx_footer_links_position ON public.footer_links(position);
CREATE INDEX IF NOT EXISTS idx_footer_links_active ON public.footer_links(is_active);

-- ============================================================================
-- 5. CONTACT INFO TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.contact_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(50) NOT NULL,
    label VARCHAR(100),
    value TEXT NOT NULL,
    icon VARCHAR(50),
    is_primary BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_info_type ON public.contact_info(type);
CREATE INDEX IF NOT EXISTS idx_contact_info_primary ON public.contact_info(is_primary);
CREATE INDEX IF NOT EXISTS idx_contact_info_active ON public.contact_info(is_active);

-- ============================================================================
-- 6. SOCIAL MEDIA TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.social_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(500) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_social_media_platform ON public.social_media(platform);
CREATE INDEX IF NOT EXISTS idx_social_media_active ON public.social_media(is_active);
CREATE INDEX IF NOT EXISTS idx_social_media_position ON public.social_media(position);

-- ============================================================================
-- 7. UPDATE WEBSITE_SETTINGS TABLE
-- ============================================================================
ALTER TABLE public.website_settings 
ADD COLUMN IF NOT EXISTS hero_period_label VARCHAR(100),
ADD COLUMN IF NOT EXISTS hero_period_value VARCHAR(100),
ADD COLUMN IF NOT EXISTS hero_academic_year VARCHAR(50);

-- ============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cta_buttons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_media ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public can view active navigation items"
    ON public.navigation_items FOR SELECT
    USING (is_active = true);

CREATE POLICY "Public can view active CTA buttons"
    ON public.cta_buttons FOR SELECT
    USING (is_active = true);

CREATE POLICY "Public can view active footer sections"
    ON public.footer_sections FOR SELECT
    USING (is_active = true);

CREATE POLICY "Public can view active footer links"
    ON public.footer_links FOR SELECT
    USING (is_active = true);

CREATE POLICY "Public can view active contact info"
    ON public.contact_info FOR SELECT
    USING (is_active = true);

CREATE POLICY "Public can view active social media"
    ON public.social_media FOR SELECT
    USING (is_active = true);

-- Admin full access (authenticated users with proper role)
CREATE POLICY "Authenticated users can manage navigation items"
    ON public.navigation_items FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage CTA buttons"
    ON public.cta_buttons FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage footer sections"
    ON public.footer_sections FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage footer links"
    ON public.footer_links FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage contact info"
    ON public.contact_info FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage social media"
    ON public.social_media FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- ============================================================================
-- 9. SEED INITIAL DATA
-- ============================================================================

-- Navigation Items (Main Menu)
INSERT INTO public.navigation_items (label, href, position, is_active) VALUES
('Beranda', '/', 0, true),
('Profil', '/profil', 1, true),
('Program', '/program', 2, true),
('Galeri', '/galeri', 3, true),
('Berita', '/berita', 4, true),
('Kontak', '/kontak', 5, true)
ON CONFLICT DO NOTHING;

-- CTA Buttons
INSERT INTO public.cta_buttons (key, label, href, variant, size, location, position, is_active) VALUES
('header_login', 'Masuk', '/login', 'ghost', 'sm', 'header', 0, true),
('header_donate', 'Donasi Sekarang', '/donasi', 'default', 'sm', 'header', 1, true),
('hero_register', 'Daftar Sekarang', '/psb/daftar', 'default', 'lg', 'hero', 0, true),
('hero_contact', 'Hubungi Kami', '/kontak', 'outline', 'lg', 'hero', 1, true)
ON CONFLICT (key) DO NOTHING;

-- Footer Sections
INSERT INTO public.footer_sections (title, position, is_active) VALUES
('Navigasi', 0, true),
('Program Kami', 1, true)
ON CONFLICT DO NOTHING;

-- Get section IDs for footer links
DO $$
DECLARE
    nav_section_id UUID;
    program_section_id UUID;
BEGIN
    SELECT id INTO nav_section_id FROM public.footer_sections WHERE title = 'Navigasi' LIMIT 1;
    SELECT id INTO program_section_id FROM public.footer_sections WHERE title = 'Program Kami' LIMIT 1;
    
    -- Footer Links - Navigation Section
    IF nav_section_id IS NOT NULL THEN
        INSERT INTO public.footer_links (section_id, label, href, position, is_active) VALUES
        (nav_section_id, 'Profil Pesantren', '/profil', 0, true),
        (nav_section_id, 'Program Unggulan', '/program', 1, true),
        (nav_section_id, 'Pendaftaran (PSB)', '/psb', 2, true),
        (nav_section_id, 'Galeri Kegiatan', '/galeri', 3, true),
        (nav_section_id, 'Berita Terkini', '/berita', 4, true)
        ON CONFLICT DO NOTHING;
    END IF;
    
    -- Footer Links - Program Section
    IF program_section_id IS NOT NULL THEN
        INSERT INTO public.footer_links (section_id, label, href, position, is_active) VALUES
        (program_section_id, 'Pendidikan Formal', '/program/pendidikan', 0, true),
        (program_section_id, 'Tahfidz Al-Quran', '/program/tahfidz', 1, true),
        (program_section_id, 'Madrasah Diniyah', '/program/madin', 2, true),
        (program_section_id, 'Entrepreneurship', '/program/entrepreneur', 3, true),
        (program_section_id, 'Beasiswa Yatim', '/program/beasiswa', 4, true)
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

-- Contact Info
INSERT INTO public.contact_info (type, label, value, icon, is_primary, position, is_active) VALUES
('address', 'Alamat Kami', 'Jl. Raya Pesantren No. 99, Kecamatan Klojen, Kota Malang, Jawa Timur', 'MapPin', true, 0, true),
('phone', 'Telepon', '(0341) 123-4567', 'Phone', true, 1, true),
('email', 'Email', 'info@albisri.com', 'Mail', true, 2, true)
ON CONFLICT DO NOTHING;

-- Social Media
INSERT INTO public.social_media (platform, url, position, is_active) VALUES
('facebook', 'https://facebook.com/albisri', 0, true),
('instagram', 'https://instagram.com/albisri', 1, true),
('youtube', 'https://youtube.com/@albisri', 2, true),
('twitter', 'https://twitter.com/albisri', 3, true)
ON CONFLICT DO NOTHING;

-- Update website_settings with hero section data
UPDATE public.website_settings 
SET 
    hero_period_label = 'PERIODE',
    hero_period_value = 'Gelombang 1: Jan - Mar 2026',
    hero_academic_year = '2026/2027'
WHERE id = (SELECT id FROM public.website_settings LIMIT 1);

-- ============================================================================
-- 10. COMMENTS
-- ============================================================================

COMMENT ON TABLE public.navigation_items IS 'Stores navigation menu items with support for hierarchical structure';
COMMENT ON TABLE public.cta_buttons IS 'Stores Call-to-Action buttons used across the website';
COMMENT ON TABLE public.footer_sections IS 'Stores footer section headers';
COMMENT ON TABLE public.footer_links IS 'Stores links within footer sections';
COMMENT ON TABLE public.contact_info IS 'Stores contact information (address, phone, email, etc.)';
COMMENT ON TABLE public.social_media IS 'Stores social media platform links';
