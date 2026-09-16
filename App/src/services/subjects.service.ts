import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { mockSubjects } from "../mocks/subjects.mock";
import { SubjectsData } from "../types/subjects.types";

const simulateLatency = (ms = 450) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchSubjects(): Promise<SubjectsData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockSubjects;
  }

  if (!supabase) return mockSubjects;

  const { data, error } = await supabase
    .from("subjects_dashboard")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return mockSubjects;

  return data as SubjectsData;
}