import { useCallback, useEffect, useState } from "react";
import { fetchLiveExam } from "../services/liveExam.service";
import { LiveExamData } from "../types/liveExam.types";

export function useLiveExam() {
  const [data, setData] = useState<LiveExamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchLiveExam();
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load live exam");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}