import { RichSegment } from "./topicNotes.types";

export interface InsightsMeta {
  hubLabel: string;
  batchChip: string;
  completedLabel: string;
  evaluatedLabel: string;
}

export interface ScoreHero {
  gradeChip: string;
  unitChip: string;
  title: string;
  subtitle: string;
  score: string;
  scoreTotal: string;
  standingLabel: string;
  standingValue: string;
  efficiencyLabel: string;
  efficiencyValue: string;
  objectiveLabel: string;
  objectiveValue: string;
  subjectiveLabel: string;
  subjectiveValue: string;
  targetLabel: string;
  gapLabel: string;
  provisionalTitle: string;
  provisionalSub: string;
  provisionalChip: string;
}

export interface GapCardModel {
  tag: string;
  title: string;
  segments: RichSegment[];
  freqLabel: string;
  freqNote: string;
}

export interface RubricItem {
  icon: string;
  tone: "blue" | "amber" | "crimson";
  title: string;
  body: string;
  score: string;
}

export interface SchemePoint {
  label: string;
  text: string;
  mono?: boolean;
}

export interface OtherQuestion {
  id: string;
  icon: string;
  tone: "blue" | "amber";
  title: string;
  sub: string;
  score: string;
  chip?: string;
}

export interface QuestionAudit {
  sectionTitle: string;
  sectionHint: string;
  qChip: string;
  groupChip: string;
  score: string;
  scoreNote: string;
  questionText: string;
  submittedTag: string;
  submittedChip: string;
  submittedText: string;
  submittedEquation: string;
  submittedNote: string;
  rubricTag: string;
  rubricItems: RubricItem[];
  schemeTag: string;
  schemeChip: string;
  schemePoints: SchemePoint[];
  teacherName: string;
  teacherBadge: string;
  teacherQuote: string;
  teacherAvatar: string;
  listenLabel: string;
  replyLabel: string;
}

export interface TestInsightsData {
  meta: InsightsMeta;
  hero: ScoreHero;
  gap: GapCardModel;
  audit: QuestionAudit;
  otherLabel: string;
  otherQuestions: OtherQuestion[];
  recovery: { title: string; sub: string; xp: string };
  actions: { id: string; icon: string; tone: "blue" | "purple"; title: string; sub: string }[];
}