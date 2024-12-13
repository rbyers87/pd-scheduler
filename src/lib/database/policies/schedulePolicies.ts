import { SupabaseClient } from '@supabase/supabase-js';

export async function createSchedulePolicies(supabase: SupabaseClient) {
  const { error } = await supabase.query(`
    drop policy if exists "Users can view their own schedules" on schedules;
    drop policy if exists "Admins can manage schedules" on schedules;
    
    create policy "Users can view their own schedules"
      on schedules for select
      using (auth.uid() = user_id);
    
    create policy "Admins can manage schedules"
      on schedules for all
      using (exists (
        select 1 from users where id = auth.uid() and role = 'admin'
      ));
  `);

  if (error) {
    console.error('Error creating schedule policies:', error);
    throw error;
  }
}