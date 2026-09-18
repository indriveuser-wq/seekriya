-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Extends Supabase Auth)
create table public.profiles (
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
create table public.subjects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  code text not null,
  type text check (type in ('compulsory', 'optional')),
  theory_marks int,
  practical_marks int,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 3. QUESTIONS TABLE (For Q-Bank & Drafts)
create table public.questions (
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
create table public.test_results (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.profiles(id) on delete cascade,
  test_title text,
  score numeric,
  total_marks numeric,
  feedback text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- ENABLE ROW LEVEL SECURITY (RLS)
alter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.questions enable row level security;
alter table public.test_results enable row level security;

-- RLS POLICIES (Allow authenticated users to read data)
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

create policy "Subjects are viewable by everyone." on public.subjects for select using (true);
create policy "Questions are viewable by everyone." on public.questions for select using (true);
create policy "Test results are viewable by everyone." on public.test_results for select using (true);

-- AUTO-CREATE PROFILE ON SIGNUP
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();