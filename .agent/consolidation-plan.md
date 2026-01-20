# 🔄 Consolidation Plan: Merge Small Tables

**Status:** 🟡 Ready to Execute  
**Priority:** Medium  
**Estimated Time:** 2-3 days  
**Risk:** Medium (requires code changes)

---

## 🎯 Goal

Merge small, related tables into `website_settings` for:
- ✅ Simpler schema
- ✅ More flexible configuration
- ✅ Easier management
- ✅ Fewer tables to maintain

---

## 📊 Tables to Consolidate

### Current State (Fragmented)
```
contact_info (3 rows)
├── address
├── phone
├── email
└── whatsapp

social_media (4 rows)
├── facebook
├── instagram
├── twitter
└── youtube

website_settings (19 rows)
├── site_title
├── site_tagline
└── ... (other settings)
```

### Target State (Unified)
```
website_settings (26+ rows)
├── site_title
├── site_tagline
├── contact_address      ← from contact_info
├── contact_phone        ← from contact_info
├── contact_email        ← from contact_info
├── contact_whatsapp     ← from contact_info
├── social_facebook      ← from social_media
├── social_instagram     ← from social_media
├── social_twitter       ← from social_media
└── social_youtube       ← from social_media
```

---

## 📝 Implementation Steps

### Phase 1: Data Migration (30 minutes)

**1.1 Apply Migration**
```bash
# Migration file already created:
# supabase/migrations/20260114_consolidate_settings.sql
```

Run via MCP or Supabase CLI:
```sql
-- Migrate contact_info → website_settings
-- Migrate social_media → website_settings
```

**1.2 Verify Data**
```sql
SELECT key, value 
FROM website_settings 
WHERE key LIKE 'contact_%' OR key LIKE 'social_%'
ORDER BY key;
```

---

### Phase 2: Update Code (2-3 hours)

**2.1 Update `src/lib/actions/contact.ts`**

**Before:**
```typescript
export async function getContactInfo() {
    const { data } = await supabase
        .from("contact_info")
        .select("*");
    return data;
}

export async function getSocialMedia() {
    const { data } = await supabase
        .from("social_media")
        .select("*");
    return data;
}
```

**After:**
```typescript
export async function getContactInfo() {
    const { data } = await supabase
        .from("website_settings")
        .select("*")
        .like("key", "contact_%");
    
    // Transform to object
    const contact = {};
    data?.forEach(item => {
        const key = item.key.replace('contact_', '');
        contact[key] = item.value;
    });
    return contact;
}

export async function getSocialMedia() {
    const { data } = await supabase
        .from("website_settings")
        .select("*")
        .like("key", "social_%");
    
    // Transform to array
    return data?.map(item => ({
        platform: item.key.replace('social_', ''),
        url: item.value
    }));
}
```

**2.2 Update `src/hooks/useFooter.ts`**

**Before:**
```typescript
const { data: contactInfo } = await supabase
    .from("contact_info")
    .select("*");

const { data: socialMedia } = await supabase
    .from("social_media")
    .select("*");
```

**After:**
```typescript
const { data: settings } = await supabase
    .from("website_settings")
    .select("*")
    .or("key.like.contact_%,key.like.social_%");

const contactInfo = settings
    ?.filter(s => s.key.startsWith('contact_'))
    .reduce((acc, s) => {
        acc[s.key.replace('contact_', '')] = s.value;
        return acc;
    }, {});

const socialMedia = settings
    ?.filter(s => s.key.startsWith('social_'))
    .map(s => ({
        platform: s.key.replace('social_', ''),
        url: s.value
    }));
```

**2.3 Create Helper Function**

Create `src/lib/utils/settings-helpers.ts`:
```typescript
import { createClient } from '@/lib/supabase/server';

export async function getSettingsByPrefix(prefix: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from('website_settings')
        .select('*')
        .like('key', `${prefix}_%`);
    
    return data?.reduce((acc, item) => {
        const key = item.key.replace(`${prefix}_`, '');
        acc[key] = item.value;
        return acc;
    }, {} as Record<string, string>);
}

export async function getContactSettings() {
    return getSettingsByPrefix('contact');
}

export async function getSocialSettings() {
    return getSettingsByPrefix('social');
}

export async function updateSetting(key: string, value: string) {
    const supabase = await createClient();
    return supabase
        .from('website_settings')
        .upsert({ key, value, updated_at: new Date().toISOString() });
}
```

---

### Phase 3: Testing (1-2 hours)

**3.1 Test Checklist**
- [ ] Footer displays contact info correctly
- [ ] Footer displays social media links correctly
- [ ] Contact page shows all information
- [ ] Admin dashboard can edit contact info
- [ ] Admin dashboard can edit social media
- [ ] No console errors
- [ ] No broken links

**3.2 Test Commands**
```bash
# Run dev server
npm run dev

# Test pages:
# - http://localhost:3000/ (footer)
# - http://localhost:3000/kontak (contact page)
# - http://localhost:3000/dashboard/website/settings
```

---

### Phase 4: Cleanup (After 1 week stable)

**4.1 Drop Old Tables**
```sql
-- Only run after 1 week of stable operation!
DROP TABLE IF EXISTS public.contact_info CASCADE;
DROP TABLE IF EXISTS public.social_media CASCADE;
```

**4.2 Remove Old Action Functions**
Delete or deprecate old functions in:
- `src/lib/actions/contact.ts`

---

## 🚨 Rollback Plan

If something goes wrong:

```sql
-- Restore from backup
-- OR
-- Recreate tables from website_settings

CREATE TABLE contact_info AS
SELECT 
    gen_random_uuid() as id,
    REPLACE(key, 'contact_', '') as label,
    value,
    NOW() as created_at
FROM website_settings
WHERE key LIKE 'contact_%';

CREATE TABLE social_media AS
SELECT 
    gen_random_uuid() as id,
    REPLACE(key, 'social_', '') as platform,
    value as url,
    TRUE as is_active,
    NOW() as created_at
FROM website_settings
WHERE key LIKE 'social_%';
```

---

## 📊 Benefits

**Before:**
- 3 tables to manage (website_settings, contact_info, social_media)
- Need to join tables for complete settings
- Hard to add new contact methods
- Hard to add new social platforms

**After:**
- 1 table to manage (website_settings)
- All settings in one place
- Easy to add new settings (just INSERT)
- Consistent pattern for all configurations

---

## 🎯 Next Steps

1. **Review this plan** - Make sure you understand all changes
2. **Backup database** - Always backup before major changes
3. **Apply migration** - Run the SQL migration
4. **Update code** - Follow Phase 2 steps
5. **Test thoroughly** - Follow Phase 3 checklist
6. **Monitor** - Watch for issues for 1 week
7. **Cleanup** - Drop old tables after stable

---

**Ready to proceed?** Let me know and I'll help you execute each phase! 🚀
