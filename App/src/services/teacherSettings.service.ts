import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { isMissingRelationError } from "../lib/supabaseErrors";
import { mockTeacherSettings } from "../mocks/teacherSettings.mock";
import { TeacherSettingsData } from "../types/teacherSettings.types";

const simulateLatency = (ms = 350) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchTeacherSettings(): Promise<TeacherSettingsData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockTeacherSettings;
  }

  if (!supabase) return mockTeacherSettings;

  const { data, error } = await supabase
    .from("teacher_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (isMissingRelationError(error)) return mockTeacherSettings;
  if (error) throw new Error(error.message);
  if (!data) return mockTeacherSettings;

  return data as TeacherSettingsData;
}