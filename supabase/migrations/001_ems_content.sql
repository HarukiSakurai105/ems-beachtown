-- EMS Beach Town: persistent content and audit history
create table if not exists public.ems_content (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.ems_content_history (
  id uuid primary key,
  saved_at timestamptz not null default now(),
  actor_email text not null,
  actor_name text not null,
  actor_role text not null check (actor_role in ('admin', 'editor', 'viewer')),
  version text not null,
  summary text not null
);

create index if not exists ems_content_history_saved_at_idx
  on public.ems_content_history (saved_at desc);

alter table public.ems_content enable row level security;
alter table public.ems_content_history enable row level security;

-- Browser clients receive no direct access. The Next.js backend uses a
-- Supabase secret/service-role key and performs authorization before writes.
revoke all on table public.ems_content from anon, authenticated;
revoke all on table public.ems_content_history from anon, authenticated;
grant select, insert, update, delete on table public.ems_content to service_role;
grant select, insert, update, delete on table public.ems_content_history to service_role;

