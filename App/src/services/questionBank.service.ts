import { USE_MOCK_DATA, USE_REMOTE_QUESTION_BANK } from "../constants/config";
import { supabase } from "../lib/supabase";
import { isMissingRelationError } from "../lib/supabaseErrors";
import { mockQuestionBank } from "../mocks/questionBank.mock";
import { QuestionBankData } from "../types/questionBank.types";

const simulateLatency = (ms = 400) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchQuestionBank(): Promise<QuestionBankData> {
  if (USE_MOCK_DATA || !USE_REMOTE_QUESTION_BANK) {
    await simulateLatency();
    return mockQuestionBank;
  }

  if (!supabase) return mockQuestionBank;

  const { data, error } = await supabase
    .from("question_bank")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (isMissingRelationError(error)) return mockQuestionBank;
  if (error) throw new Error(error.message);
  if (!data) return mockQuestionBank;

  return data as QuestionBankData;
}