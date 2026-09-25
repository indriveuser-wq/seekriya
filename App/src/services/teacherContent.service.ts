import { supabase } from "../lib/supabase";
import { isMissingRelationError } from "../lib/supabaseErrors";

export type TeacherContentKind = "Subject" | "Chapter" | "Topic" | "Note" | "Question";

export interface TeacherContentItem {
  id: string;
  content_type: Lowercase<TeacherContentKind>;
  title: string;
  parent_reference: string | null;
  body: string | null;
  status: "draft" | "approved" | "archived";
  created_at: string;
}

export async function saveTeacherContent(input: {
  kind: TeacherContentKind;
  title: string;
  parent?: string;
  body?: string;
}): Promise<"saved" | "local"> {
  if (!supabase) return "local";

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Sign in as a teacher before saving content.");

  const { error } = await supabase.from("content_items").insert({
    created_by: userData.user.id,
    content_type: input.kind.toLowerCase(),
    title: input.title.trim(),
    parent_reference: input.parent?.trim() || null,
    body: input.body?.trim() || null,
    status: "draft",
  });

  if (isMissingRelationError(error)) return "local";
  if (error) throw new Error(error.message);
  return "saved";
}

export async function fetchTeacherContent(): Promise<TeacherContentItem[]> {
  if (!supabase) return [];

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from("content_items")
    .select("id, content_type, title, parent_reference, body, status, created_at")
    .eq("created_by", userData.user.id)
    .order("created_at", { ascending: false });

  if (isMissingRelationError(error)) return [];
  if (error) throw new Error(error.message);
  return (data ?? []) as TeacherContentItem[];
}
