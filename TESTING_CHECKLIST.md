# Testing Checklist - Website Management System

## ✅ Checklist untuk User

### 1. Verifikasi Development Server
- [ ] Server berjalan di http://localhost:5173 (atau port lain)
- [ ] Tidak ada error di console
- [ ] Page load tanpa masalah

### 2. Test Login & Navigation
- [ ] Login dengan akun superadmin
- [ ] Sidebar muncul dengan menu "Manajemen Website"
- [ ] Expand menu "Manajemen Website" untuk lihat submenu:
  - [ ] Pengaturan Website
  - [ ] Halaman Statis
  - [ ] Visual Page Builder
  - [ ] Theme Customizer

### 3. Test Pengaturan Website (`/dashboard/website/settings`)
- [ ] Page load tanpa error
- [ ] Upload logo utama - lihat preview
- [ ] Upload favicon
- [ ] Isi site title, tagline, description
- [ ] Isi kontak: WhatsApp (format: 628XX), Email, Phone, Address
- [ ] Tambah social media links (2-3 link)
- [ ] Simpan - lihat toast "berhasil disimpan"
- [ ] **CRITICAL**: Buka website publik (`/`) dan verifikasi:
  - [ ] Logo muncul di header
  - [ ] Title & tagline muncul
  - [ ] Footer text muncul

### 4. Test Halaman Statis (`/dashboard/website/pages`)
- [ ] Page load dengan list halaman
- [ ] Search halaman
- [ ] Toggle publish/unpublish - lihat badge berubah langsung
- [ ] Preview halaman (`/slug?preview=true`)
- [ ] Klik "Tambah Halaman"

### 5. Test Page Editor (`/dashboard/website/pages/new`)
- [ ] Ketik judul "Test Page"
- [ ] Klik "Generate" slug - slug auto-terisi
- [ ] Slug validator shows ✓ (available)
- [ ] Ubah slug manual - validator realtime check
- [ ] Tulis konten di Rich TextEditor
- [ ] Upload hero image
- [ ] Klik tab "Preview" - lihat tampilan
- [ ] Toggle "Publikasikan halaman"
- [ ] Toggle "Tampilkan di Menu Navigasi"
- [ ] **Autosave Test**: Tunggu 30 detik, lihat indikator "Autosaved HH:MM:SS"
- [ ] Refresh page - dialog "Draft Tersimpan" muncul
- [ ] Pilih "Lanjut Draft" - form terisi dari draft
- [ ] Simpan halaman
- [ ] **Unsaved Changes Test**: Edit form lalu coba close tab - warning muncul

### 6. Test Visual Page Builder (`/dashboard/website/builder`)
- [ ] Page load dengan list sections
- [ ] Filter by page (dropdown)
- [ ] Search section
- [ ] **Drag & Drop**: Drag section ke posisi lain - urutan berubah
- [ ] Toggle visibility (icon mata) - optimistic UI
- [ ] Duplicate section - section baru muncul
- [ ] Delete section (dengan confirm dialog)

### 7. Test Section Editor (`/dashboard/website/builder/[id]/edit`)
- [ ] Buka edit untuk section type "hero"
  - [ ] Form shows: Title, Subtitle, Background Image, Button fields
  - [ ] Edit semua field
  - [ ] Simpan - redirect ke builder
- [ ] Test section type lain (features, cta, stats)

### 8. Test Theme Customizer (`/dashboard/website/theme`)
- [ ] Page load
- [ ] **Color Test**:
  - [ ] Ubah Primary Color - live preview update
  - [ ] Klik preset color - auto-fill
  - [ ] Ubah semua warna (primary, secondary, accent)
- [ ] **Typography Test**:
  - [ ] Ubah Heading Font - preview update
  - [ ] Ubah Body Font - preview update
- [ ] **Border Radius Test**:
  - [ ] Slide slider - preview rounded corners berubah
- [ ] **CSS Variables**:
  - [ ] Lihat panel CSS Variables - values update
- [ ] Simpan Tema
- [ ] **CRITICAL**: Buka website publik - verifikasi:
  - [ ] Warna website berubah sesuai theme
  - [ ] Font berubah
  - [ ] Border radius apply

### 9. Integration Test (End-to-End)
- [ ] **Flow lengkap**:
  1. Set theme (emerald + gold)
  2. Upload logo di settings
  3. Buat halaman baru "Tentang Kami"
  4. Publish halaman
  5. Toggle "Tampilkan di Menu Navigasi"
  6. Edit section di builder
  7. Buka website publik
- [ ] **Verifikasi**:
  - [ ] Halaman "Tentang Kami" muncul di nav menu
  - [ ] Halaman dapat diakses `/tentang-kami`
  - [ ] Hero image muncul
  - [ ] Content terbaca
  - [ ] Theme colors terapp lik
  - [ ] Logo muncul di header

### 10. Performance & Error Handling
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Fast page loads (< 2s)
- [ ] Smooth drag & drop
- [ ] API calls succeed
- [ ] Toast notifications work

## 🐛 Jika Ada Error

### Error: "Module not found"
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities slugify
```

### Error: "Cannot find module '@/components/ui/slider'"
File sudah ada, pastikan import benar

### Error: Database/Supabase
- Cek migrations sudah jalan
- Verifikasi RLS policies
- Cek Supabase connection di .env

### Error: "getTheme is not a function"
- Pastikan Server Actions di-export dengan 'use server'
- Restart dev server

## 📝 Notes

- Semua fitur menggunakan Server Actions (Next.js 14+)
- Real-time updates dengan revalidatePath
- Optimistic UI untuk UX yang smooth
- Autosave setiap 30 detik
- Drag & drop menggunakan @dnd-kit
- Form validation dengan react-hook-form + zod

---

**Status Implementasi**: ✅ 100% Complete

Jika semua checklist ✓, system siap production!
