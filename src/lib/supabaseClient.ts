// Legacy compatibility wrapper - redirects to the new client
// This allows old code to continue working while we migrate

import { createClient } from '@/lib/supabase/client';

// Create a singleton client for backward compatibility with old imports
export const supabase = createClient();

