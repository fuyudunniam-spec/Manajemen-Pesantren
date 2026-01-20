-- ============================================================================
-- DATABASE CLEANUP SCRIPT - OPSI A (ROLLBACK & CLEANUP)
-- ============================================================================
-- Purpose: Remove unused tables from failed V2 migration
-- Impact: Remove ~800 kB of unused data
-- Risk: LOW (tables are not used in code)
-- ============================================================================

-- ============================================================================
-- STEP 1: BACKUP CHECK
-- ============================================================================
-- Before running this, make sure you have a backup!
-- Run this query to see what will be deleted:

SELECT 'pages' as table_name, COUNT(*) as rows FROM public.pages
UNION ALL
SELECT 'sections', COUNT(*) FROM public.sections
UNION ALL
SELECT 'page_sections', COUNT(*) FROM public.page_sections
UNION ALL
SELECT 'themes', COUNT(*) FROM public.themes
UNION ALL
SELECT 'website_sections', COUNT(*) FROM public.website_sections;

-- Expected output:
-- pages: 4 rows
-- sections: 25 rows
-- page_sections: 15 rows
-- themes: 4 rows
-- website_sections: 0 rows

-- ============================================================================
-- STEP 2: DROP UNUSED TABLES FROM V2 MIGRATION
-- ============================================================================

-- Drop the new system tables (not used in code)
DROP TABLE IF EXISTS public.page_sections CASCADE;
DROP TABLE IF EXISTS public.sections CASCADE;
DROP TABLE IF EXISTS public.pages CASCADE;
DROP TABLE IF EXISTS public.themes CASCADE;

-- Drop zombie table (empty and not used)
DROP TABLE IF EXISTS public.website_sections CASCADE;

-- Drop the section_type enum (created by V2 migration)
DROP TYPE IF EXISTS section_type CASCADE;

-- ============================================================================
-- STEP 3: VERIFY CLEANUP
-- ============================================================================

-- Check that tables are gone
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('pages', 'sections', 'page_sections', 'themes', 'website_sections')
ORDER BY table_name;

-- Expected output: (empty result set)

-- ============================================================================
-- STEP 4: VERIFY LEGACY TABLES STILL EXIST
-- ============================================================================

-- These tables MUST still exist and have data
SELECT 
    table_name,
    (SELECT COUNT(*) FROM public.navigation_items) as navigation_items,
    (SELECT COUNT(*) FROM public.cta_buttons) as cta_buttons,
    (SELECT COUNT(*) FROM public.contact_info) as contact_info,
    (SELECT COUNT(*) FROM public.social_media) as social_media,
    (SELECT COUNT(*) FROM public.footer_sections) as footer_sections,
    (SELECT COUNT(*) FROM public.footer_links) as footer_links,
    (SELECT COUNT(*) FROM public.website_settings) as website_settings,
    (SELECT COUNT(*) FROM public.website_menus) as website_menus
FROM (SELECT 'verification' as table_name) v;

-- Expected output:
-- navigation_items: 5
-- cta_buttons: 2
-- contact_info: 3
-- social_media: 4
-- footer_sections: 3
-- footer_links: 9
-- website_settings: 19
-- website_menus: 7

-- ============================================================================
-- STEP 5: CHECK DATABASE SIZE REDUCTION
-- ============================================================================

SELECT 
    schemaname,
    pg_size_pretty(SUM(pg_total_relation_size(schemaname||'.'||tablename))) AS total_size
FROM pg_tables
WHERE schemaname = 'public'
GROUP BY schemaname;

-- ============================================================================
-- NOTES
-- ============================================================================
-- After running this cleanup:
-- 1. Delete migration file: supabase/migrations/20260113_website_management_v2.sql
-- 2. Your code will continue to work (no breaking changes)
-- 3. Database will be cleaner and more efficient
-- 4. You can migrate to V2 system later if needed (Opsi B)
-- ============================================================================
