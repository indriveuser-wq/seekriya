import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { isMissingRelationError } from "../lib/supabaseErrors";
import { mockSettings } from "../mocks/settings.mock";
import { SettingsData } from "../types/settings.types";

const simulateLatency = (ms = 350) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchSettings(): Promise<SettingsData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockSettings;
  }

  if (!supabase) return mockSettings;

  // Expects a `app_settings` view shaped like SettingsData.
  const { data, error } = await supabase
    .from("app_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (isMissingRelationError(error)) return mockSettings;
  if (error) throw new Error(error.message);
  if (!data) return mockSettings;

  return data as SettingsData;
}