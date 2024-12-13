-- Drop existing policies
drop policy if exists "Users can view their own data" on users;
drop policy if exists "Admins can view all users" on users;

-- Create new policies
create policy "Users can view their own data"
  on users for select
  using (auth.uid() = id);

create policy "Admins can view all users"
  on users for select
  using (
    exists (
      select 1 
      from users u 
      where u.id = auth.uid() 
      and u.role = 'admin'
    )
  );