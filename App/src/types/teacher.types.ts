import { RichSegment } from "./topicNotes.types";

export interface TeacherProfile {
  name: string;
  roleChip: string;
  subtitle: string;
  avatarUrl: string;
  badgeLabel: string;
  cohortLabel: string;
  cohortValue: string;
  cohortSub: string;
  cohortFoot: string;
  targetLabel: string;
  targetValue: string;
  targetProgress: number;
  qaLabel: string;
  qaValue: string;
  qaSub: string;
  qaFoot: string;
}

export interface CalibrationCardModel {
  title: string;
  chip: string;
  thumbUrl: string;
  studentName: string;
  score: string;
  topic: string;
  note: string;
  actionLabel: string;
}

export interface StudioConfig {
  title: string;
  subtitle: string;
  engineLabel: string;
  subjectLabel: string;
  subjectValue: string;
  standardLabel: string;
  standardValue: string;
  bloomChip: string;
  focusLabel: string;
  focusValue: string;
  changeLabel: string;
  patternLabel: string;
  patternValue: string;
  patterns: string[];
  defaultPattern: string;
  generateLabel: string;
}

export interface MarkingItem {
  text: string;
  marks: string;
}

export interface DraftCardModel {
  id: string;
  draftChip: string;
  marksLabel: string;
  specLabel: string;
  questionSegments: RichSegment[];
  schemeTag: string;
  schemeTotal: string;
  items: MarkingItem[];
  rejectLabel: string;
  editLabel: string;
  approveLabel: string;
}

export interface TeacherData {
  tabs: string[];
  profile: TeacherProfile;
  calibration: CalibrationCardModel;
  studio: StudioConfig;
  queueTitle: string;
  queueHint: string;
  drafts: DraftCardModel[];
  vetted: { title: string; sub: string };
}