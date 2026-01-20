-- Migration: Redesign Al Hikmah Style (Content)
-- Date: 2026-01-14
-- Purpose: Reset content structure for minimal, elegant, islamic, philanthropic design.

-- 1. Update Theme Config (Royal Emerald)
UPDATE public.themes
SET 
    is_active = TRUE,
    config = '{
        "colors": {
            "primary": "#1B4D3E", 
            "secondary": "#D4AF37",
            "accent": "#F2E8C9",
            "background": "#FFFFFF",
            "text": "#333333",
            "muted": "#F9F9F9"
        },
        "fonts": {
            "heading": "Playfair Display",
            "body": "Plus Jakarta Sans"
        },
        "layout": {
            "border_radius": "rounded-none",
            "spacing": "spacious"
        }
    }'
WHERE slug = 'royal-gold';

-- 2. RESET Page Content (Home & Profil) - Clean Slate for Redesign
DELETE FROM public.page_sections 
WHERE page_id IN (SELECT id FROM public.pages WHERE slug IN ('home', 'profil'));

DELETE FROM public.sections 
WHERE key LIKE 'home-%' OR key LIKE 'profil-%';

-- 3. Create NEW Sections (Al Hikmah Style)

-- HOME: Hero (Grand, Slider style capability placeholder)
INSERT INTO public.sections (key, type, title, content) VALUES
('home-hero', 'hero', 'Hero Beranda', '{
    "headline": "Mendidik Pemimpin Masa Depan",
    "subheadline": "Membentuk generasi yang cerdas, berakhlak mulia, dan berwawasan global berlandaskan nilai-nilai Islam.",
    "primary_button": {"text": "Pendaftaran", "url": "/psb"},
    "secondary_button": {"text": "Tentang Kami", "url": "/profil"},
    "bg_style": "slider_placeholder"
}');

-- HOME: Education Units (Jenjang Pendidikan - Grid)
INSERT INTO public.sections (key, type, title, content) VALUES
('home-education', 'education-grid', 'Jenjang Pendidikan', '{
    "headline": "Program Pendidikan",
    "subheadline": "Sinergi kurikulum nasional dan nilai-nilai pesantren.",
    "items": [
        {"title": "KB-TK", "desc": "Pondasi karakter sejak dini.", "icon": "baby", "url": "/pendidikan/tk"},
        {"title": "SD", "desc": "Membangun adab dan ilmu.", "icon": "book", "url": "/pendidikan/sd"},
        {"title": "SMP", "desc": "Pengembangan potensi diri.", "icon": "users", "url": "/pendidikan/smp"},
        {"title": "SMA", "desc": "Persiapan pemimpin umat.", "icon": "graduation-cap", "url": "/pendidikan/sma"}
    ]
}');

-- HOME: Philanthropy (Wakaf/Infaq focus)
INSERT INTO public.sections (key, type, title, content) VALUES
('home-philanthropy', 'philanthropy', 'Ayo Berinfaq', '{
    "headline": "Jejak Kebaikan Abadi",
    "subheadline": "Mari berkontribusi dalam pembangunan peradaban melalui wakaf dan infaq pendidikan.",
    "stats": [
        {"label": "Penerima Manfaat", "value": "1500+"},
        {"label": "Total Wakaf", "value": "IDR 5M+"}
    ],
    "cta_text": "Salurkan Donasi",
    "cta_url": "/donasi"
}');

-- HOME: News (Latest Articles)
INSERT INTO public.sections (key, type, title, content) VALUES
('home-news', 'latest-articles', 'Berita Terkini', '{
    "headline": "Kabar Pesantren",
    "limit": 3
}');

-- PROFIL: Page Header (Distinct from Home Hero)
INSERT INTO public.sections (key, type, title, content) VALUES
('profil-header', 'page-header', 'Header Profil', '{
    "title": "Profil Pesantren",
    "breadcrumbs": true,
    "background_image": "https://images.unsplash.com/photo-1542385263-8d0cd3879aa8?q=80&w=2070"
}');

-- PROFIL: Content sections
INSERT INTO public.sections (key, type, title, content) VALUES
('profil-history', 'text-block', 'Sejarah Singkat', '{
    "content": "<h2>Sejarah Kami</h2><p>Didirikan pada tahun 1990, bermula dari semangat untuk memadukan pendidikan umum berkualitas tinggi dengan pendidikan agama yang mendalam...</p>",
    "style": "image_left"
}'),
('profil-vision', 'vision-mission', 'Visi Misi', '{
    "vision": "Menjadi lembaga pendidikan Islam terdepan dalam mencetak kader pemimpin bangsa.",
    "mission": [
        "Menyelenggarakan pendidikan berkualitas.",
        "Menanamkan nilai-nilai tauhid.",
        "Mengembangkan potensi kepemimpinan."
    ]
}');

-- 4. LINK Sections to Pages

-- Home Page Links
INSERT INTO public.page_sections (page_id, section_id, order_index)
SELECT (SELECT id FROM public.pages WHERE slug = 'home'), id, order_val
FROM (
    VALUES 
        ('home-hero', 10),
        ('home-education', 20),
        ('home-philanthropy', 30),
        ('home-news', 40)
) AS v(k, order_val)
JOIN public.sections s ON s.key = v.k;

-- Profil Page Links
INSERT INTO public.page_sections (page_id, section_id, order_index)
SELECT (SELECT id FROM public.pages WHERE slug = 'profil'), id, order_val
FROM (
    VALUES 
        ('profil-header', 10),
        ('profil-history', 20),
        ('profil-vision', 30)
) AS v(k, order_val)
JOIN public.sections s ON s.key = v.k;
