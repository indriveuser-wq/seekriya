import { useCallback, useEffect, useState } from "react";
import { fetchPracticeDrill } from "../services/practiceDrill.service";
import { PracticeDrillData } from "../types/practiceDrill.types";

export function usePracticeDrill() {
  const [data, setData] = useState<PracticeDrillData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchPracticeDrill();
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load practice drill");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}