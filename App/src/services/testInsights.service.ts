import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { isMissingRelationError } from "../lib/supabaseErrors";
import { mockTestInsights } from "../mocks/testInsights.mock";
import { TestInsightsData } from "../types/testInsights.types";

const simulateLatency = (ms = 450) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchTestInsights(testId: string): Promise<TestInsightsData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockTestInsights;
  }

  if (!supabase) return mockTestInsights;

  // Expects a `test_insights` view keyed by test id, shaped like TestInsightsData.
  const { data, error } = await supabase
    .from("test_insights")
    .select("*")
    .eq("test_id", testId)
    .limit(1)
    .maybeSingle();

  if (isMissingRelationError(error)) return mockTestInsights;
  if (error) throw new Error(error.message);
  if (!data) return mockTestInsights;

  return data as TestInsightsData;
}