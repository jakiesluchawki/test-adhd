-- Production direction only. Do not apply without a privacy and security review.

create type public.user_role as enum ('client', 'psychologist', 'admin');
create type public.assignment_status as enum ('assigned', 'in_progress', 'completed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null,
  display_name text not null,
  created_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references public.profiles(id) on delete cascade,
  psychologist_id uuid not null references public.profiles(id),
  reference_code text unique not null,
  created_at timestamptz not null default now()
);

create table public.test_definitions (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  version text not null,
  licensed boolean not null default false,
  schema jsonb not null,
  created_at timestamptz not null default now()
);

create table public.assignments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  test_id uuid not null references public.test_definitions(id),
  status public.assignment_status not null default 'assigned',
  assigned_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (client_id, test_id)
);

create table public.responses (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  question_key text not null,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  unique (assignment_id, question_key)
);

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.test_definitions enable row level security;
alter table public.assignments enable row level security;
alter table public.responses enable row level security;

create policy "profile reads self"
on public.profiles for select
using (id = auth.uid());

create policy "client reads own client record"
on public.clients for select
using (user_id = auth.uid());

create policy "psychologist reads assigned clients"
on public.clients for select
using (psychologist_id = auth.uid());

create policy "authenticated users read active test definitions"
on public.test_definitions for select
to authenticated
using (true);

create policy "client reads own assignments"
on public.assignments for select
using (
  exists (
    select 1 from public.clients
    where clients.id = assignments.client_id
      and clients.user_id = auth.uid()
  )
);

create policy "psychologist reads assigned assignments"
on public.assignments for select
using (
  exists (
    select 1 from public.clients
    where clients.id = assignments.client_id
      and clients.psychologist_id = auth.uid()
  )
);

create policy "client manages own responses"
on public.responses for all
using (
  exists (
    select 1
    from public.assignments
    join public.clients on clients.id = assignments.client_id
    where assignments.id = responses.assignment_id
      and clients.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.assignments
    join public.clients on clients.id = assignments.client_id
    where assignments.id = responses.assignment_id
      and clients.user_id = auth.uid()
  )
);

create policy "psychologist reads assigned responses"
on public.responses for select
using (
  exists (
    select 1
    from public.assignments
    join public.clients on clients.id = assignments.client_id
    where assignments.id = responses.assignment_id
      and clients.psychologist_id = auth.uid()
  )
);
