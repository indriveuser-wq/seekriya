import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { mockTeacher } from "../mocks/teacher.mock";
import { TeacherData } from "../types/teacher.types";

const simulateLatency = (ms = 450) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchTeacherDashboard(): Promise<TeacherData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockTeacher;
  }

  if (!supabase) return mockTeacher;

  // Expects a `teacher_dashboard` view shaped like TeacherData.
  const { data, error } = await supabase
    .from("teacher_dashboard")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return mockTeacher;

  return data as TeacherData;
}