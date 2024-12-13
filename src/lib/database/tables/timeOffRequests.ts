import { SupabaseClient } from '@supabase/supabase-js';

export async function createTimeOffRequestsTable(supabase: SupabaseClient) {
  const { error } = await supabase.query(`
    create table if not exists public.time_off_requests (
      id uuid default gen_random_uuid() primary key,
      user_id uuid references public.users(id) not null,
      start_date date not null,
      end_date date not null,
      type text not null check (type in ('vacation', 'sick', 'comp')),
      status text not null check (status in ('pending', 'approved', 'rejected')) default 'pending',
      hours numeric not null check (hours > 0),
      created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    alter table public.time_off_requests enable row level security;
  `);

  if (error) {
    console.error('Error creating time off requests table:', error);
    throw error;
  }
}