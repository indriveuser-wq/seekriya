import { useCallback, useEffect, useState } from "react";
import { fetchTestInsights } from "../services/testInsights.service";
import { TestInsightsData } from "../types/testInsights.types";

export function useTestInsights(testId: string) {
  const [data, setData] = useState<TestInsightsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchTestInsights(testId);
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load test insights");
    } finally {
      setLoading(false);
    }
  }, [testId]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}