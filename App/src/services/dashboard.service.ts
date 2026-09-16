import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { mockDashboard } from "../mocks/dashboard.mock";
import { HomeDashboardData } from "../types/dashboard.types";

const simulateLatency = (ms = 500) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchHomeDashboard(): Promise<HomeDashboardData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockDashboard;
  }

  if (!supabase) return mockDashboard;

  // Expects a `student_dashboards` table/view shaped like HomeDashboardData.
  const { data, error } = await supabase
    .from("student_dashboards")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return mockDashboard;

  return data as HomeDashboardData;
}