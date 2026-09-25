import { supabase } from "../lib/supabase";

export type AIAssistantAction =
  | "generate_content"
  | "explain_answer"
  | "reindex_module"
  | "curriculum_check";

export async function askAI<T>(input: {
  action: AIAssistantAction;
  contentType?: string;
  title?: string;
  context?: string;
}): Promise<T> {
  if (!supabase) {
    throw new Error("AI is unavailable until Supabase is configured.");
  }

  const { data, error } = await supabase.functions.invoke("ai-assistant", {
    body: input,
  });

  if (error) throw new Error(error.message);
  if (!data) throw new Error("AI returned an empty response.");
  return data as T;
}

export interface GeneratedContentDraft {
  title: string;
  body: string;
  parentReference?: string;
}

export interface AIExplanation {
  explanation: string;
}
