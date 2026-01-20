-- Migration: Add New Section Types
-- Date: 2026-01-14
-- Purpose: Add new values to section_type enum to support redesign.

ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'education-grid'; 
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'philanthropy';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'page-header';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'latest-articles';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'text-block';
ALTER TYPE "public"."section_type" ADD VALUE IF NOT EXISTS 'vision-mission';
