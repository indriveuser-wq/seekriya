import { useCallback, useEffect, useState } from "react";
import { fetchCohort } from "../services/cohort.service";
import { CohortData } from "../types/cohort.types";

export function useCohort() {
  const [data, setData] = useState<CohortData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchCohort();
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load cohort");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}