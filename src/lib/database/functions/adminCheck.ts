import { SupabaseClient } from '@supabase/supabase-js';

export async function createAdminCheckFunction(supabase: SupabaseClient) {
  const { error } = await supabase.query(`
    create or replace function admin_check(user_id uuid)
    returns void
    security definer
    set search_path = public
    language plpgsql
    as $$
    begin
      -- This function exists to bypass RLS for the initial admin check
      return;
    end;
    $$;
  `);

  if (error) {
    console.error('Error creating admin check function:', error);
    throw error;
  }
}