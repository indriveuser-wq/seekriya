import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { mockQuestionBank } from "../mocks/questionBank.mock";
import { QuestionBankData } from "../types/questionBank.types";

const simulateLatency = (ms = 400) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchQuestionBank(): Promise<QuestionBankData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockQuestionBank;
  }

  if (!supabase) return mockQuestionBank;

  const { data, error } = await supabase
    .from("question_bank")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return mockQuestionBank;

  return data as QuestionBankData;
}