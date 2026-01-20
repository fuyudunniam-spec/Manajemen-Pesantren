-- Migration: Create page_contents table for dynamic page content management
-- Run this in your Supabase SQL Editor

-- Create page_contents table
CREATE TABLE IF NOT EXISTS public.page_contents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_key TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    meta_description TEXT,
    hero_title TEXT,
    hero_subtitle TEXT,
    hero_image TEXT,
    content JSONB DEFAULT '{}',
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.page_contents ENABLE ROW LEVEL SECURITY;

-- Allow public read for published content
CREATE POLICY "Allow public read for published page contents"
    ON public.page_contents
    FOR SELECT
    USING (is_published = true);

-- Allow authenticated users full access
CREATE POLICY "Allow authenticated users full access to page contents"
    ON public.page_contents
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Insert default content for standard pages
INSERT INTO public.page_contents (page_key, title, content, is_published) VALUES
('kontak', 'Halaman Kontak', '{
    "hero_title": "Hubungi Kami",
    "hero_subtitle": "Silakan hubungi kami untuk informasi lebih lanjut mengenai pendaftaran, donasi, atau program pesantren.",
    "contact_info": {
        "title": "Informasi Kontak",
        "address": "Jl. Raya Pesantren No. 99, Kecamatan Klojen, Kota Malang, Jawa Timur",
        "phone": "(0341) 123-4567",
        "whatsapp": "0812-3456-7890",
        "email": "info@albisri.com",
        "operational_hours": "Senin - Jumat: 08:00 - 16:00, Sabtu: 08:00 - 12:00"
    },
    "map_embed": "",
    "form_enabled": true,
    "social_links": []
}', true),
('psb', 'Penerimaan Santri Baru', '{
    "hero_title": "Bergabung Menjadi Keluarga Albisri",
    "hero_subtitle": "Mewujudkan generasi Qurani yang cerdas secara intelektual, spiritual, dan emosional.",
    "registration_info": {
        "current_wave": "Gelombang 1",
        "quota_filled": 75,
        "period": "Januari - Maret 2024"
    },
    "requirements": [
        "Mengisi formulir pendaftaran",
        "Pas foto 3x4 (4 lembar)",
        "Fotokopi Akta Kelahiran & KK",
        "Fotokopi Rapor 2 semester terakhir",
        "Surat Keterangan Sehat dari Dokter"
    ],
    "registration_steps": [
        {"title": "Daftar Online", "description": "Isi formulir pendaftaran melalui website"},
        {"title": "Tes Seleksi", "description": "Ikuti tes akademik dan baca Al-Quran"},
        {"title": "Wawancara", "description": "Wawancara calon santri dan wali"},
        {"title": "Daftar Ulang", "description": "Lengkapi berkas dan administrasi"}
    ],
    "brochure_url": "",
    "cta_button": {"text": "Daftar Sekarang", "link": "/psb/daftar"}
}', true),
('donasi', 'Halaman Donasi', '{
    "hero_title": "Salurkan Donasi Terbaik",
    "hero_subtitle": "Harta yang kita sedekahkan tidak akan berkurang, melainkan akan terus bertambah keberkahannya.",
    "bank_accounts": [
        {"bank_name": "Bank Syariah Indonesia (BSI)", "account_number": "7123 456 7890", "account_holder": "Yayasan Pesantren Albisri"},
        {"bank_name": "Bank Mandiri", "account_number": "123 00 9876543 2", "account_holder": "Yayasan Pesantren Albisri"}
    ],
    "qris": {"image": "", "nmid": "ID1234567890"},
    "whatsapp_confirmation": "+628123456789"
}', true),
('galeri', 'Halaman Galeri', '{
    "hero_title": "Galeri Kami",
    "hero_subtitle": "Dokumentasi kegiatan dan fasilitas di Pesantren Albisri.",
    "categories": ["Kegiatan", "Fasilitas", "Santri", "Acara"],
    "gallery_source": "auto"
}', true),
('dukungan', 'Halaman Dukungan', '{
    "hero_title": "Mari Bergandeng Tangan",
    "hero_subtitle": "Selain donasi materi, Anda dapat berkontribusi melalui tenaga, pikiran, atau jaringan untuk kemajuan pendidikan anak yatim.",
    "support_options": [
        {"title": "Relawan Pengajar", "description": "Bagikan ilmu dan keahlian Anda kepada santri. Kami terbuka untuk kelas inspirasi, pelatihan skill, atau bimbingan belajar.", "icon": "heart"},
        {"title": "Mitra Strategis", "description": "Untuk perusahaan atau instansi yang ingin berkolaborasi dalam program CSR atau pengembangan fasilitas pondok.", "icon": "users"},
        {"title": "Duta Kebaikan", "description": "Bantu kami menyebarkan informasi program Albisri di media sosial atau lingkungan sekitar Anda.", "icon": "share"}
    ],
    "contact_email": "info@albisri.com",
    "contact_whatsapp": "+628123456789"
}', true)
ON CONFLICT (page_key) DO NOTHING;

-- Comment for documentation
COMMENT ON TABLE public.page_contents IS 'Stores editable content for specific pages like Contact, PSB, Donation, Gallery, and Support';
