# 📘 Panduan Menggunakan Sanity CMS dengan Astro

## ✅ Yang Sudah Selesai:

1. ✅ Sanity Studio berjalan di `http://localhost:3335`
2. ✅ Halaman Blog Astro dibuat di `/blog`
3. ✅ Koneksi Sanity ↔ Astro sudah terhubung

---

## 🎯 Cara Menampilkan Blog di Website:

### Langkah 1: Pastikan Blog Post Sudah PUBLISHED

Di Sanity Studio (`localhost:3335`):

1. Buka blog post yang sudah Anda buat
2. **PENTING**: Klik tombol **"Publish"** (bukan "Save as draft")
3. Pastikan ada tanggal di field **"Tanggal Publikasi"** (publishedAt)

### Langkah 2: Buka Halaman Blog di Astro

Sekarang buka browser dan kunjungi:

**http://localhost:4321/blog**

Anda akan melihat semua blog post yang sudah di-publish!

---

## 🔄 Alur Kerja (Workflow):

```
1. Buat/Edit Konten di Sanity Studio (localhost:3335)
   ↓
2. Klik "Publish" untuk mempublikasikan
   ↓
3. Refresh halaman Astro (localhost:4321/blog)
   ↓
4. Konten langsung muncul! ✨
```

---

## 📝 Tips Penting:

### Mengapa Konten Tidak Muncul?

Jika konten tidak muncul, cek:

1. ✅ Apakah blog post sudah di-**PUBLISH** (bukan draft)?
2. ✅ Apakah field **"Tanggal Publikasi"** sudah diisi?
3. ✅ Apakah **slug** sudah di-generate (klik tombol "Generate" di field Slug)?
4. ✅ Coba refresh halaman Astro dengan **Ctrl + Shift + R** (hard refresh)

### Cara Menambah Gambar:

1. Di Sanity Studio, klik field **"Gambar Utama"**
2. Upload gambar dari komputer Anda
3. Isi field **"Teks Alternatif"** untuk SEO
4. Publish!

### Cara Menambah Kategori:

1. Di Sanity Studio, buka menu **"Category"** di sidebar
2. Buat kategori baru (misal: "Berita", "Kegiatan", "Filantropi")
3. Kembali ke blog post Anda
4. Pilih kategori dari dropdown
5. Publish!

---

## 🎨 Kustomisasi Tampilan:

Jika Anda ingin mengubah tampilan blog:

- **Warna**: Edit file `landing-page/src/pages/blog/index.astro`
- **Layout**: Ubah grid di line yang ada class `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Font**: Sesuaikan dengan design system Al-Bisri (Playfair Display untuk heading)

---

## 🚀 Langkah Selanjutnya:

1. Coba buat 2-3 blog post lagi
2. Upload gambar untuk setiap post
3. Tambahkan kategori
4. Lihat hasilnya di `/blog`

**Selamat! Anda sekarang bisa mengelola konten website tanpa perlu coding!** 🎉
