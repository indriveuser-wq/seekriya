import { useCallback, useEffect, useState } from "react";
import { fetchHomeDashboard } from "../services/dashboard.service";
import { HomeDashboardData } from "../types/dashboard.types";

export function useHomeDashboard() {
  const [data, setData] = useState<HomeDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchHomeDashboard();
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}