import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { isMissingRelationError } from "../lib/supabaseErrors";
import { mockTestResult } from "../mocks/testResult.mock";
import { TestResultData } from "../types/testResult.types";

const simulateLatency = (ms = 450) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchTestResult(resultId: string): Promise<TestResultData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockTestResult;
  }

  if (!supabase) return mockTestResult;

  // Expects a `test_results` view keyed by result id, shaped like TestResultData.
  const { data, error } = await supabase
    .from("test_results")
    .select("*")
    .eq("result_id", resultId)
    .limit(1)
    .maybeSingle();

  if (isMissingRelationError(error)) return mockTestResult;
  if (error) throw new Error(error.message);
  if (!data) return mockTestResult;

  return data as TestResultData;
}