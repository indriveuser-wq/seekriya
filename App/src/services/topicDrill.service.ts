import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { isMissingRelationError } from "../lib/supabaseErrors";
import { mockTopicDrill } from "../mocks/topicDrill.mock";
import { TopicDrillData } from "../types/topicDrill.types";

const simulateLatency = (ms = 450) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchTopicDrill(chapterId: string): Promise<TopicDrillData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockTopicDrill;
  }

  if (!supabase) return mockTopicDrill;

  // Expects a `topic_drills` view keyed by chapter id, shaped like TopicDrillData.
  const { data, error } = await supabase
    .from("topic_drills")
    .select("*")
    .eq("chapter_id", chapterId)
    .limit(1)
    .maybeSingle();

  if (isMissingRelationError(error)) return mockTopicDrill;
  if (error) throw new Error(error.message);
  if (!data) return mockTopicDrill;

  return data as TopicDrillData;
}