import { useCallback, useEffect, useState } from "react";
import { fetchQuestionBank } from "../services/questionBank.service";
import { QuestionBankData } from "../types/questionBank.types";

export function useQuestionBank() {
  const [data, setData] = useState<QuestionBankData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchQuestionBank();
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load question bank");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}