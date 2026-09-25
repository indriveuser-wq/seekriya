import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { isMissingRelationError } from "../lib/supabaseErrors";
import { mockNotesStudio } from "../mocks/notesStudio.mock";
import { NotesStudioData } from "../types/notesStudio.types";

const simulateLatency = (ms = 400) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchNotesStudio(): Promise<NotesStudioData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockNotesStudio;
  }

  if (!supabase) return mockNotesStudio;

  const { data, error } = await supabase
    .from("notes_studio")
    .select("payload")
    .limit(1)
    .maybeSingle();

  if (isMissingRelationError(error)) return mockNotesStudio;
  if (error) throw new Error(error.message);
  if (!data) return mockNotesStudio;

  return (data?.payload ?? data) as NotesStudioData;
}