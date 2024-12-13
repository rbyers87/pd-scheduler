-- Function to check if a table exists
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

-- Function to check admin status
create or replace function is_admin()
returns boolean
language plpgsql
security definer
as $$
begin
  return exists (
    select 1
    from public.users
    where id = auth.uid()
    and role = 'admin'
  );
end;
$$;