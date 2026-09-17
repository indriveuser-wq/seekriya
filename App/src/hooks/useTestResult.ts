import { useCallback, useEffect, useState } from "react";
import { fetchTestResult } from "../services/testResult.service";
import { TestResultData } from "../types/testResult.types";

export function useTestResult(resultId: string) {
  const [data, setData] = useState<TestResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchTestResult(resultId);
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load test result");
    } finally {
      setLoading(false);
    }
  }, [resultId]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}