export type QuestionState = "done" | "review" | "blank" | "current";

export interface LiveExamHeader {
  liveTag: string;
  title: string;
  timer: string;
  finishLabel: string;
  indexLabel: string;
  indexChip: string;
  legend: { key: QuestionState; label: string }[];
  questions: { n: number; state: QuestionState }[];
}

export interface LiveQuestion {
  groupChip: string;
  marksChip: string;
  subjectChip: string;
  reviewLaterLabel: string;
  text: string;
  rubric: string;
}

export interface AnswerEditor {
  typeTab: string;
  scanTab: string;
  autosavedLabel: string;
  insertLabel: string;
  symbols: string[];
  draft: string;
  wordsLabel: string;
  formatLabel: string;
  flagLabel: string;
  resetLabel: string;
}

export interface ScanAttachment {
  name: string;
  meta: string;
  chip: string;
}

export interface ScanSheet {
  title: string;
  subtitle: string;
  cameraLabel: string;
  galleryLabel: string;
  attachment: ScanAttachment;
}

export interface LiveStat {
  label: string;
  value: string;
  footLabel: string;
  footTone: "purple" | "blue";
}

export interface ExamNavBar {
  prevLabel: string;
  nextLabel: string;
}

export interface SubmitModalInfo {
  title: string;
  body: string;
  stats: { value: string; label: string; tone: "blue" | "amber" | "gray" }[];
  confirmLabel: string;
  cancelLabel: string;
}

export interface LiveExamData {
  header: LiveExamHeader;
  question: LiveQuestion;
  editor: AnswerEditor;
  scanSheet: ScanSheet;
  stats: LiveStat[];
  nav: ExamNavBar;
  submit: SubmitModalInfo;
}