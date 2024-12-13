import { SupabaseClient } from '@supabase/supabase-js';

export async function createUsersTable(supabase: SupabaseClient) {
  const { error } = await supabase.query(`
    create table if not exists public.users (
      id uuid references auth.users(id) primary key,
      email text not null unique,
      name text not null,
      role text not null check (role in ('admin', 'user')),
      group text not null,
      benefits jsonb not null default '{"vacation": 0, "sick": 0, "comp": 0}',
      created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    alter table public.users enable row level security;
  `);

  if (error) {
    console.error('Error creating users table:', error);
    throw error;
  }
}