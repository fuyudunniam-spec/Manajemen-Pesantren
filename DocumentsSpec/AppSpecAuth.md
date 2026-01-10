Spesifikasi lengkap di bawah ini menggabungkan dokumen awal Anda + penambahan workflow pembayaran & verifikasi bukti transfer dengan pola umum PSB pesantren dan praktik upload di aplikasi pendaftaran online.[1][2]

***

# Spesifikasi Teknis: Sistem Informasi Manajemen Pondok Pesantren (e-Maktab)

## 1. Visi & Tujuan

Membangun platform terintegrasi yang berfungsi sebagai **website publik** dan **sistem manajemen internal (e‑Maktab)** dalam satu aplikasi, dengan satu sumber data terpusat (single source of truth) untuk meningkatkan efisiensi operasional, transparansi, dan pelayanan pondok pesantren.[3]

## 2. Arsitektur Teknis

- **Frontend Framework:** Next.js 14+ dengan App Router.[4]
- **UI Components:** shadcn/ui + Tailwind CSS (komponen: Button, Input, Form, Table, Dialog, dsb.).[4]
- **Backend & Database:** Supabase (PostgreSQL, Authentication, Storage).[5]
- **Konsep Arsitektur:** **Satu Aplikasi, Dua Wajah** menggunakan Next.js Route Groups:

```txt
/app
  ├── (website)/  <-- Rute Publik (Website)
  │   ├── page.tsx
  │   └── psb/daftar/page.tsx
  │
  ├── (dashboard)/ <-- Rute Privat (e-Maktab)
  │   ├── layout.tsx  (Sidebar & Header)
  │   ├── page.tsx    (Dashboard Utama)
  │   └── master-data/santri/page.tsx
  │
  └── login/page.tsx
```

## 3. Strategi Pengembangan (Phased Approach)

### Fase 1: Fondasi Digital (MVP)

- **Fokus:** Website publik + modul inti PSB + master data santri + alur pembayaran manual dengan upload bukti.[2][1]
- **Durasi Estimasi:** 3–4 bulan.  
- **Output:**  
  - Website publik fungsional.  
  - PSB online (form pendaftaran, upload dokumen, upload bukti pembayaran).  
  - Dashboard admin untuk mengelola konten website, memproses pendaftar, dan memverifikasi pembayaran.  

### Fase 2: Operasional Inti

- **Fokus:** Modul Keuangan dan Akademik.  
- **Ketergantungan:** Modul Master Data Santri dari Fase 1 stabil.[6][7]

### Fase 3: Operasional Pendukung

- **Fokus:** Modul Inventaris dan Koperasi.  
- **Dasar:** praktik pengelolaan keuangan dan aset lembaga pendidikan/pesantren.[7][8]

***

## 4. Spesifikasi Detail Fase 1 (MVP)

### 4.1. Desain Database (Schema Supabase)

Tabel utama:

- **`profiles`** — User admin.  
  - `id` (uuid, pk)  
  - `full_name` (text)  
  - `email` (text)  
  - `role` (text) — contoh: `superadmin`, `admin_psb`, `admin_website`.[9]

- **`website_pages`** — CMS halaman statis.  
  - `id` (uuid, pk)  
  - `slug` (text, unik)  
  - `title` (text)  
  - `content` (text)  

- **`kategori_santri`** — Kategori pendaftaran (Reguler, Beasiswa, dll.).  
  - `id` (uuid, pk)  
  - `nama` (text)  
  - `kode` (text)  
  - `is_active` (boolean)  

- **`master_dokumen`** — Master jenis dokumen persyaratan.  
  - `id` (uuid, pk)  
  - `nama_dokumen` (text)  

- **`kategori_dokumen_pivot`** — Pivot kategori santri ↔ dokumen.  
  - `kategori_id` (uuid, fk → `kategori_santri`)  
  - `dokumen_id` (uuid, fk → `master_dokumen`)  

- **`psb_pendaftar`** — Data calon santri.  
  - `id` (uuid, pk)  
  - `kategori_id` (uuid, fk → `kategori_santri`)  
  - `nama_lengkap` (text)  
  - `data_pribadi` (jsonb)  
  - `status` (text) — contoh: `baru`, `diproses`, `diterima`, `ditolak`.[10]
  - **`status_pembayaran` (text)** — `belum_bayar`, `menunggu_verifikasi`, `lunas`, `gagal`.[2][3]

- **`psb_dokumen_upload`** — Dokumen persyaratan yang di‑upload.  
  - `id` (uuid, pk)  
  - `pendaftar_id` (uuid, fk → `psb_pendaftar`)  
  - `dokumen_id` (uuid, fk → `master_dokumen`)  
  - `file_path` (text) — path di Supabase Storage.[5]

- **`psb_pembayaran`** — Data pembayaran PSB (baru).  
  - `id` (uuid, pk)  
  - `pendaftar_id` (uuid, fk → `psb_pendaftar`)  
  - `jenis_pembayaran` (text) — misal `biaya_pendaftaran`, `biaya_masuk`.  
  - `nominal` (numeric)  
  - `metode` (text) — `transfer_bank`, `tunai`, `gateway`.  
  - `tanggal_bayar` (timestamp)  
  - `bukti_file_path` (text) — path bukti di Storage.  
  - `status_verifikasi` (text) — `menunggu`, `diterima`, `ditolak`.[11][1]
  - `catatan_admin` (text, nullable).  

- **`santri`** — Master data santri resmi.  
  - `id` (uuid, pk)  
  - `nis` (text, unik)  
  - `psb_pendaftar_id` (uuid, fk → `psb_pendaftar`)  
  - `status_santri` (text) — misal `aktif`, `nonaktif`, `lulus`.  

### 4.2. Spesifikasi Fitur per Modul

#### A. Website Publik `(website)`

1. **Halaman `/` (Homepage)**  
   - Header: navigasi Beranda, Profil, PSB, Kontak.  
   - Tombol **“Login e‑Maktab”** di pojok kanan menuju `/login`.  
   - Hero + informasi ringkas pondok.  

2. **Halaman `/profil`**  
   - Konten diambil dinamis dari `website_pages` dengan `slug = 'profil'`.  

3. **Halaman `/kontak`**  
   - Konten diambil dari `website_pages` dengan `slug = 'kontak'`.  

4. **Halaman `/psb/daftar`**  
   - **Langkah 1:** Pilih kategori pendaftaran (load dari `kategori_santri` yang `is_active = true`).[3][2]
   - **Langkah 2:** Form PSB dinamis:  
     - Field data pribadi (disimpan di `data_pribadi` jsonb).  
     - Field upload dokumen, dibangkitkan dari relasi `kategori_dokumen_pivot` → `master_dokumen`.  
   - **Submit:**  
     - Insert ke `psb_pendaftar` (status awal misal `baru`, `status_pembayaran = 'belum_bayar'`).  
     - Insert daftar file ke `psb_dokumen_upload`.  
     - Upload file ke Supabase Storage (bucket dokumen PSB).[5]
   - **Pasca submit:** tampilkan instruksi pembayaran (nomor rekening, nominal, batas waktu) dan link/arah ke halaman status pembayaran.[12][1]

5. **Halaman `/psb/status` atau `/psb/konfirmasi-pembayaran`**  
   - Tujuan: calon santri mengunggah **bukti pembayaran** dan melihat status pembayaran.  
   - Akses:  
     - Bisa: Nomor pendaftar + Tanggal lahir / Email, atau login ringan.  
   - Fitur:  
     - Menampilkan ringkasan pendaftar + `status_pembayaran`.  
     - Form konfirmasi: `nominal`, `metode`, upload bukti (jpg/png/pdf, size dibatasi).  
     - Logika submit:  
       - Upload file ke bucket `psb-payments`.  
       - Insert ke `psb_pembayaran` (status_verifikasi = `menunggu`).  
       - Update `psb_pendaftar.status_pembayaran = 'menunggu_verifikasi'`.[13][11]
     - Menampilkan informasi: “Menunggu verifikasi admin”, atau “Pembayaran diterima”, atau alasan penolakan jika ditolak.  

#### B. Dashboard Admin `(dashboard)`

- **Autentikasi:**  
  - `/login` menggunakan Supabase Auth (email/password, dsb.).[14][15]
  - Middleware melindungi seluruh route `(dashboard)`; jika tidak ada sesi → redirect ke `/login`.[15]

- **Layout Dashboard:**  
  - Sidebar + Header global.  
  - Menampilkan nama user dan role dari `profiles`.  

- **Halaman `/dashboard` (Utama)**  
  - Kartu statistik:  
    - Total Pendaftar (count `psb_pendaftar`).  
    - Total Santri Aktif (count `santri` dengan `status_santri = 'aktif'`).  
  - Link cepat:  
    - “Proses Pendaftar PSB”.  
    - “Tambah Halaman Website”.  

- **Modul Manajemen Website `/dashboard/website-management`**  
  - **Halaman Statis:**  
    - Tabel daftar halaman (slug, title).  
    - CRUD: tambah/edit/hapus `title` dan `content` untuk halaman profil, kontak, dsb.  

- **Modul PSB `/dashboard/psb`**

  1. **`/dashboard/psb/pendaftar`**  
     - Tabel pendaftar: nama, kategori, status PSB, **status pembayaran**.  
     - Filter:  
       - Berdasarkan `status` (baru, diproses, diterima, ditolak).  
       - Berdasarkan `status_pembayaran` (belum_bayar, menunggu_verifikasi, lunas, gagal).  

  2. **`/dashboard/psb/pendaftar/[id]`**  
     - Detail data pribadi (dari `data_pribadi`).  
     - Daftar dokumen yang diupload (link Storage).  
     - Ringkasan status:  
       - Status PSB.  
       - Status pembayaran (badge).  
       - Riwayat pembayaran dari `psb_pembayaran` (jika ada).  
     - Checklist dokumen lengkap/tidak.  
     - Aksi:  
       - **Terima:**  
         - Hanya aktif jika `status_pembayaran = 'lunas'`.  
         - Saat diklik: buka modal input NIS → insert ke `santri`, update `psb_pendaftar.status = 'diterima'`.  
       - **Tolak:**  
         - Set `psb_pendaftar.status = 'ditolak'` dan opsional simpan alasan penolakan.  

  3. **`/dashboard/psb/kategori`**  
     - Manajemen kategori santri dan persyaratan dokumen.  
     - CRUD `kategori_santri`.  
     - Atur mapping kategori ↔ master dokumen (`kategori_dokumen_pivot`).  

  4. **Modul Pembayaran PSB (baru)**  

     - **`/dashboard/psb/pembayaran`**  
       - Tabel: No pendaftar, Nama, Jenis Pembayaran, Nominal, Metode, Tanggal, Status Verifikasi.  
       - Filter: status_verifikasi (`menunggu`, `diterima`, `ditolak`).  
       - Aksi cepat: buka detail.  

     - **`/dashboard/psb/pembayaran/[id]`**  
       - Menampilkan data pendaftar singkat + rincian pembayaran.  
       - Preview bukti pembayaran (gambar) atau link unduh (pdf).  
       - Aksi:  
         - **Terima Pembayaran:**  
           - Set `psb_pembayaran.status_verifikasi = 'diterima'`.  
           - Update `psb_pendaftar.status_pembayaran = 'lunas'`.  
         - **Tolak Pembayaran:**  
           - Set `status_verifikasi = 'ditolak'`, wajib isi `catatan_admin`.  
           - Opsional: `psb_pendaftar.status_pembayaran = 'gagal'`.[1][11]

- **Modul Master Data `/dashboard/master-data`**

  - **`/dashboard/master-data/santri`**  
    - Tabel santri: NIS, nama, status_santri.  
    - Data dibuat saat admin “Terima” pendaftar:  
      - Insert ke `santri` dengan NIS yang diinput.  
      - Link ke `psb_pendaftar_id`.  

- **Sidebar Navigasi Admin**

```txt
🏠 Dashboard
---
📝 Manajemen Website          <-- [AKTIF]
│   └── Halaman Statis
---
📋 Pendaftaran (PSB)          <-- [AKTIF]
│   ├── Data Pendaftar
│   ├── Pembayaran            <-- [AKTIF]
│   └── Kategori & Persyaratan
---
👥 Master Data                <-- [AKTIF]
│   └── Santri
---
💰 Keuangan                   <-- [COMING SOON]
📚 Akademik                   <-- [COMING SOON]
📦 Inventaris                 <-- [COMING SOON]
🛒 Koperasi                   <-- [COMING SOON]
---
⚙️ Pengaturan
    └── Profil Saya
```

- `[AKTIF]`: normal, bisa diklik, memiliki sub-menu.  
- `[COMING SOON]`: abu‑abu (opacity 0.6), tidak dapat diklik, ada tooltip “Fitur ini sedang dalam tahap pengembangan.”.[16][17]

### 4.3. Spesifikasi UI/UX

- **Navigasi Publik:** header bersih, logo kiri, menu tengah, tombol login kanan.[12]
- **Navigasi Admin:** sidebar konsisten, ikon + label, status modul jelas.  
- Tampilan tabel: gunakan komponen Table shadcn/ui, pagination, search sederhana.  

***

## 5. Teknis Implementasi & Best Practices

- **Type Safety:**  
  - Wajib gunakan `supabase gen types typescript` untuk generate tipe dari database.  
  - Simpan di `lib/supabase/types.ts` dan pakai di seluruh query.  

- **Form Handling:**  
  - React Hook Form + Zod untuk validasi client & server, terutama:  
    - Form PSB.  
    - Form upload dokumen.  
    - Form konfirmasi pembayaran.[11]

- **File Upload:**  
  - Dokumen PSB dan bukti pembayaran di bucket berbeda.  
  - Simpan hanya path file di database, bukan file binary.[5]
  - Batasi tipe file & ukuran, dan gunakan nama file unik.  

- **Storage & Keamanan:**  
  - Atur RLS dan bucket policy, bukti pembayaran umumnya hanya dapat diakses admin.  
  - Untuk preview di dashboard, gunakan signed URL dengan masa berlaku terbatas.[18][5]

- **Environment Variables:**  
  - Kelola kunci Supabase dan variabel lain di `.env.local`, jangan commit ke repo.  

***

## 6. Checklist Selesai Fase 1

Fase 1 dinyatakan selesai jika:

- [ ] Website publik (Homepage, Profil, Kontak) online dan bisa diakses.  
- [ ] Form PSB online berfungsi (pilih kategori, upload dokumen persyaratan).  
- [ ] Admin bisa login ke dashboard.  
- [ ] Admin bisa mengubah konten halaman Profil dan Kontak dari dashboard.  
- [ ] Admin bisa melihat, menerima, dan menolak calon santri.  
- [ ] Proses “Terima” memindahkan data dari `psb_pendaftar` ke `santri`.  
- [ ] Sidebar dashboard menampilkan semua modul dengan status AKTIF/COMING SOON.  
- [ ] **Alur pembayaran berfungsi:**  
  - Calon santri bisa upload bukti pembayaran.  
  - Admin bisa memverifikasi/tolak pembayaran.  
  - Status pembayaran di pendaftar ter‑update dan mengunci/ membuka tombol “Terima”.[1][3]
- [ ] Aplikasi sudah di‑deploy dan bisa diakses publik (website) dan privat (dashboard).  

