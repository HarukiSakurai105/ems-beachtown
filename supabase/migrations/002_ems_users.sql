-- EMS Beach Town: database-backed accounts and roles
create extension if not exists citext;

create table if not exists public.ems_users (
  id uuid primary key default gen_random_uuid(),
  email citext not null unique,
  name text not null check (char_length(name) between 2 and 80),
  role text not null check (role in ('admin', 'editor', 'viewer')),
  password_hash text not null,
  active boolean not null default true,
  created_by uuid references public.ems_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_login_at timestamptz
);

create index if not exists ems_users_role_idx on public.ems_users (role);
alter table public.ems_users enable row level security;
revoke all on table public.ems_users from anon, authenticated;
grant select, insert, update, delete on table public.ems_users to service_role;

-- Atomic one-time installer: only the first account can claim Admin.
create or replace function public.bootstrap_ems_admin(
  p_email text,
  p_name text,
  p_password_hash text
)
returns setof public.ems_users
language plpgsql
security definer
set search_path = public
as $$
begin
  perform pg_advisory_xact_lock(hashtext('ems_admin_bootstrap'));
  if exists (select 1 from public.ems_users) then
    raise exception 'SETUP_ALREADY_COMPLETED';
  end if;

  return query
  insert into public.ems_users (email, name, role, password_hash)
  values (lower(trim(p_email))::citext, trim(p_name), 'admin', p_password_hash)
  returning *;
end;
$$;

revoke all on function public.bootstrap_ems_admin(text, text, text) from public, anon, authenticated;
grant execute on function public.bootstrap_ems_admin(text, text, text) to service_role;

