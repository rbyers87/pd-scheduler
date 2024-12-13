import { SupabaseClient } from '@supabase/supabase-js';

export async function createUsersTable(supabase: SupabaseClient) {
  const { error } = await supabase.from('users').select('*').limit(1);
  
  // If table doesn't exist, create it
  if (error?.code === '42P01') { // Table does not exist error code
    const { error: createError } = await supabase
      .from('users')
      .insert({
        id: '00000000-0000-0000-0000-000000000000',
        email: 'system@example.com',
        name: 'System',
        role: 'admin',
        group: 'System',
        benefits: { vacation: 0, sick: 0, comp: 0 }
      });

    if (createError && createError.code !== '23505') { // Ignore unique violation
      console.error('Error creating users table:', createError);
      throw createError;
    }
  } else if (error) {
    console.error('Error checking users table:', error);
    throw error;
  }
}