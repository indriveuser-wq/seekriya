import { useCallback, useEffect, useState } from "react";
import { fetchTopicNotes } from "../services/topicNotes.service";
import { TopicNotesData } from "../types/topicNotes.types";

export function useTopicNotes(topicId: string) {
  const [data, setData] = useState<TopicNotesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchTopicNotes(topicId);
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load topic notes");
    } finally {
      setLoading(false);
    }
  }, [topicId]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}