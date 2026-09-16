import { useCallback, useEffect, useState } from "react";
import { fetchTopicDrill } from "../services/topicDrill.service";
import { TopicDrillData } from "../types/topicDrill.types";

export function useTopicDrill(chapterId: string) {
  const [data, setData] = useState<TopicDrillData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchTopicDrill(chapterId);
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load topic drill");
    } finally {
      setLoading(false);
    }
  }, [chapterId]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}