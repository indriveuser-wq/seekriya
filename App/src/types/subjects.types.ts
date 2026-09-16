export type SubjectCategoryKey = "all" | "compulsory" | "optional";

export interface SubjectCategory {
  key: SubjectCategoryKey;
  label: string;
  count: number;
}

export type SubjectStatus =
  | "board-ready"
  | "needs-drill"
  | "distinction"
  | "on-schedule"
  | "high-level"
  | "high-mastery";

export interface SubjectStatusMeta {
  label: string;
  color: string;
  bg: string;
  display: "pill" | "text";
}

export type SecondaryTone = "amber" | "gray" | "purple";

export interface Subject {
  id: string;
  name: string;
  subtitle: string;
  subtitleNe?: string;
  kind: "compulsory" | "optional";
  status: SubjectStatus;
  accent: string;
  secondaryTone: SecondaryTone;
  progressLabel: string;
  progressValue: number;
  activeIcon: string;
  activeTopics: string;
  secondaryStat: string;
  cdcCode: string;
  isElective?: boolean;
  electiveNote?: string;
  showSwitch?: boolean;
}

export interface SyllabusCountdown {
  daysLeft: number;
  overallPercent: number;
  title: string;
  subtitle: string;
  activeLoadLabel: string;
  activeLoadValue: string;
  chaptersReadyLabel: string;
  chaptersReadyValue: string;
  targetPaceLabel: string;
  targetPaceValue: string;
}

export interface SubjectsData {
  countdown: SyllabusCountdown;
  categories: SubjectCategory[];
  subjects: Subject[];
  routineNote: string;
  routineVerifiedFor: string;
}