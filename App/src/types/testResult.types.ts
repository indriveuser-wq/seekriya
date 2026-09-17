export interface TestResultHero {
  modelChip: string;
  subjectChip: string;
  title: string;
  score: number;
  scoreTotal: string;
  aggregateLabel: string;
  gradeLabel: string;
  topValue: string;
  topMiddle: string;
  xpLabel: string;
}

export interface TallyDot {
  color: string;
  count: number;
}

export interface ResultStatBox {
  key: "objective" | "subjective" | "duration" | "tally";
  label: string;
  icon: string;
  iconTone: "blue" | "purple" | "amber" | "dark";
  value: string;
  valueSuffix?: string;
  progress?: number;
  progressLabel?: string;
  footText?: string;
  footTone?: "blue" | "purple" | "gray";
  tally?: { dots: TallyDot[]; summary: string };
}

export interface DiagnosticCardModel {
  icon: string;
  iconTone: "crimson" | "amber";
  tag: string;
  chip?: string;
  title: string;
  body: string;
}

export interface SubjectiveAudit {
  sectionTitle: string;
  evalLabel: string;
  groupLabel: string;
  question: string;
  score: string;
  scoreTotal: string;
  aiPill: string;
  strengthsTag: string;
  strengthsBody: string;
  missingTag: string;
  missingBody: string;
}

export interface TestResultData {
  hero: TestResultHero;
  stats: ResultStatBox[];
  diagnosticsTitle: string;
  diagnostics: DiagnosticCardModel[];
  audit: SubjectiveAudit;
  practiceLabel: string;
  practiceChip: string;
  reviewLabel: string;
}