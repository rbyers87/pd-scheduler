import { SupabaseClient } from '@supabase/supabase-js';

export async function createTimeOffPolicies(supabase: SupabaseClient) {
  const { error } = await supabase.query(`
    drop policy if exists "Users can view their own requests" on time_off_requests;
    drop policy if exists "Users can create requests" on time_off_requests;
    drop policy if exists "Admins can manage all requests" on time_off_requests;
    
    create policy "Users can view their own requests"
      on time_off_requests for select
      using (auth.uid() = user_id);
    
    create policy "Users can create requests"
      on time_off_requests for insert
      with check (auth.uid() = user_id);
    
    create policy "Admins can manage all requests"
      on time_off_requests for all
      using (exists (
        select 1 from users where id = auth.uid() and role = 'admin'
      ));
  `);

  if (error) {
    console.error('Error creating time off policies:', error);
    throw error;
  }
}