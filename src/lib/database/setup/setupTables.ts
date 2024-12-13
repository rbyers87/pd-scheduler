import { SupabaseClient } from '@supabase/supabase-js';
import { createUsersTable } from '../tables/users';
import { createSchedulesTable } from '../tables/schedules';
import { createTimeOffRequestsTable } from '../tables/timeOffRequests';

export async function setupTables(supabase: SupabaseClient) {
  await createUsersTable(supabase);
  await createSchedulesTable(supabase);
  await createTimeOffRequestsTable(supabase);
}