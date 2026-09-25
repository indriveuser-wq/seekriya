import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { isMissingRelationError } from "../lib/supabaseErrors";
import { mockPracticeDrill } from "../mocks/practiceDrill.mock";
import { PracticeDrillData } from "../types/practiceDrill.types";

const simulateLatency = (ms = 450) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchPracticeDrill(): Promise<PracticeDrillData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockPracticeDrill;
  }

  if (!supabase) return mockPracticeDrill;

  // Expects a `practice_drills` view shaped like PracticeDrillData.
  const { data, error } = await supabase
    .from("practice_drills")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (isMissingRelationError(error)) return mockPracticeDrill;
  if (error) throw new Error(error.message);
  if (!data) return mockPracticeDrill;

  return data as PracticeDrillData;
}