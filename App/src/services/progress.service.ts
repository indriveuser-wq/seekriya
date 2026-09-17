import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { mockProgress } from "../mocks/progress.mock";
import { ProgressData } from "../types/progress.types";

const simulateLatency = (ms = 450) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchProgress(): Promise<ProgressData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockProgress;
  }

  if (!supabase) return mockProgress;

  // Expects a `student_progress` view shaped like ProgressData.
  const { data, error } = await supabase
    .from("student_progress")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return mockProgress;

  return data as ProgressData;
}