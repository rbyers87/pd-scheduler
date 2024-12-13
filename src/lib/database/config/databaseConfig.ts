import { Database } from '../../../types/supabase';

export function getDatabaseConfig() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase configuration. Please check your .env file.');
  }

  return { url, key };
}