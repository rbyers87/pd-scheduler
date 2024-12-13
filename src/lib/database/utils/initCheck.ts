import { SupabaseClient } from '@supabase/supabase-js';

export async function checkDatabaseConnection(supabase: SupabaseClient): Promise<boolean> {
  try {
    // Simple query to check if we can connect to Supabase
    const { data, error } = await supabase.from('users').select('count').limit(0);
    return !error;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
}

export async function checkTableExists(supabase: SupabaseClient, tableName: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .rpc('check_table_exists', { table_name: tableName });
      
    return data || false;
  } catch (error) {
    return false;
  }
}