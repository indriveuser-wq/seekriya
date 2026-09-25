import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { isMissingRelationError } from "../lib/supabaseErrors";
import { mockTestsCenter } from "../mocks/testsCenter.mock";
import { TestsCenterData } from "../types/testsCenter.types";

const simulateLatency = (ms = 450) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchTestsCenter(): Promise<TestsCenterData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockTestsCenter;
  }

  if (!supabase) return mockTestsCenter;

  // Expects a `tests_center` view shaped like TestsCenterData.
  const { data, error } = await supabase
    .from("tests_center")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (isMissingRelationError(error)) return mockTestsCenter;
  if (error) throw new Error(error.message);
  if (!data) return mockTestsCenter;

  return data as TestsCenterData;
}