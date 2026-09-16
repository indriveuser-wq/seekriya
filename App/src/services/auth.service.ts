import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { mockExamCountdown, mockUserProfile } from "../mocks/auth.mock";
import { ExamCountdown, LoginPayload, UserProfile } from "../types/auth.types";

const simulateLatency = (ms = 800) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function login(payload: LoginPayload): Promise<UserProfile> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return { ...mockUserProfile, role: payload.role };
  }

  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase.auth.signInWithPassword({
    phone: payload.identifier,
    password: payload.password,
  });

  if (error) throw new Error(error.message);

  const meta = (data.user?.user_metadata ?? {}) as Partial<UserProfile>;
  return {
    ...mockUserProfile,
    ...meta,
    id: data.user?.id ?? mockUserProfile.id,
    role: payload.role,
  };
}

export async function fetchExamCountdown(): Promise<ExamCountdown> {
  if (USE_MOCK_DATA) {
    await simulateLatency(400);
    return mockExamCountdown;
  }

  if (!supabase) return mockExamCountdown;

  const { data, error } = await supabase
    .from("exam_countdown")
    .select("days_to_exam, candidates_count, exam_title")
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return mockExamCountdown;

  return {
    daysToExam: data.days_to_exam,
    candidatesCount: data.candidates_count,
    examTitle: data.exam_title,
  };
}