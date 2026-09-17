import { useCallback, useEffect, useState } from "react";
import { fetchTestsCenter } from "../services/testsCenter.service";
import { TestsCenterData } from "../types/testsCenter.types";

export function useTestsCenter() {
  const [data, setData] = useState<TestsCenterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchTestsCenter();
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load test center");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}