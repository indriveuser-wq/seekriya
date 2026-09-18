import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { mockAICalibration } from "../mocks/aiCalibration.mock";
import { AICalibrationData } from "../types/aiCalibration.types";

const simulateLatency = (ms = 400) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchAICalibration(
  paperId: string
): Promise<AICalibrationData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockAICalibration;
  }

  if (!supabase) return mockAICalibration;

  const { data, error } = await supabase
    .from("ai_calibration")
    .select("*")
    .eq("paper_id", paperId)
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return mockAICalibration;

  return data as AICalibrationData;
}