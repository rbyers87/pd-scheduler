import { SupabaseClient } from '@supabase/supabase-js';

export async function checkDatabaseConnection(supabase: SupabaseClient): Promise<boolean> {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Auth session check failed:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
}

export async function checkTableExists(supabase: SupabaseClient, tableName: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    return !error;
  } catch (error) {
    return false;
  }
}