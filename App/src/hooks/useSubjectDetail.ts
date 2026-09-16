import { useCallback, useEffect, useState } from "react";
import { fetchSubjectDetail } from "../services/subjectDetail.service";
import { SubjectDetailData } from "../types/subjectDetail.types";

export function useSubjectDetail(subjectId: string) {
  const [data, setData] = useState<SubjectDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchSubjectDetail(subjectId);
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load subject detail");
    } finally {
      setLoading(false);
    }
  }, [subjectId]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}