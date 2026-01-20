# 📋 Database Design Rules & Best Practices

**Project:** Manajemen Pesantren  
**Last Updated:** 2026-01-14 (Updated: Page Builder Priority)  
**Purpose:** Mengelola transisi dari sistem hardcoded ke Page Builder yang fleksibel.

---

## 🚀 ARAH PENGEMBANGAN (VISION)

Kita sedang bergerak dari **Sistem Legacy (Hardcoded)** ke **Sistem Modern (Page Builder)**. 

### 🟢 Sistem Modern (UTAMAKAN INI):
- **Tabel:** `pages`, `sections`, `page_sections`.
- **Logic:** Halaman dibentuk secara dinamis dari section-section yang bisa diatur urutannya dan diedit kontennya via dashboard.
- **Goal:** Tidak ada lagi hardcoded view untuk halaman statis.

### 🟡 Sistem Legacy (HINDARI PENAMBAHAN):
- **Tabel:** `contact_info`, `social_media`, `cta_buttons`, dll.
- **Masalah:** Terlalu spesifik dan kaku.
- **Action:** Bertahap pindahkan data ini ke dalam tabel `sections` dengan type yang sesuai (misal type: 'contact').

---

## 🚫 ATURAN WAJIB (MUST FOLLOW)

### Rule 1: MODERN-FIRST APPROACH
**❌ DILARANG membuat tabel baru yang bersifat "properti tunggal" (seperti `contact_address`).**

**✅ SELALU gunakan sistem `sections`:**
Jika butuh fitur baru (misal: "Daftar Guru"), jangan buat tabel `guru_info`. Buatlah **section type** baru `'team'` atau `'list'` di tabel `sections`.

---

### Rule 2: NO NEW LEGACY TABLES
**❌ DILARANG menambah tabel kecil yang redundan.** 

Jika sebuah fungsi bisa ditangani oleh `sections` yang fleksibel, maka gunakan itu. Contoh: Jangan buat `hero_settings`, gunakan `sections` dengan `type: 'hero'`.

---

### Rule 2: CHECK CODE USAGE BEFORE MIGRATION
**❌ DILARANG apply migration tanpa update kode yang menggunakan tabel tersebut**

**Workflow yang BENAR:**
1. ✅ Buat migration file
2. ✅ Update semua action files (`src/lib/actions/*.ts`)
3. ✅ Update semua components yang menggunakan data
4. ✅ Testing di local
5. ✅ Apply migration ke database
6. ✅ Verify di production

**Workflow yang SALAH:**
1. ❌ Buat migration file
2. ❌ Apply ke database
3. ❌ Lupa update kode
4. ❌ Tabel baru tidak terpakai → WASTE!

---

### Rule 3: ONE SOURCE OF TRUTH
**❌ DILARANG memiliki 2+ sistem yang melakukan fungsi sama**

**Contoh Pelanggaran:**
```
❌ SALAH:
- navigation_items (sistem lama)
- website_menus (sistem baru)
→ Pilih SATU saja!

❌ SALAH:
- contact_info (tabel terpisah)
- website_settings (key-value)
→ Gunakan website_settings untuk semua settings!
```

**Prinsip:**
- Satu fungsi = Satu tabel
- Jika ada duplikasi, migrate data lalu drop tabel lama

---

### Rule 4: PREFER KEY-VALUE FOR SETTINGS
**✅ GUNAKAN key-value pattern untuk settings yang fleksibel**

**Pattern yang BENAR:**
```sql
-- ✅ BENAR: Fleksibel, mudah extend
CREATE TABLE website_settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TIMESTAMPTZ
);

-- Bisa menambah setting baru tanpa ALTER TABLE
INSERT INTO website_settings (key, value) 
VALUES ('new_setting', 'value');
```

**Pattern yang SALAH:**
```sql
-- ❌ SALAH: Rigid, perlu ALTER TABLE untuk setting baru
CREATE TABLE contact_info (
    id UUID PRIMARY KEY,
    address TEXT,
    phone TEXT,
    email TEXT
    -- Mau tambah whatsapp? Perlu ALTER TABLE!
);
```

**Kapan Gunakan Key-Value:**
- Website settings (colors, fonts, etc)
- Contact information
- Social media links
- Configuration values
- Feature flags

**Kapan TIDAK Gunakan Key-Value:**
- Structured data (blog posts, users, etc)
- Data dengan relasi kompleks
- Data yang perlu di-query dengan JOIN

---

### Rule 5: CONSOLIDATE SMALL TABLES
**✅ GABUNGKAN tabel kecil yang berhubungan**

**Kandidat untuk Digabung:**
```
❌ Sekarang (3 tabel terpisah):
- contact_info (3 rows)
- social_media (4 rows)
- cta_buttons (2 rows)

✅ Seharusnya (1 tabel):
- website_settings (dengan key-value pattern)
  → contact_address
  → contact_phone
  → contact_email
  → social_facebook
  → social_instagram
  → cta_primary_text
  → cta_primary_url
```

**Benefit:**
- Lebih mudah manage
- Lebih fleksibel
- Kurang kompleks
- Lebih cepat query

---

### Rule 6: VERIFY BEFORE DROP
**❌ DILARANG drop tabel tanpa verifikasi**

**Checklist Sebelum DROP TABLE:**
- [ ] Grep codebase: `from("table_name")`
- [ ] Check semua action files di `src/lib/actions/`
- [ ] Check semua hooks di `src/hooks/`
- [ ] Check semua components
- [ ] Backup database
- [ ] Test di staging dulu

**Command untuk Verify:**
```bash
# Check apakah tabel digunakan di kode
rg 'from\("table_name"\)' src/
```

---

### Rule 7: DOCUMENT SCHEMA CHANGES
**✅ WAJIB dokumentasi setiap perubahan schema**

**Format Documentation:**
```sql
-- ============================================================================
-- Migration: [Nama Migration]
-- Date: [YYYY-MM-DD]
-- Purpose: [Tujuan migration]
-- Impact: [Tabel apa yang berubah]
-- Breaking Changes: [Yes/No - jelaskan]
-- Code Changes Required: [File apa yang perlu diupdate]
-- ============================================================================
```

---

## ✅ BEST PRACTICES

### 1. Naming Conventions

**Tables:**
```sql
-- ✅ BENAR: Plural, lowercase, underscore
blog_posts
user_permissions
website_settings

-- ❌ SALAH: Singular, CamelCase
BlogPost
userPermission
```

**Columns:**
```sql
-- ✅ BENAR: Lowercase, underscore
created_at
user_id
is_active

-- ❌ SALAH: CamelCase
createdAt
userId
```

---

### 2. Always Use Timestamps

```sql
-- ✅ WAJIB ada di setiap tabel
created_at TIMESTAMPTZ DEFAULT NOW()
updated_at TIMESTAMPTZ DEFAULT NOW()

-- ✅ Optional untuk soft delete
deleted_at TIMESTAMPTZ
```

---

### 3. Use UUIDs for Primary Keys

```sql
-- ✅ BENAR: UUID untuk distributed system
id UUID PRIMARY KEY DEFAULT gen_random_uuid()

-- ❌ SALAH: Serial integer (tidak scalable)
id SERIAL PRIMARY KEY
```

---

### 4. Add Indexes for Performance

```sql
-- ✅ Index untuk kolom yang sering di-query
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published) 
    WHERE is_published = TRUE;

-- ✅ Index untuk foreign keys
CREATE INDEX idx_blog_posts_author_id ON blog_posts(author_id);
```

---

### 5. Use RLS (Row Level Security)

```sql
-- ✅ Enable RLS untuk semua tabel
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- ✅ Policy untuk public read
CREATE POLICY "Public can read published posts"
    ON blog_posts FOR SELECT
    USING (is_published = TRUE);

-- ✅ Policy untuk authenticated write
CREATE POLICY "Authenticated can manage posts"
    ON blog_posts FOR ALL
    TO authenticated
    USING (TRUE)
    WITH CHECK (TRUE);
```

---

### 6. Use JSONB for Flexible Data

```sql
-- ✅ BENAR: JSONB untuk data yang struktur bisa berubah
CREATE TABLE sections (
    id UUID PRIMARY KEY,
    type TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '{}'
);

-- Bisa store berbagai struktur:
-- Hero: {"headline": "...", "image": "..."}
-- Features: {"items": [...]}
-- Contact: {"email": "...", "phone": "..."}
```

**Kapan Gunakan JSONB:**
- Content yang strukturnya bervariasi
- Settings/configuration
- Metadata
- Data yang jarang di-query dengan WHERE

**Kapan TIDAK Gunakan JSONB:**
- Data yang perlu di-index
- Data yang sering di-filter/sort
- Data dengan relasi ke tabel lain

---

## 🔍 REVIEW CHECKLIST

Sebelum merge migration, pastikan:

- [ ] **No Duplicate Tables** - Tidak ada tabel dengan fungsi serupa
- [ ] **Code Updated** - Semua action files sudah diupdate
- [ ] **Tests Pass** - Semua test masih hijau
- [ ] **Documentation** - Migration terdokumentasi dengan baik
- [ ] **Indexes Added** - Index untuk kolom yang sering di-query
- [ ] **RLS Enabled** - Row Level Security sudah diaktifkan
- [ ] **Backup Created** - Database sudah di-backup
- [ ] **Staging Tested** - Sudah test di staging environment

---

## 📊 CURRENT SCHEMA OVERVIEW

### Active Tables (In Use)

**Blog System:**
- `blog_posts` - Article content
- `blog_categories` - Post categories
- `authors` - Post authors

**Website Content:**
- `website_settings` - Site-wide settings (key-value)
- `navigation_items` - Main navigation menu
- `footer_sections` - Footer column headers
- `footer_links` - Links in footer
- `contact_info` - Contact information
- `social_media` - Social media links
- `cta_buttons` - Call-to-action buttons

**Auth & Permissions:**
- `profiles` - User profiles
- `roles` - User roles
- `permissions` - Available permissions
- `user_permissions` - User-permission mapping

**Infrastructure:**
- `media_library` - Uploaded media files
- `website_menus` - Alternative navigation (consider consolidating with navigation_items)
- `audit_log` - Change tracking (not yet implemented)

---

## 🎯 FUTURE IMPROVEMENTS

### Priority 1: Consolidate Settings Tables
**Goal:** Merge small tables into `website_settings`

**Action:**
```sql
-- Migrate contact_info → website_settings
-- Migrate social_media → website_settings
-- Keep one source of truth
```

**Benefit:**
- Simpler schema
- More flexible
- Easier to manage

---

### Priority 2: Implement Audit Logging
**Goal:** Track all changes to important tables

**Action:**
```sql
-- Create trigger for audit_log
-- Track INSERT, UPDATE, DELETE
-- Store old_data and new_data
```

**Benefit:**
- Better debugging
- Compliance
- Change history

---

### Priority 3: Optimize Indexes
**Goal:** Add indexes for frequently queried columns

**Action:**
```sql
-- Analyze slow queries
-- Add appropriate indexes
-- Monitor performance
```

---

## 🚨 RED FLAGS

Watch out for these warning signs:

1. **Multiple tables doing the same thing**
   - Example: `navigation_items` + `website_menus`
   - Action: Choose one, migrate data, drop the other

2. **Tables with 0 rows for > 1 week**
   - Example: `audit_log`, `media_library`
   - Action: Either implement the feature or drop the table

3. **Migration without code changes**
   - Example: V2 migration that created unused tables
   - Action: Always update code before applying migration

4. **Tables growing without indexes**
   - Example: Large table without index on frequently queried column
   - Action: Add indexes proactively

5. **JSONB columns being queried with WHERE**
   - Example: `WHERE content->>'email' = '...'`
   - Action: Consider extracting to proper column

---

# ✅ Database Restoration & Modernization Summary

**Date:** 2026-01-14  
**Status:** 🚀 **PAGE BUILDER RESTORED**

---

## 🎯 What Was Corrected

### 1. ✅ Core System Restored
- **Tabel Inti:** `pages`, `sections`, `page_sections`, `themes` telah dikembalikan.
- **Fungsi:** Mendukung pembangunan halaman fleksibel tanpa hardcoding.
- **Migration:** `supabase/migrations/20260114_restore_page_builder.sql`

### 2. ✅ Vision Alignment
Saya telah menyadari bahwa tabel-tabel ini adalah **investasi masa depan**, bukan redundansi. Sistem lama yang "hardcoded" sekarang dikategorikan sebagai **Legacy** yang akan dimigrasikan.

---

## 🤝 CONTRIBUTION GUIDELINES

Jika ingin menambah tabel baru:

1. **Diskusi dulu** - Apakah benar-benar perlu tabel baru?
2. **Check existing** - Apakah bisa pakai tabel yang ada?
3. **Design review** - Review schema dengan tim
4. **Document** - Tulis purpose dan impact
5. **Code first** - Update kode dulu sebelum migration
6. **Test** - Test di staging
7. **Apply** - Baru apply migration

---

**Remember: Database schema is the foundation of your app. Keep it clean, simple, and efficient!** 🚀
