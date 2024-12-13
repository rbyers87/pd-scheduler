import { supabase } from '../supabase';
import { handleDatabaseError } from './utils/errorHandling';
import { checkDatabaseConnection } from './utils/initCheck';

async function setupSchema() {
  const { error } = await supabase.query(`
    -- Enable RLS
    alter table if exists auth.users enable row level security;

    -- Create users table if not exists
    create table if not exists public.users (
      id uuid references auth.users(id) primary key,
      email text not null unique,
      name text not null,
      role text not null check (role in ('admin', 'user')),
      group text not null,
      benefits jsonb not null default '{"vacation": 0, "sick": 0, "comp": 0}'::jsonb,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    -- Enable RLS on users table
    alter table public.users enable row level security;

    -- Create basic policies
    create policy if not exists "Users can view their own data"
      on users for select
      using (auth.uid() = id);

    create policy if not exists "Admins can view all users"
      on users for select
      using (
        exists (
          select 1 
          from users u 
          where u.id = auth.uid() 
          and u.role = 'admin'
        )
      );
  `);

  if (error) throw error;
}

async function setupSystemFunctions() {
  const { error } = await supabase.query(`
    create or replace function check_table_exists(table_name text)
    returns boolean
    language plpgsql
    security definer
    as $$
    begin
      return exists (
        select 1
        from information_schema.tables
        where table_schema = 'public'
        and table_name = $1
      );
    end;
    $$;
  `);

  if (error) throw error;
}

export async function setupDatabase() {
  try {
    // Verify environment variables
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!url || !key) {
      throw new Error('Missing Supabase configuration');
    }

    // Check database connection
    const isConnected = await checkDatabaseConnection(supabase);
    if (!isConnected) {
      throw new Error('Could not connect to database');
    }

    // Setup system functions first
    await setupSystemFunctions();
    
    // Setup schema and policies
    await setupSchema();

    return true;
  } catch (error) {
    const dbError = handleDatabaseError(error as any, 'database setup');
    console.error('Database setup failed:', dbError.message);
    throw dbError;
  }
}