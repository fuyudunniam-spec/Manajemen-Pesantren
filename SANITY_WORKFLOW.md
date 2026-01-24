# Workflow: Edit Content di Sanity Studio

## Cara Kerja Sekarang (Tanpa Presentation Tool)

### 1. Edit di Sanity Studio
1. Buka: http://localhost:3333/
2. Masuk ke "Content" → "Landing Page"
3. Edit field apapun (misal: Hero badge)
4. Klik **"Publish"**

### 2. Lihat Perubahan di Website
**PENTING:** Karena Astro build static pages, Anda perlu:

**Opsi A: Hard Refresh Browser** (RECOMMENDED)
- Windows: `Ctrl + Shift + R` atau `Ctrl + F5`
- Mac: `Cmd + Shift + R`

**Opsi B: Clear Cache + Refresh**
- Buka DevTools (F12)
- Klik kanan tombol refresh → "Empty Cache and Hard Reload"

**Opsi C: Restart Astro Dev Server**
```bash
# Di terminal landing-page
Ctrl + C
npm run dev
```

---

## Kenapa Perlu Hard Refresh?

Astro menggunakan **Server-Side Rendering (SSR)** tapi dengan caching. Meskipun `useCdn: false` sudah aktif, browser Anda mungkin masih cache halaman lama.

**Hard refresh** memaksa browser untuk:
1. Bypass cache
2. Fetch ulang dari server Astro
3. Astro fetch ulang dari Sanity (karena `useCdn: false`)
4. Render dengan data terbaru

---

## Tips Workflow Efisien

### Untuk Testing Cepat:
1. Buka 2 window browser side-by-side:
   - **Kiri:** Sanity Studio (localhost:3333)
   - **Kanan:** Landing Page (localhost:4321)
2. Edit di Sanity → Publish
3. Hard refresh (Ctrl+Shift+R) di window kanan
4. Lihat perubahan langsung!

### Untuk Production:
Setelah deploy ke Vercel:
- Perubahan di Sanity **langsung muncul** tanpa perlu rebuild
- Tidak perlu hard refresh (karena Vercel auto-invalidate cache)
- Webhook Sanity → Vercel akan trigger rebuild otomatis

---

## Troubleshooting

### Perubahan Masih Tidak Muncul?
1. ✅ Pastikan sudah klik "Publish" di Sanity (bukan cuma Save)
2. ✅ Hard refresh browser (Ctrl+Shift+R)
3. ✅ Check console browser untuk error
4. ✅ Restart Astro dev server

### Data Lama Terus Muncul?
```bash
# Clear Astro cache
cd landing-page
rm -rf .astro
npm run dev
```

---

## Future: Auto-Refresh Setup

Nanti kita bisa tambahkan:
- **Sanity Webhook** → trigger Astro rebuild
- **Hot Module Replacement (HMR)** untuk Sanity data
- **Presentation Tool** dengan proper config

Tapi untuk sekarang, **hard refresh** adalah cara tercepat dan paling reliable! 🚀
