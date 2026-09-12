/* 27 Mart — Supabase public client configuration.
   This publishable key is intentionally usable in the browser.
   Database security is enforced by Supabase RLS policies in supabase-schema.sql. */
const SUPABASE_URL='https://khhptyanhgwodrrzpuuf.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_EQ-8D8Hh_P-Bcla12umgLw_Uu6Q2d7P';
window.martDB=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
