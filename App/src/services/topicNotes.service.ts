import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { mockTopicNotes } from "../mocks/topicNotes.mock";
import { TopicNotesData } from "../types/topicNotes.types";

const simulateLatency = (ms = 450) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchTopicNotes(topicId: string): Promise<TopicNotesData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockTopicNotes;
  }

  if (!supabase) return mockTopicNotes;

  // Expects a `topic_notes` view keyed by topic id, shaped like TopicNotesData.
  const { data, error } = await supabase
    .from("topic_notes")
    .select("*")
    .eq("topic_id", topicId)
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return mockTopicNotes;

  return data as TopicNotesData;
}