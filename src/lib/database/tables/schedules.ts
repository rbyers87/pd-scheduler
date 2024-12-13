import { SupabaseClient } from '@supabase/supabase-js';

export async function createSchedulesTable(supabase: SupabaseClient) {
  const { error } = await supabase.query(`
    create table if not exists public.schedules (
      id uuid default gen_random_uuid() primary key,
      user_id uuid references public.users(id) not null,
      date date not null,
      shift text not null,
      sector text,
      is_recurring boolean default false,
      recurring_pattern jsonb,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    alter table public.schedules enable row level security;
  `);

  if (error) {
    console.error('Error creating schedules table:', error);
    throw error;
  }
}