-- Users table policies
drop policy if exists "Users can view their own data" on users;
drop policy if exists "Admins can view all users" on users;
drop policy if exists "Admins can manage users" on users;

create policy "Users can view their own data"
  on users for select
  using (auth.uid() = id);

create policy "Admins can view all users"
  on users for select
  using (is_admin());

create policy "Admins can manage users"
  on users for all
  using (is_admin());

-- Schedules table policies
drop policy if exists "Users can view their schedules" on schedules;
drop policy if exists "Admins can manage schedules" on schedules;

create policy "Users can view their schedules"
  on schedules for select
  using (user_id = auth.uid());

create policy "Admins can manage schedules"
  on schedules for all
  using (is_admin());

-- Time off requests policies
drop policy if exists "Users can view their requests" on time_off_requests;
drop policy if exists "Users can create requests" on time_off_requests;
drop policy if exists "Admins can manage requests" on time_off_requests;

create policy "Users can view their requests"
  on time_off_requests for select
  using (user_id = auth.uid());

create policy "Users can create requests"
  on time_off_requests for insert
  with check (user_id = auth.uid());

create policy "Admins can manage requests"
  on time_off_requests for all
  using (is_admin());