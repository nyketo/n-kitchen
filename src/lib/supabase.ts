import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Cloud sync is entirely optional. If the env vars are not set (e.g. running
 * locally without them, or before they're configured in Vercel), `supabase`
 * is null and every function in `sync.ts` becomes a safe no-op. The app
 * always works fully offline — this is a pure addition, never a requirement.
 */
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null;
