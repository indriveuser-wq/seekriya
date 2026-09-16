import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchSubjects } from "../services/subjects.service";
import { Subject, SubjectCategoryKey, SubjectsData } from "../types/subjects.types";

export function useSubjects() {
  const [data, setData] = useState<SubjectsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<SubjectCategoryKey>("all");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchSubjects();
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load subjects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filteredSubjects = useMemo<Subject[]>(() => {
    if (!data) return [];
    if (activeCategory === "all") return data.subjects;
    return data.subjects.filter((s) => s.kind === activeCategory);
  }, [data, activeCategory]);

  return {
    data,
    loading,
    error,
    activeCategory,
    setActiveCategory,
    filteredSubjects,
    refresh: load,
  };
}