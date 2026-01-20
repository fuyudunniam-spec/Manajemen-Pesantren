-- Add missing section types to enum
ALTER TYPE section_type ADD VALUE IF NOT EXISTS 'vision-mission';
ALTER TYPE section_type ADD VALUE IF NOT EXISTS 'programs';
ALTER TYPE section_type ADD VALUE IF NOT EXISTS 'latest-articles';
ALTER TYPE section_type ADD VALUE IF NOT EXISTS 'achievements';
