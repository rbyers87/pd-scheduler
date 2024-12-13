import { SupabaseClient } from '@supabase/supabase-js';

export async function createUserPolicies(supabase: SupabaseClient) {
  const { error } = await supabase.query(`
    drop policy if exists "Users can view their own data" on users;
    drop policy if exists "Admins can view all users" on users;
    
    create policy "Users can view their own data"
      on users for select
      using (auth.uid() = id);
    
    create policy "Admins can view all users"
      on users for select
      using (exists (
        select 1 from users where id = auth.uid() and role = 'admin'
      ));
  `);

  if (error) {
    console.error('Error creating user policies:', error);
    throw error;
  }
}