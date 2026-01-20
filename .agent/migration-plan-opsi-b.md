# Action Plan: Migrate ke Sistem Baru (Opsi B)

## 🎯 Tujuan
Migrate dari sistem lama (tabel terpisah) ke sistem baru (unified pages/sections) untuk database yang lebih terstruktur dan scalable.

---

## 📋 Prerequisites
- ✅ Backup database
- ✅ Testing environment ready
- ✅ Estimasi waktu: 2-4 minggu
- ✅ Risk: HIGH (breaking changes)

---

## 🗺️ Migration Roadmap

### Phase 1: Preparation (Week 1)
**Goal:** Setup foundation tanpa breaking existing features

#### 1.1 Create New Action Files
```typescript
// src/lib/actions/unified-pages.ts
- getPages()
- getPageBySlug()
- createPage()
- updatePage()
- deletePage()

// src/lib/actions/unified-sections.ts
- getSections()
- getSectionById()
- createSection()
- updateSection()
- deleteSection()
- attachSectionToPage()
- detachSectionFromPage()
- reorderSections()

// src/lib/actions/unified-themes.ts
- getActiveTheme()
- getAllThemes()
- setActiveTheme()
- updateTheme()
```

#### 1.2 Create Type Definitions
```typescript
// src/types/unified-cms.ts
export interface Page {
  id: string;
  slug: string;
  title: string;
  meta_description?: string;
  hero_image_url?: string;
  template_key: 'home' | 'about' | 'contact' | 'generic';
  theme_id?: string;
  is_published: boolean;
  show_in_nav: boolean;
  nav_label?: string;
  nav_order: number;
  created_at: string;
  updated_at: string;
}

export interface Section {
  id: string;
  key: string;
  type: SectionType;
  title?: string;
  subtitle?: string;
  content: Record<string, any>;
  settings: Record<string, any>;
  is_shared: boolean;
  created_at: string;
  updated_at: string;
}

export type SectionType = 
  | 'hero'
  | 'features'
  | 'testimonials'
  | 'contact'
  | 'team'
  | 'cta'
  | 'gallery'
  | 'text-block'
  | 'stats'
  | 'faq'
  | 'pricing'
  | 'partners'
  | 'custom';

export interface PageSection {
  id: string;
  page_id: string;
  section_id: string;
  order_index: number;
  is_visible: boolean;
  overrides: Record<string, any>;
}

export interface Theme {
  id: string;
  name: string;
  slug: string;
  description?: string;
  config: ThemeConfig;
  presets: Record<string, string[]>;
  is_active: boolean;
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: {
    border_radius: string;
    spacing: string;
  };
}
```

---

### Phase 2: Data Migration (Week 1-2)
**Goal:** Migrate existing data to new structure

#### 2.1 Migration Script: Navigation
```sql
-- Migrate navigation_items → pages (with show_in_nav = true)
INSERT INTO public.pages (slug, title, template_key, is_published, show_in_nav, nav_label, nav_order)
SELECT 
    LOWER(REGEXP_REPLACE(label, '[^a-zA-Z0-9]+', '-', 'g')) as slug,
    label as title,
    'generic' as template_key,
    is_active as is_published,
    TRUE as show_in_nav,
    label as nav_label,
    "order" as nav_order
FROM public.navigation_items
WHERE is_active = TRUE
ON CONFLICT (slug) DO NOTHING;
```

#### 2.2 Migration Script: Contact Info → Sections
```sql
-- Migrate contact_info → sections (type: contact)
INSERT INTO public.sections (key, type, title, content, is_shared)
SELECT 
    'contact-' || id as key,
    'contact' as type,
    'Contact Information' as title,
    jsonb_build_object(
        'address', address,
        'phone', phone,
        'email', email,
        'whatsapp', whatsapp,
        'map_embed', map_embed
    ) as content,
    TRUE as is_shared
FROM public.contact_info
ON CONFLICT (key) DO NOTHING;
```

#### 2.3 Migration Script: CTA Buttons → Sections
```sql
-- Migrate cta_buttons → sections (type: cta)
INSERT INTO public.sections (key, type, title, content, is_shared)
SELECT 
    'cta-' || id as key,
    'cta' as type,
    label as title,
    jsonb_build_object(
        'button_text', label,
        'button_url', url,
        'description', description,
        'style', style
    ) as content,
    TRUE as is_shared
FROM public.cta_buttons
WHERE is_active = TRUE
ON CONFLICT (key) DO NOTHING;
```

#### 2.4 Migration Script: Social Media → Sections
```sql
-- Migrate social_media → sections (type: custom - social)
INSERT INTO public.sections (key, type, title, content, is_shared)
VALUES (
    'social-media',
    'custom',
    'Social Media Links',
    (
        SELECT jsonb_build_object(
            'links', jsonb_agg(
                jsonb_build_object(
                    'platform', platform,
                    'url', url,
                    'icon', icon
                )
            )
        )
        FROM public.social_media
        WHERE is_active = TRUE
    ),
    TRUE
)
ON CONFLICT (key) DO UPDATE SET content = EXCLUDED.content;
```

#### 2.5 Migration Script: Website Settings → Theme
```sql
-- Migrate website_settings → themes
INSERT INTO public.themes (name, slug, config, is_active)
VALUES (
    'Current Theme',
    'current',
    (
        SELECT jsonb_build_object(
            'colors', jsonb_build_object(
                'primary', COALESCE((SELECT value FROM public.website_settings WHERE key = 'primary_color'), '#3B82F6'),
                'secondary', COALESCE((SELECT value FROM public.website_settings WHERE key = 'secondary_color'), '#10B981'),
                'accent', COALESCE((SELECT value FROM public.website_settings WHERE key = 'accent_color'), '#F59E0B'),
                'background', '#FFFFFF',
                'text', '#1F2937'
            ),
            'fonts', jsonb_build_object(
                'heading', COALESCE((SELECT value FROM public.website_settings WHERE key = 'heading_font'), 'Inter'),
                'body', COALESCE((SELECT value FROM public.website_settings WHERE key = 'body_font'), 'Inter')
            ),
            'layout', jsonb_build_object(
                'border_radius', 'rounded',
                'spacing', 'normal'
            )
        )
    ),
    TRUE
)
ON CONFLICT (slug) DO UPDATE SET config = EXCLUDED.config;
```

---

### Phase 3: Code Migration (Week 2-3)
**Goal:** Update all components to use new system

#### 3.1 Update Navigation Component
```typescript
// Before (using navigation_items)
import { getNavigationItems } from '@/lib/actions/navigation';

// After (using pages)
import { getPages } from '@/lib/actions/unified-pages';

const navItems = await getPages({ showInNav: true });
```

#### 3.2 Update Footer Component
```typescript
// Before (using footer_sections + footer_links)
import { getFooterSections } from '@/lib/actions/footer';

// After (using sections)
import { getSections } from '@/lib/actions/unified-sections';

const footerSections = await getSections({ type: 'footer' });
```

#### 3.3 Update Contact Page
```typescript
// Before (using contact_info)
import { getContactInfo } from '@/lib/actions/contact';

// After (using sections)
import { getSections } from '@/lib/actions/unified-sections';

const contactSection = await getSections({ type: 'contact' });
```

#### 3.4 Update Theme System
```typescript
// Before (using website_settings)
import { getWebsiteSettings } from '@/lib/actions/website-settings';

// After (using themes)
import { getActiveTheme } from '@/lib/actions/unified-themes';

const theme = await getActiveTheme();
```

---

### Phase 4: Dashboard Update (Week 3)
**Goal:** Update admin dashboard to manage new system

#### 4.1 Create New Dashboard Pages
```
/dashboard/website/pages
/dashboard/website/sections
/dashboard/website/themes
```

#### 4.2 Create Visual Page Builder
- Drag & drop sections
- Live preview
- Section templates
- Theme customizer

---

### Phase 5: Testing & Rollout (Week 4)
**Goal:** Ensure everything works before dropping old tables

#### 5.1 Testing Checklist
- [ ] All public pages render correctly
- [ ] Navigation works
- [ ] Footer works
- [ ] Contact form works
- [ ] CTA buttons work
- [ ] Theme applies correctly
- [ ] Dashboard CRUD operations work
- [ ] No console errors
- [ ] Performance is acceptable

#### 5.2 Rollout Strategy
1. Deploy to staging
2. Test thoroughly
3. Fix any issues
4. Deploy to production
5. Monitor for 1 week
6. If stable, proceed to cleanup

---

### Phase 6: Cleanup (After 1 week stable)
**Goal:** Remove old tables

```sql
-- Drop old tables (only after new system is proven stable)
DROP TABLE IF EXISTS public.navigation_items CASCADE;
DROP TABLE IF EXISTS public.cta_buttons CASCADE;
DROP TABLE IF EXISTS public.contact_info CASCADE;
DROP TABLE IF EXISTS public.social_media CASCADE;
DROP TABLE IF EXISTS public.footer_sections CASCADE;
DROP TABLE IF EXISTS public.footer_links CASCADE;
DROP TABLE IF EXISTS public.website_menus CASCADE;

-- Keep website_settings for now (might have other data)
-- Can be dropped later after full audit
```

---

## 🚨 Risks & Mitigation

### Risk 1: Breaking Changes
**Mitigation:**
- Thorough testing in staging
- Feature flags for gradual rollout
- Keep old tables until new system is proven

### Risk 2: Data Loss
**Mitigation:**
- Full database backup before migration
- Verify data migration with SQL queries
- Keep old tables as backup

### Risk 3: Performance Issues
**Mitigation:**
- Add proper indexes
- Monitor query performance
- Optimize JSONB queries if needed

### Risk 4: User Confusion
**Mitigation:**
- Update documentation
- Train admin users
- Provide migration guide

---

## 📊 Success Metrics

- [ ] All features work as before
- [ ] Database queries are faster or same speed
- [ ] Code is more maintainable
- [ ] Admin dashboard is easier to use
- [ ] No data loss
- [ ] No downtime

---

## 🎯 Decision Point

**Before starting Phase 1, ask yourself:**
1. Do we really need this complexity?
2. Is the current system causing problems?
3. Do we have time for 2-4 weeks of work?
4. Is the team ready for this change?

**If answer is NO to any of these, choose Opsi A (Cleanup) instead!**

---

## 📝 Notes

- This is a BIG migration
- High risk, high reward
- Only do this if you're committed
- Consider Opsi C (Hybrid) as alternative
