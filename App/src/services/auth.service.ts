import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { mockUserProfile } from "../mocks/auth.mock";
import { ExamCountdown, LoginPayload, UserProfile } from "../types/auth.types";
import { UserRole } from "../types/auth.types";

const simulateLatency = (ms = 800) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function login(payload: LoginPayload): Promise<UserProfile> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return { ...mockUserProfile, role: payload.role };
  }

  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
  });

  if (error) throw new Error(error.message);

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, full_name, grade_label, symbol_id, avatar_url, streak_days, is_active")
    .eq("id", data.user?.id ?? "")
    .maybeSingle();

  if (profile?.role && profile.role !== payload.role) {
    throw new Error(`This account is registered as a ${profile.role}. Select the matching account type.`);
  }

  const meta = (data.user?.user_metadata ?? {}) as Partial<UserProfile>;
  return {
    ...mockUserProfile,
    ...profile,
    fullName: profile?.full_name ?? meta.fullName ?? mockUserProfile.fullName,
    gradeLabel: profile?.grade_label ?? meta.gradeLabel ?? mockUserProfile.gradeLabel,
    symbolId: profile?.symbol_id ?? meta.symbolId ?? mockUserProfile.symbolId,
    avatarUrl: profile?.avatar_url ?? meta.avatarUrl ?? mockUserProfile.avatarUrl,
    streakDays: profile?.streak_days ?? meta.streakDays ?? mockUserProfile.streakDays,
    isActive: profile?.is_active ?? meta.isActive ?? mockUserProfile.isActive,
    id: data.user?.id ?? mockUserProfile.id,
    role: profile?.role ?? payload.role,
  };
}

export async function requestPasswordReset(email: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  if (USE_MOCK_DATA) {
    await simulateLatency(400);
    return;
  }

  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail);
  if (error) throw new Error(error.message);
}

export async function registerAccount({
  fullName,
  email,
  password,
  role,
}: {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}): Promise<{ needsEmailConfirmation: boolean }> {
  if (USE_MOCK_DATA) {
    await simulateLatency(500);
    return { needsEmailConfirmation: false };
  }

  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: { data: { full_name: fullName.trim(), role } },
  });

  if (error) {
    if (error.status === 429) {
      throw new Error("Too many signup attempts. Please wait a few minutes before trying again.");
    }
    throw new Error(error.message);
  }
  return { needsEmailConfirmation: !data.session };
}

export async function fetchExamCountdown(): Promise<ExamCountdown | null> {
  if (USE_MOCK_DATA) {
    await simulateLatency(400);
    return null;
  }

  if (!supabase) return null;

  const { data, error } = await supabase
    .from("exam_countdown")
    .select("days_to_exam, candidates_count, exam_title")
    .limit(1)
    .maybeSingle();

  if (error) return null;
  if (!data) return null;

  return {
    daysToExam: data.days_to_exam,
    candidatesCount: data.candidates_count,
    examTitle: data.exam_title,
  };
}