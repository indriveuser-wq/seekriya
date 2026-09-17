import { useCallback, useEffect, useState } from "react";
import { fetchSettings } from "../services/settings.service";
import { SettingsData } from "../types/settings.types";

export function useSettings() {
  const [data, setData] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchSettings();
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}