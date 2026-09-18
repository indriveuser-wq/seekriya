import { useCallback, useEffect, useState } from "react";
import { fetchTeacherSettings } from "../services/teacherSettings.service";
import { TeacherSettingsData } from "../types/teacherSettings.types";

export function useTeacherSettings() {
  const [data, setData] = useState<TeacherSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchTeacherSettings();
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load teacher settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}