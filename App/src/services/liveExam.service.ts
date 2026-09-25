import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { isMissingRelationError } from "../lib/supabaseErrors";
import { mockLiveExam } from "../mocks/liveExam.mock";
import { LiveExamData } from "../types/liveExam.types";

const simulateLatency = (ms = 450) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchLiveExam(): Promise<LiveExamData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockLiveExam;
  }

  if (!supabase) return mockLiveExam;

  // Expects a `live_exams` view shaped like LiveExamData.
  const { data, error } = await supabase
    .from("live_exams")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (isMissingRelationError(error)) return mockLiveExam;
  if (error) throw new Error(error.message);
  if (!data) return mockLiveExam;

  return data as LiveExamData;
}