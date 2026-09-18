import { useCallback, useEffect, useState } from "react";
import { fetchAICalibration } from "../services/aiCalibration.service";
import { AICalibrationData } from "../types/aiCalibration.types";

export function useAICalibration(paperId: string) {
  const [data, setData] = useState<AICalibrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchAICalibration(paperId);
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load AI calibration");
    } finally {
      setLoading(false);
    }
  }, [paperId]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}