import { SupabaseClient } from '@supabase/supabase-js';

export async function createSchedulesTable(supabase: SupabaseClient) {
  const { error } = await supabase.from('schedules').select('*').limit(1);
  
  // If table doesn't exist, create it
  if (error?.code === '42P01') {
    const { error: createError } = await supabase
      .from('schedules')
      .insert({
        id: '00000000-0000-0000-0000-000000000000',
        user_id: '00000000-0000-0000-0000-000000000000',
        date: new Date().toISOString(),
        shift: 'system',
        is_recurring: false
      });

    if (createError && createError.code !== '23505') {
      console.error('Error creating schedules table:', createError);
      throw createError;
    }
  } else if (error) {
    console.error('Error checking schedules table:', error);
    throw error;
  }
}