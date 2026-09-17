import { useCallback, useEffect, useState } from "react";
import { fetchTeacherDashboard } from "../services/teacher.service";
import { TeacherData } from "../types/teacher.types";

export function useTeacherDashboard() {
  const [data, setData] = useState<TeacherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchTeacherDashboard();
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load teacher dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}