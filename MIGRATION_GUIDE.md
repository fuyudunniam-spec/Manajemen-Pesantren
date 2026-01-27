# Migrasi Landing Page: Filantropi → Academy

## Status Saat Ini

Landing page saat ini (`index.astro`) sudah menggunakan **Academy theme** (Royal Green) dengan konten statis. Namun, masih ada beberapa halaman lama yang fokus ke filantropi yang perlu dibersihkan.

## Halaman yang Perlu Dihapus/Diganti

### ❌ Halaman Lama (Filantropi Focus):
Halaman-halaman berikut masih menggunakan tema filantropi lama dan perlu dihapus atau diganti:

1. `/tentang-kami.astro` - Tentang Yayasan (filantropi)
2. `/transparansi.astro` - Laporan keuangan yayasan
3. `/psb.astro` - Penerimaan Santri Baru (pesantren)
4. `/donasi.astro` - Halaman donasi (jika ada)

### ✅ Halaman Baru (Academy Focus):
Halaman-halaman ini sudah sesuai dengan tema Academy:

1. `/` (index.astro) - Landing page Academy ✅
2. `/courses/` - Katalog kursus ✅
3. `/courses/[slug].astro` - Detail kursus ✅
4. `/courses/[slug]/lessons/[lessonSlug].astro` - Lesson player ✅

## Action Items

### 1. Hapus Halaman Lama

```bash
# Hapus halaman filantropi yang tidak relevan untuk Academy
rm landing-page/src/pages/tentang-kami.astro
rm landing-page/src/pages/transparansi.astro
rm landing-page/src/pages/psb.astro
rm landing-page/src/pages/donasi.astro  # jika ada
```

### 2. Buat Halaman Academy Baru

Buat halaman-halaman baru yang sesuai dengan Academy:

**`/about-academy.astro`** - Tentang Isyraq Academy
- Visi & Misi Academy
- Metodologi pembelajaran
- Tim pengajar
- Profit-for-nonprofit model

**`/mentors.astro`** - Daftar semua pengajar
- Grid semua instructor
- Filter by expertise
- Detail bio

**`/hubungi-kami.astro`** - Kontak & Support
- Form konsultasi
- FAQ
- Live chat support

### 3. Update Navigation

File: `landing-page/src/layouts/AcademyLayout.astro`

Pastikan navigation links sudah benar:
```astro
<a href="/">Beranda</a>
<a href="/courses">Katalog Kursus</a>
<a href="/mentors">Pengajar</a>
<a href="/about-academy">Tentang Kami</a>
```

### 4. Update CTA Links

Pastikan semua CTA button di `index.astro` mengarah ke:
- Primary CTA: `/courses` ✅
- Secondary CTA: `/about-academy` ✅
- Instructor CTA: `/mentors` ✅

## Verifikasi

Setelah cleanup:

1. **Test Routing**:
   ```bash
   npm run dev
   ```
   - Buka `http://localhost:4321/`
   - Klik semua navigation links
   - Pastikan tidak ada 404

2. **Test Sanity Integration**:
   - Buka Sanity Studio: `http://localhost:3333`
   - Edit Landing Page content
   - Refresh landing page
   - Verify changes appear

3. **Check for Dead Links**:
   - Search codebase untuk `/tentang-kami`, `/transparansi`, `/psb`
   - Replace dengan `/about-academy`, `/mentors`, dll

## Notes

- **Filantropi content** (donasi, transparansi) akan dipindahkan ke website terpisah untuk Yayasan Isyraq Annur
- **Academy** fokus 100% pada pendidikan online dan kursus
- **Profit-for-nonprofit model** dijelaskan di halaman About Academy
