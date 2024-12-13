import { SupabaseClient } from '@supabase/supabase-js';
import { createUserPolicies } from '../policies/userPolicies';
import { createSchedulePolicies } from '../policies/schedulePolicies';
import { createTimeOffPolicies } from '../policies/timeOffPolicies';

export async function setupPolicies(supabase: SupabaseClient) {
  await createUserPolicies(supabase);
  await createSchedulePolicies(supabase);
  await createTimeOffPolicies(supabase);
}