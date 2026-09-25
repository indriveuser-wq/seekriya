import { USE_MOCK_DATA } from "../constants/config";
import { supabase } from "../lib/supabase";
import { isMissingRelationError } from "../lib/supabaseErrors";
import { mockTeacher } from "../mocks/teacher.mock";
import { TeacherData } from "../types/teacher.types";

const simulateLatency = (ms = 450) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchTeacherDashboard(): Promise<TeacherData> {
  if (USE_MOCK_DATA) {
    await simulateLatency();
    return mockTeacher;
  }

  if (!supabase) return mockTeacher;

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) throw new Error("Sign in as a teacher to view the dashboard.");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role, full_name, grade_label, avatar_url")
    .eq("id", authData.user.id)
    .maybeSingle();

  if (profileError) throw new Error(profileError.message);
  if (profile?.role !== "teacher") throw new Error("This account is not registered as a teacher.");

  const { data: content, error: contentError } = await supabase
    .from("content_items")
    .select("id, content_type, title, parent_reference, body, status, created_at")
    .eq("created_by", authData.user.id)
    .order("created_at", { ascending: false });

  if (contentError && !isMissingRelationError(contentError)) throw new Error(contentError.message);

  const drafts = (content ?? []).filter((item) => item.status === "draft").map((item) => ({
    id: item.id,
    draftChip: `Teacher Draft • ${item.content_type}`,
    marksLabel: item.content_type === "question" ? "Question draft" : "Curriculum draft",
    specLabel: "Awaiting moderation",
    questionSegments: [{ text: item.title, tone: "dark" as const, bold: true }],
    schemeTag: "CONTENT DRAFT",
    schemeTotal: item.parent_reference ?? "No parent reference",
    items: item.body ? [{ text: item.body, marks: "Draft" }] : [],
    rejectLabel: "Remove",
    editLabel: "Edit",
    approveLabel: "Open",
  }));

  return {
    tabs: ["Content Studio", "Curriculum", "Analytics"],
    profile: {
      name: profile.full_name ?? authData.user.email ?? "Teacher",
      roleChip: "EXAMINER",
      subtitle: profile.grade_label ?? "Teacher workspace",
      avatarUrl: profile.avatar_url ?? "",
      badgeLabel: "TEACHER",
      cohortLabel: "Saved drafts",
      cohortValue: String(drafts.length),
      cohortSub: "items",
      cohortFoot: "from Supabase",
      targetLabel: "Content status",
      targetValue: drafts.length ? "Drafts" : "Ready",
      targetProgress: drafts.length ? 50 : 0,
      qaLabel: "Pending review",
      qaValue: String(drafts.length).padStart(2, "0"),
      qaSub: "drafts",
      qaFoot: "in queue",
    },
    calibration: {
      title: "AI Evaluation Calibration",
      chip: "Live data required",
      thumbUrl: "",
      studentName: "No pending script",
      score: "-",
      topic: "Calibration data will appear here.",
      note: "Connect an evaluation record to begin review.",
      actionLabel: "Open calibration",
    },
    studio: {
      title: "AI Question Studio",
      subtitle: "Generate curriculum drafts with the configured AI provider.",
      engineLabel: "AI READY",
      subjectLabel: "Subject",
      subjectValue: "Choose in Content Studio",
      standardLabel: "Standard",
      standardValue: "CDC Grade 10",
      bloomChip: "Draft",
      focusLabel: "Focus Unit / Chapter",
      focusValue: "Choose a content type",
      changeLabel: "Change",
      patternLabel: "Pattern Distribution",
      patternValue: "Teacher selected",
      patterns: ["MCQ (1M)", "Short (2M)", "Long (4M)"],
      defaultPattern: "Long (4M)",
      generateLabel: "Generate with AI",
    },
    queueTitle: "Saved Content Drafts",
    queueHint: "Live from Supabase",
    drafts,
    vetted: { title: "Teacher workspace", sub: "Content is stored in content_items." },
  };
}