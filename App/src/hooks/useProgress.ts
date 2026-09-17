import { useCallback, useEffect, useState } from "react";
import { fetchProgress } from "../services/progress.service";
import { ProgressData } from "../types/progress.types";

export function useProgress() {
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchProgress();
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load progress");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}