import { RichSegment } from "./topicNotes.types";

export interface DrillStats {
  subjectChip: string;
  marksChip: string;
  timer: string;
  questionIndex: number;
  totalQuestions: number;
  streak: number;
  xpBonus: string;
}

export interface DrillOption {
  key: string;
  title: string;
  formula: string;
  state: "idle" | "selected";
  selectedChip?: string;
}

export interface DrillQuestion {
  chapterChip: string;
  text: string;
  sourceLabel: string;
  options: DrillOption[];
}

export interface EquationPart {
  text: string;
  tone: "blue" | "amber" | "gray";
}

export interface DrillFeedback {
  titleLine1: string;
  titleLine2: string;
  xpLine: string;
  cohortLabel: string;
  rationaleTag: string;
  rationaleSegments: RichSegment[];
  highTag: string;
  highBody: string;
  equationLabel: string;
  equationImageUrl: string;
  equationParts: EquationPart[];
  equationChip: string;
}

export interface PracticeDrillData {
  stats: DrillStats;
  question: DrillQuestion;
  feedback: DrillFeedback;
  explainLabel: string;
  savedLabel: string;
  nextLabel: string;
  targetPrefix: string;
  targetHighlight: string;
    copilot: CopilotInfo;
}

export interface CopilotInfo {
  title: string;
  quote: string;
  chips: string[];
}