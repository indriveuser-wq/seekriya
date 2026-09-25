-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Extends Supabase Auth)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role text check (role in ('student', 'teacher')) default 'student',
  full_name text,
  grade_label text,
  symbol_id text,
  avatar_url text,
  streak_days int default 0,
  xp int default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 2. SUBJECTS TABLE
create table if not exists public.subjects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  code text not null,
  type text check (type in ('compulsory', 'optional')),
  theory_marks int,
  practical_marks int,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 3. QUESTIONS TABLE (For Q-Bank & Drafts)
create table if not exists public.questions (
  id uuid default uuid_generate_v4() primary key,
  subject_id uuid references public.subjects(id) on delete cascade,
  chapter_title text,
  type text check (type in ('MCQ', 'Short', 'Long')),
  marks int,
  prompt text,
  rubric jsonb,
  status text check (status in ('draft', 'approved', 'archived')) default 'draft',
  created_by uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc', now())
);

-- 4. TEST RESULTS TABLE
create table if not exists public.test_results (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.profiles(id) on delete cascade,
  test_title text,
  score numeric,
  total_marks numeric,
  feedback text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 5. EXAM COUNTDOWN TABLE (Consumed by the app gateway/countdown card)
create table if not exists public.exam_countdown (
  id uuid default uuid_generate_v4() primary key,
  days_to_exam int not null,
  candidates_count int default 0,
  exam_title text not null,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 6. STUDENT DASHBOARDS (Optional denormalized payload consumed by the app)
create table if not exists public.student_dashboards (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.profiles(id) on delete cascade not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc', now()),
  unique (student_id)
);

-- 7. SUBJECTS DASHBOARDS (Optional denormalized payload consumed by the app)
create table if not exists public.subjects_dashboard (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.profiles(id) on delete cascade not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc', now()),
  unique (student_id)
);

-- 8. TEACHER CONTENT DRAFTS (Subjects, chapters, topics, notes, and questions)
create table if not exists public.content_items (
  id uuid default uuid_generate_v4() primary key,
  created_by uuid references public.profiles(id) on delete cascade not null,
  content_type text check (content_type in ('subject', 'chapter', 'topic', 'note', 'question')) not null,
  title text not null,
  parent_reference text,
  body text,
  status text check (status in ('draft', 'approved', 'archived')) default 'draft',
  created_at timestamp with time zone default timezone('utc', now())
);

-- 9. NOTES STUDIO READ MODEL (Optional teacher console payload)
create table if not exists public.notes_studio (
  id uuid default uuid_generate_v4() primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc', now())
);

-- ENABLE ROW LEVEL SECURITY (RLS)
alter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.questions enable row level security;
alter table public.test_results enable row level security;
alter table public.exam_countdown enable row level security;
alter table public.student_dashboards enable row level security;
alter table public.subjects_dashboard enable row level security;
alter table public.content_items enable row level security;
alter table public.notes_studio enable row level security;

-- Helper used by teacher-only policies without recursive profile policies.
create or replace function public.is_teacher()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'teacher'
  );
$$;

-- RLS POLICIES: require authentication and keep student data private.
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
drop policy if exists "Users can insert their own profile." on public.profiles;
drop policy if exists "Users can update own profile." on public.profiles;
drop policy if exists "Subjects are viewable by everyone." on public.subjects;
drop policy if exists "Questions are viewable by everyone." on public.questions;
drop policy if exists "Test results are viewable by everyone." on public.test_results;
drop policy if exists "Users can view own profile or teachers can view profiles." on public.profiles;
drop policy if exists "Authenticated users can view subjects." on public.subjects;
drop policy if exists "Authenticated users can view questions." on public.questions;
drop policy if exists "Teachers can manage questions." on public.questions;
drop policy if exists "Students can view own results and teachers can view results." on public.test_results;
drop policy if exists "Authenticated users can view exam countdown." on public.exam_countdown;
drop policy if exists "Students can view own dashboard." on public.student_dashboards;
drop policy if exists "Teachers can view student dashboards." on public.student_dashboards;
drop policy if exists "Students can view own subjects dashboard." on public.subjects_dashboard;
drop policy if exists "Teachers can view subjects dashboards." on public.subjects_dashboard;
drop policy if exists "Teachers can manage content drafts." on public.content_items;
drop policy if exists "Teachers can view notes studio." on public.notes_studio;

create policy "Users can view own profile or teachers can view profiles."
  on public.profiles for select
  using (auth.uid() = id or public.is_teacher());
create policy "Users can insert their own profile."
  on public.profiles for insert
  with check (auth.uid() = id);
create policy "Users can update own profile."
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Authenticated users can view subjects."
  on public.subjects for select
  using (auth.role() = 'authenticated');
create policy "Authenticated users can view questions."
  on public.questions for select
  using (auth.role() = 'authenticated');
create policy "Teachers can manage questions."
  on public.questions for all
  using (public.is_teacher())
  with check (public.is_teacher() and created_by = auth.uid());
create policy "Students can view own results and teachers can view results."
  on public.test_results for select
  using (student_id = auth.uid() or public.is_teacher());
create policy "Authenticated users can view exam countdown."
  on public.exam_countdown for select
  using (auth.role() = 'authenticated');
create policy "Students can view own dashboard."
  on public.student_dashboards for select
  using (student_id = auth.uid());
create policy "Teachers can view student dashboards."
  on public.student_dashboards for select
  using (public.is_teacher());
create policy "Students can view own subjects dashboard."
  on public.subjects_dashboard for select
  using (student_id = auth.uid());
create policy "Teachers can view subjects dashboards."
  on public.subjects_dashboard for select
  using (public.is_teacher());
create policy "Teachers can manage content drafts."
  on public.content_items for all
  using (public.is_teacher() and created_by = auth.uid())
  with check (public.is_teacher() and created_by = auth.uid());
create policy "Teachers can view notes studio."
  on public.notes_studio for select
  using (public.is_teacher());

-- AUTO-CREATE PROFILE ON SIGNUP
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, role, full_name, avatar_url)
  values (
    new.id,
    case
      when new.raw_user_meta_data->>'role' = 'teacher' then 'teacher'
      else 'student'
    end,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();