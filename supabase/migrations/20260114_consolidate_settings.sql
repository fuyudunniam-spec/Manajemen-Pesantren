-- ============================================================================
-- CONSOLIDATION MIGRATION: Merge Small Tables into website_settings
-- ============================================================================
-- Date: 2026-01-14
-- Purpose: Consolidate contact_info, social_media into website_settings
-- Impact: Simpler schema, more flexible, easier to manage
-- Breaking Changes: Yes - need to update action files
-- Code Changes Required:
--   - src/lib/actions/contact.ts
--   - src/lib/actions/website-settings.ts
--   - src/hooks/useFooter.ts
-- ============================================================================

-- ============================================================================
-- STEP 1: Migrate contact_info → website_settings
-- ============================================================================

-- Insert contact information as key-value pairs
INSERT INTO public.website_settings (key, value, updated_at)
SELECT 
    'contact_' || 
    CASE 
        WHEN label = 'Alamat' THEN 'address'
        WHEN label = 'Telepon' THEN 'phone'
        WHEN label = 'Email' THEN 'email'
        WHEN label = 'WhatsApp' THEN 'whatsapp'
        ELSE LOWER(REGEXP_REPLACE(label, '[^a-zA-Z0-9]+', '_', 'g'))
    END as key,
    value,
    NOW()
FROM public.contact_info
ON CONFLICT (key) DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = EXCLUDED.updated_at;

-- ============================================================================
-- STEP 2: Migrate social_media → website_settings
-- ============================================================================

-- Insert social media links as key-value pairs
INSERT INTO public.website_settings (key, value, updated_at)
SELECT 
    'social_' || LOWER(platform) as key,
    url,
    NOW()
FROM public.social_media
WHERE is_active = TRUE
ON CONFLICT (key) DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = EXCLUDED.updated_at;

-- ============================================================================
-- STEP 3: Verify Migration
-- ============================================================================

-- Check migrated data
SELECT key, value 
FROM public.website_settings 
WHERE key LIKE 'contact_%' OR key LIKE 'social_%'
ORDER BY key;

-- Expected output:
-- contact_address | Jl. ...
-- contact_email | info@...
-- contact_phone | +62...
-- contact_whatsapp | +62...
-- social_facebook | https://facebook.com/...
-- social_instagram | https://instagram.com/...
-- social_twitter | https://twitter.com/...
-- social_youtube | https://youtube.com/...

-- ============================================================================
-- STEP 4: Drop Old Tables (ONLY AFTER CODE IS UPDATED!)
-- ============================================================================

-- ⚠️ WARNING: Only run this after updating all code references!
-- ⚠️ Make sure to update:
--    - src/lib/actions/contact.ts → use website_settings
--    - src/hooks/useFooter.ts → use website_settings

-- DROP TABLE IF EXISTS public.contact_info CASCADE;
-- DROP TABLE IF EXISTS public.social_media CASCADE;

-- ============================================================================
-- NOTES
-- ============================================================================
-- After this migration:
-- 1. Update src/lib/actions/contact.ts to use website_settings
-- 2. Update src/hooks/useFooter.ts to use website_settings
-- 3. Test thoroughly in staging
-- 4. Deploy to production
-- 5. Wait 1 week to ensure stability
-- 6. Then uncomment and run STEP 4 to drop old tables
-- ============================================================================
