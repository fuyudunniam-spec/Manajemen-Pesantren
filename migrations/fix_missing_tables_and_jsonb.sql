-- ============================================================================
-- MIGRATION: Fix Missing Tables & Empty JSONB
-- Date: 2026-01-13
-- Purpose: Stabilize database and fix immediate errors
-- ============================================================================

-- ============================================================================
-- PART 1: CREATE MISSING TABLES
-- ============================================================================

-- TABLE: navigation_items
CREATE TABLE IF NOT EXISTS navigation_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    href TEXT NOT NULL,
    position INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    parent_id UUID REFERENCES navigation_items(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_navigation_items_active ON navigation_items(is_active);
CREATE INDEX IF NOT EXISTS idx_navigation_items_position ON navigation_items(position);

-- TABLE: cta_buttons
CREATE TABLE IF NOT EXISTS cta_buttons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    href TEXT NOT NULL,
    variant TEXT DEFAULT 'default',
    location TEXT DEFAULT 'header',
    position INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cta_buttons_location ON cta_buttons(location);
CREATE INDEX IF NOT EXISTS idx_cta_buttons_active ON cta_buttons(is_active);

-- TABLE: footer_sections
CREATE TABLE IF NOT EXISTS footer_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    position INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLE: footer_links
CREATE TABLE IF NOT EXISTS footer_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES footer_sections(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    href TEXT NOT NULL,
    position INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_footer_links_section ON footer_links(section_id);

-- ============================================================================
-- PART 2: RLS POLICIES
-- ============================================================================

ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cta_buttons ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_links ENABLE ROW LEVEL SECURITY;

-- Navigation Policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'navigation_items' AND policyname = 'Navigation viewable by everyone') THEN
        CREATE POLICY "Navigation viewable by everyone" ON navigation_items
            FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'navigation_items' AND policyname = 'Navigation editable by authenticated') THEN
        CREATE POLICY "Navigation editable by authenticated" ON navigation_items
            FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- CTA Buttons Policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cta_buttons' AND policyname = 'CTA buttons viewable by everyone') THEN
        CREATE POLICY "CTA buttons viewable by everyone" ON cta_buttons
            FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cta_buttons' AND policyname = 'CTA buttons editable by authenticated') THEN
        CREATE POLICY "CTA buttons editable by authenticated" ON cta_buttons
            FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- Footer Sections Policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'footer_sections' AND policyname = 'Footer sections viewable by everyone') THEN
        CREATE POLICY "Footer sections viewable by everyone" ON footer_sections
            FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'footer_sections' AND policyname = 'Footer sections editable by authenticated') THEN
        CREATE POLICY "Footer sections editable by authenticated" ON footer_sections
            FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- Footer Links Policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'footer_links' AND policyname = 'Footer links viewable by everyone') THEN
        CREATE POLICY "Footer links viewable by everyone" ON footer_links
            FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'footer_links' AND policyname = 'Footer links editable by authenticated') THEN
        CREATE POLICY "Footer links editable by authenticated" ON footer_links
            FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- ============================================================================
-- PART 3: INSERT DEFAULT DATA
-- ============================================================================

-- Default Navigation
INSERT INTO navigation_items (label, href, position, is_active) VALUES
('Beranda', '/', 0, true),
('Profil', '/profil', 1, true),
('Program', '/program', 2, true),
('Berita', '/berita', 3, true),
('Kontak', '/kontak', 4, true)
ON CONFLICT DO NOTHING;

-- Default CTA Buttons
INSERT INTO cta_buttons (label, href, variant, location, position, is_active) VALUES
('Daftar Sekarang', '/psb', 'default', 'header', 0, true),
('Login e-Maktab', '/login', 'ghost', 'header', 1, true)
ON CONFLICT DO NOTHING;

-- Default Footer Sections
DO $$
DECLARE
    section_id_1 UUID;
    section_id_2 UUID;
    section_id_3 UUID;
BEGIN
    -- Insert footer sections and get their IDs
    INSERT INTO footer_sections (title, position, is_active) 
    VALUES ('Tentang Kami', 0, true)
    ON CONFLICT DO NOTHING
    RETURNING id INTO section_id_1;

    INSERT INTO footer_sections (title, position, is_active) 
    VALUES ('Program', 1, true)
    ON CONFLICT DO NOTHING
    RETURNING id INTO section_id_2;

    INSERT INTO footer_sections (title, position, is_active) 
    VALUES ('Informasi', 2, true)
    ON CONFLICT DO NOTHING
    RETURNING id INTO section_id_3;

    -- Insert footer links if sections were created
    IF section_id_1 IS NOT NULL THEN
        INSERT INTO footer_links (section_id, label, href, position) VALUES
        (section_id_1, 'Profil Pesantren', '/profil', 0),
        (section_id_1, 'Visi & Misi', '/profil#visi-misi', 1),
        (section_id_1, 'Sejarah', '/profil#sejarah', 2)
        ON CONFLICT DO NOTHING;
    END IF;

    IF section_id_2 IS NOT NULL THEN
        INSERT INTO footer_links (section_id, label, href, position) VALUES
        (section_id_2, 'Tahfidz', '/program/tahfidz', 0),
        (section_id_2, 'Kitab Kuning', '/program/kitab-kuning', 1),
        (section_id_2, 'Teknologi', '/program/teknologi', 2)
        ON CONFLICT DO NOTHING;
    END IF;

    IF section_id_3 IS NOT NULL THEN
        INSERT INTO footer_links (section_id, label, href, position) VALUES
        (section_id_3, 'Pendaftaran', '/psb', 0),
        (section_id_3, 'Kontak', '/kontak', 1),
        (section_id_3, 'FAQ', '/faq', 2)
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

-- ============================================================================
-- PART 4: FIX EMPTY JSONB COLUMNS
-- ============================================================================

-- Fix themes with empty config
UPDATE themes 
SET config = '{
    "colors": {
        "primary": "#3B82F6",
        "secondary": "#10B981",
        "accent": "#F59E0B",
        "background": "#FFFFFF",
        "text": "#1F2937"
    },
    "fonts": {
        "heading": "Inter",
        "body": "Inter"
    },
    "layout": {
        "border_radius": "0.5rem",
        "spacing": "medium"
    }
}'::jsonb
WHERE slug = 'modern' AND (config IS NULL OR config = '{}'::jsonb OR config = 'null'::jsonb);

UPDATE themes 
SET config = '{
    "colors": {
        "primary": "#064E3B",
        "secondary": "#0F766E",
        "accent": "#D97706",
        "background": "#FFFFFF",
        "text": "#0F172A"
    },
    "fonts": {
        "heading": "Playfair Display",
        "body": "Lora"
    },
    "layout": {
        "border_radius": "0.75rem",
        "spacing": "large"
    }
}'::jsonb
WHERE slug = 'royal' AND (config IS NULL OR config = '{}'::jsonb OR config = 'null'::jsonb);

-- Fix sections with empty content based on type
UPDATE sections
SET content = CASE 
    WHEN type = 'hero' THEN '{
        "headline": "Selamat Datang",
        "subheadline": "Deskripsi singkat halaman ini",
        "image_url": null,
        "cta_button": {"text": "Mulai", "url": "#"}
    }'::jsonb
    WHEN type = 'features' THEN '{
        "items": []
    }'::jsonb
    WHEN type = 'cta' THEN '{
        "headline": "Siap Bergabung?",
        "description": "Hubungi kami untuk informasi lebih lanjut",
        "button_text": "Hubungi Kami",
        "button_url": "/kontak"
    }'::jsonb
    WHEN type = 'stats' THEN '{
        "stats": []
    }'::jsonb
    WHEN type = 'team' THEN '{
        "items": []
    }'::jsonb
    WHEN type = 'testimonials' THEN '{
        "items": []
    }'::jsonb
    WHEN type = 'gallery' THEN '{
        "items": [],
        "columns": 3
    }'::jsonb
    WHEN type = 'contact' THEN '{
        "address": "",
        "phone": "",
        "email": "",
        "whatsapp": "",
        "map_embed": null
    }'::jsonb
    ELSE '{}'::jsonb
END
WHERE content IS NULL OR content = '{}'::jsonb OR content = 'null'::jsonb;
