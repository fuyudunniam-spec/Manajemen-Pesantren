# 🎯 Database Quick Reference Card

**Last Updated:** 2026-01-14  
**Total Tables:** 17  
**Total Size:** 1.1 MB

---

## ⚡ Quick Commands

### Check Table Usage in Code
```bash
# Search for table references
rg 'from\("table_name"\)' src/
```

### Add New Setting
```sql
-- Use website_settings for all configuration
INSERT INTO website_settings (key, value)
VALUES ('new_setting_key', 'value');
```

### Check Database Size
```sql
SELECT 
    schemaname,
    COUNT(*) as tables,
    pg_size_pretty(SUM(pg_total_relation_size(schemaname||'.'||tablename))) AS size
FROM pg_tables
WHERE schemaname = 'public'
GROUP BY schemaname;
```

---

## 📋 Before Adding Content

**STOP and ask:**

1. ❓ Bisa pakai **General Section**? (Gunakan tabel `sections` dengan type yang sesuai)
2. ❓ Perlu halaman baru? (Tambah row di tabel `pages`)
3. ❓ Apakah ini data konfigurasi global? (Gunakan `website_settings`)

---

## 🗂️ Table Categories

### 🚀 Modern (Page Builder) - UTAMAKAN INI
- `pages`: Definisi halaman (Home, Profile, etc.)
- `sections`: Komponen konten (Hero, Features, Testimonial, etc.)
- `page_sections`: Pengatur urutan section di tiap halaman.

### 🟡 Legacy (Sedang Dipindahkan)
- `contact_info`, `social_media`, `cta_buttons`: Data hardcoded.

### 🔧 Settings & Config
**Use:** `website_settings` (key-value pattern)
```typescript
// Get setting
const { data } = await supabase
    .from('website_settings')
    .select('value')
    .eq('key', 'site_title')
    .single();

// Set setting
await supabase
    .from('website_settings')
    .upsert({ key: 'site_title', value: 'New Title' });
```

### 📝 Content Management
- `blog_posts` - Articles
- `blog_categories` - Post categories
- `authors` - Post authors

### 🧭 Navigation
- `navigation_items` - Main menu
- `footer_sections` - Footer columns
- `footer_links` - Footer links

### 👥 Users & Auth
- `profiles` - User profiles
- `roles` - User roles
- `permissions` - Available permissions
- `user_permissions` - User-permission mapping

### 📞 Contact & Social
⚠️ **TO BE CONSOLIDATED:**
- `contact_info` → migrate to `website_settings`
- `social_media` → migrate to `website_settings`

---

## ✅ Migration Checklist

Before applying any migration:

- [ ] Documented purpose and impact
- [ ] Updated all action files
- [ ] Updated all components
- [ ] Tested in local
- [ ] Backed up database
- [ ] Applied to staging
- [ ] Tested in staging
- [ ] Ready for production

---

## 🚨 Red Flags

**STOP if you see:**

- 🔴 Creating table similar to existing one
- 🔴 Migration without code changes
- 🔴 Table with 0 rows for > 1 week
- 🔴 Multiple tables doing same thing
- 🔴 JSONB being heavily queried with WHERE

**Action:** Review with team before proceeding

---

## 📚 Full Documentation

- **Rules:** `.agent/DATABASE_RULES.md`
- **Analysis:** `.agent/database-efficiency-analysis.md`
- **Summary:** `.agent/CLEANUP_SUMMARY.md`
- **Consolidation:** `.agent/consolidation-plan.md`

---

## 🆘 Need Help?

1. Check `.agent/DATABASE_RULES.md` for guidelines
2. Review `.agent/CLEANUP_SUMMARY.md` for current state
3. Ask team before major changes
4. When in doubt, use `website_settings`!

---

**Remember: Simple is better than complex. Consolidate, don't fragment!** 🚀
