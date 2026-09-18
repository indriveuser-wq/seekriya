import { useCallback, useEffect, useState } from "react";
import { fetchNotesStudio } from "../services/notesStudio.service";
import { NotesStudioData } from "../types/notesStudio.types";

export function useNotesStudio() {
  const [data, setData] = useState<NotesStudioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchNotesStudio();
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load notes studio");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}