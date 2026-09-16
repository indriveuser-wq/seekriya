export interface HeroStat {
  label: string;
  value: string;
  suffix?: string;
  sub?: string;
  tone: "dark" | "amber" | "blue";
}

export interface SubjectHero {
  cdcCode: string;
  coreLabel: string;
  trackLabel: string;
  name: string;
  nameNe: string;
  masteryPercent: number;
  doneLabel: string;
  stats: HeroStat[];
}

export interface UnitTab {
  key: string;
  label: string;
}

export type StatTone = "dark" | "blue" | "amber" | "crimson";

export interface ChapterStat {
  label: string;
  value: string;
  tone: StatTone;
}

export interface ChapterStatusChip {
  label: string;
  tone: "blue" | "crimson" | "amber";
  icon?: "check" | "warning";
}

export interface ChapterAction {
  label: string;
  style: "primary" | "purple" | "soft";
  icon?: "arrow" | "bolt";
}

export interface TeacherNote {
  title: string;
  quote: string;
}

export interface Chapter {
  id: string;
  unit: string;
  chapterChip: string;
  marksLabel?: string;
  statusChip: ChapterStatusChip;
  marksChip?: string;
  title: string;
  subtitle: string;
  teacherNote?: TeacherNote;
  statsStyle: "box" | "row";
  stats: ChapterStat[];
  progressPercent?: number;
  progressColor?: string;
  footnote?: string;
  action: ChapterAction;
  accent: "blue" | "crimson" | "none";
}

export interface BoardMock {
  tag: string;
  title: string;
  subtitle: string;
  duration: string;
  actionLabel: string;
}

export interface SubjectDetailData {
  hero: SubjectHero;
  units: UnitTab[];
  prioritizeLabel: string;
  chapters: Chapter[];
  boardMock: BoardMock;
}