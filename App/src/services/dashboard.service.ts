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

  // The dashboard is optional while the backend is being provisioned.
  const { data, error } = await supabase
    .from("student_dashboards")
    .select("payload")
    .limit(1)
    .maybeSingle();

  if (error) {
    // PostgREST returns 404/42P01 when the optional relation is not deployed yet.
    if (error.code === "42P01" || error.code === "PGRST205") {
      return mockDashboard;
    }
    throw new Error(error.message);
  }
  if (!data?.payload) return mockDashboard;

  return data.payload as HomeDashboardData;
}