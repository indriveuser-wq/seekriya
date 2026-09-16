import { useEffect, useState } from "react";
import { fetchExamCountdown } from "../services/auth.service";
import { ExamCountdown } from "../types/auth.types";

export function useExamCountdown() {
  const [data, setData] = useState<ExamCountdown | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchExamCountdown()
      .then((result) => {
        if (mounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading };
}