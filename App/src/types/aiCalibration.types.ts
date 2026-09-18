export interface AIBoxDetection {
  label: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface OCRInfo {
  isActive: boolean;
  detections: AIBoxDetection[];
  notes: string[];
}

export interface StudentInfo {
  name: string;
  initials: string;
  rollNumber: string;
  school: string;
  timestamp: string;
}

export interface QuestionInfo {
  number: number;
  maxMarks: number;
  text: string;
}

export interface AIConfidence {
  percentage: number;
  requiresSignoff: boolean;
  warning: string;
}

export interface CalibrationItem {
  id: number;
  title: string;
  chemicalEquation?: string;
  catalyst?: string;
  aiStatus: "confirmed" | "provisional" | "note";
  aiScore?: { current: number; max: number };
  aiMatch?: string;
  teacherAdjustment?: {
    from: number;
    to: number;
    delta: number;
    reason?: string;
  };
  flag?: {
    text: string;
    type: "warning" | "error";
  };
  aiNote?: string;
  maxMarks: number;
  currentMarks: number;
}

export interface TeacherFeedback {
  text: string;
  hasVoiceDictation: boolean;
}

export interface FinalMark {
  originalAI: number;
  calibrated: number;
  maxMarks: number;
}

export interface AICalibrationData {
  headerTitle: string;
  headerSubtitle: string;
  auditBadge: string;
  reviewCount: string;
  student: StudentInfo;
  question: QuestionInfo;
  aiConfidence: AIConfidence;
  ocrInfo: OCRInfo;
  submissionImage: string;
  criteriaTitle: string;
  criteriaCount: string;
  calibrationItems: CalibrationItem[];
  teacherFeedback: TeacherFeedback;
  finalMark: FinalMark;
  confirmLabel: string;
  reevaluateLabel: string;
}