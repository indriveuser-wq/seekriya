import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { mockSubjectDetail } from "../mocks/subjectDetail.mock";
import { SubjectDetailData } from "../types/subjectDetail.types";

const simulateLatency = (ms = 450) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchSubjectDetail(subjectId: string): Promise<SubjectDetailData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockSubjectDetail;
  }

  if (!supabase) return mockSubjectDetail;

  // Expects a `subject_details` view keyed by subject id, shaped like SubjectDetailData.
  const { data, error } = await supabase
    .from("subject_details")
    .select("*")
    .eq("subject_id", subjectId)
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return mockSubjectDetail;

  return data as SubjectDetailData;
}