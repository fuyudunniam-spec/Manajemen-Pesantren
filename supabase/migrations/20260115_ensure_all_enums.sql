-- Ensure all section types exist in the enum
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'hero';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'page-header';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'features';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'vision-mission';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'education-grid';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'philanthropy';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'latest-articles';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'cta';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'stats';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'gallery';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'testimonials';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'partners';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'achievements';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'contact';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'text-block';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'programs'; -- Keep for backward compatibility
