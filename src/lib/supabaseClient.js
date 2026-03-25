import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnon);

if (!hasSupabaseEnv) {
  console.warn('[supabaseClient] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env. Supabase logging is disabled.');
}

export const supabase = hasSupabaseEnv
  ? createClient(supabaseUrl, supabaseAnon)
  : null;

export const isSupabaseEnabled = hasSupabaseEnv;
