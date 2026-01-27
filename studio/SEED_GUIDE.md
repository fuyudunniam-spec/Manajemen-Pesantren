# Seed Academy Data ke Sanity Studio

## Cara Manual (Recommended)

Karena seeding via script memerlukan token autentikasi, cara termudah adalah dengan membuat data langsung di Sanity Studio:

### 1. Buka Sanity Studio
```
http://localhost:3333
```

### 2. Buat Categories

Buka menu **Category** dan buat 3 kategori berikut:

**Category 1: Tafsir**
- Title: `Tafsir`
- Slug: `tafsir`
- Description: `Ilmu penafsiran Al-Quran`
- Icon: `book-open`

**Category 2: Bahasa Arab**
- Title: `Bahasa Arab`
- Slug: `bahasa-arab`
- Description: `Pembelajaran bahasa Arab klasik dan modern`
- Icon: `languages`

**Category 3: Fiqih**
- Title: `Fiqih`
- Slug: `fiqih`
- Description: `Hukum Islam dan penerapannya`
- Icon: `scale`

---

### 3. Buat Instructors

Buka menu **Instructor** dan buat 3 instructor berikut:

**Instructor 1:**
- Name: `KH. Ahmad Bisri`
- Bio: `Pakar Tafsir & Hadis dengan pengalaman mengajar lebih dari 20 tahun di berbagai pesantren.`
- Expertises: `Tafsir`, `Hadis`, `Ulum Al-Quran`

**Instructor 2:**
- Name: `Ustadz Fulan Al-Azhari`
- Bio: `Lulusan Al-Azhar University dengan spesialisasi dalam Sejarah Peradaban Islam dan Bahasa Arab.`
- Expertises: `Sejarah Islam`, `Bahasa Arab`, `Peradaban`

**Instructor 3:**
- Name: `Dr. Aminah`
- Bio: `Dosen Bahasa Arab dengan fokus pada metodologi pengajaran bahasa Arab modern.`
- Expertises: `Bahasa Arab`, `Nahwu`, `Sharaf`

---

### 4. Buat Courses

Buka menu **Course** dan buat 3 course berikut:

**Course 1: Tafsir Al-Azhar**
- Title: `Tafsir Al-Azhar: Pendekatan Modern`
- Slug: `tafsir-al-azhar-modern`
- Tagline: `Memahami Al-Quran dengan pendekatan kontemporer`
- Price: `150000`
- Discount Price: `99000`
- Category: **Tafsir** (pilih dari reference)
- Instructor: **KH. Ahmad Bisri** (pilih dari reference)
- Benefits:
  - `Memahami metodologi tafsir modern`
  - `Kontekstualisasi ayat dengan zaman`
  - `Sertifikat resmi`

**Course 2: Bahasa Arab Klasik**
- Title: `Bahasa Arab Klasik: Nahwu Wadhih`
- Slug: `bahasa-arab-klasik-nahwu`
- Tagline: `Menguasai tata bahasa Arab dari dasar`
- Price: `125000`
- Category: **Bahasa Arab**
- Instructor: **Ustadz Fulan Al-Azhari**
- Benefits:
  - `Belajar dari kitab klasik`
  - `Latihan intensif`
  - `Akses selamanya`

**Course 3: Fiqih Muamalah**
- Title: `Fiqih Muamalah: Ekonomi Syariah`
- Slug: `fiqih-muamalah-ekonomi`
- Tagline: `Memahami transaksi ekonomi dalam Islam`
- Price: `200000`
- Discount Price: `149000`
- Category: **Fiqih**
- Instructor: **Dr. Aminah**
- Benefits:
  - `Aplikasi fiqih dalam bisnis`
  - `Studi kasus nyata`
  - `Konsultasi langsung`

---

### 5. Buat/Update Landing Page

Buka menu **Landing Page** (singleton document):

#### Hero Section:
- Title: `Membangun Peradaban dengan Ilmu`
- Subtitle: `Isyraq Annur Academy`
- Description: `Pusat studi Islam bersanad yang memadukan kedalaman tradisi turats klasik dengan wawasan kontemporer untuk menjawab tantangan zaman.`
- CTA Primary:
  - Text: `Lihat Katalog Kelas`
  - Link: `/courses`
- CTA Secondary:
  - Text: `Tentang Kami`
  - Link: `/about-academy`

#### Stats (Array):
1. Label: `Siswa Terdaftar`, Value: `1,250+`
2. Label: `Materi Video`, Value: `450+`
3. Label: `Pengajar Ahli`, Value: `12+`
4. Label: `Kepuasan Siswa`, Value: `98%`

#### Featured Courses:
- Title: `Kurikulum Unggulan`
- Subtitle: `Program Terpilih`
- Courses (References):
  - Tafsir Al-Azhar: Pendekatan Modern
  - Bahasa Arab Klasik: Nahwu Wadhih
  - Fiqih Muamalah: Ekonomi Syariah

#### Why Us (Array):
1. Title: `Sanad Terhubung`
   - Description: `Kurikulum kami disusun berdasarkan tradisi keilmuan Islam yang memiliki silsilah (sanad) hingga ke sumbernya.`
   - Icon: `shield-check`

2. Title: `Kurikulum Terstruktur`
   - Description: `Pembelajaran dirancang secara akademis dari tingkat dasar hingga lanjutan secara bertahap.`
   - Icon: `book-open`

3. Title: `Fleksibilitas Belajar`
   - Description: `Akses materi video dan modul berkualitas kapan saja dan di mana saja sesuai kecepatan belajar Anda.`
   - Icon: `clock`

4. Title: `Profit for Non-Profit`
   - Description: `Seluruh keuntungan operasional akademi disalurkan kembali untuk dana beasiswa santri di Pesantren Al-Bisri.`
   - Icon: `heart`

#### Instructors (References):
- KH. Ahmad Bisri
- Ustadz Fulan Al-Azhari
- Dr. Aminah

#### SEO:
- Meta Title: `Isyraq Academy | Pusat Studi Islam & Peradaban`
- Meta Description: `Pusat studi Islam bersanad yang memadukan kedalaman tradisi turats klasik dengan wawasan kontemporer untuk menjawab tantangan zaman.`
- Keywords: `akademi islam`, `studi islam`, `pesantren online`, `belajar islam`, `kursus islam`

---

## Verifikasi

Setelah semua data diinput:

1. Buka landing page Astro: `http://localhost:4321/`
2. Pastikan semua konten muncul dari Sanity
3. Jika ada yang masih fallback ke mock data, periksa kembali nama field di Sanity Studio

---

## Upload Gambar (Opsional)

Untuk hasil yang lebih baik, upload gambar untuk:
- **Course Thumbnails**: Di setiap course document
- **Instructor Photos**: Di setiap instructor document

Gambar akan otomatis ter-optimize oleh Sanity CDN.
