import { SupabaseClient } from '@supabase/supabase-js';

export async function createTimeOffRequestsTable(supabase: SupabaseClient) {
  const { error } = await supabase.from('time_off_requests').select('*').limit(1);
  
  // If table doesn't exist, create it
  if (error?.code === '42P01') {
    const { error: createError } = await supabase
      .from('time_off_requests')
      .insert({
        id: '00000000-0000-0000-0000-000000000000',
        user_id: '00000000-0000-0000-0000-000000000000',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        type: 'vacation',
        status: 'pending',
        hours: 8
      });

    if (createError && createError.code !== '23505') {
      console.error('Error creating time off requests table:', createError);
      throw createError;
    }
  } else if (error) {
    console.error('Error checking time off requests table:', error);
    throw error;
  }
}