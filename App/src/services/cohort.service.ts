import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { mockCohort } from "../mocks/cohort.mock";
import { CohortData } from "../types/cohort.types";

const simulateLatency = (ms = 450) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchCohort(): Promise<CohortData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockCohort;
  }

  if (!supabase) return mockCohort;

  // Expects a `teacher_cohort` view shaped like CohortData.
  const { data, error } = await supabase
    .from("teacher_cohort")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return mockCohort;

  return data as CohortData;
}