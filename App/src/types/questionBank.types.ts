export interface QuestionBankHeaderInfo {
  appTitle: string;
  consoleBadge: string;
}
export interface UnifiedTitle {
  title: string;
  gradeChip: string;
  subtitle: string;
}

export interface TabItem {
  label: string;
  count?: number;
  key: string;
}

export interface ModerationCard {
  title: string;
  badge: string;
  subtitle: string;
}

export interface ImageAsset {
  url: string;
  caption: string;
}

export interface RubricItem {
  number: number;
  title: string;
  description: string;
  marks: string;
}

export interface DraftCard {
  draftNumber: string;
  subject: string;
  chapter: string;
  marks: string;
  bloomLevel: string;
  questionPrompt: string;
  nepaliViewAvailable: boolean;
  reference: string;
  images: ImageAsset[];
  rubricTitle: string;
  rubricTotal: string;
  rubricItems: RubricItem[];
  syllabusMatch: string;
  zeroHallucinations: boolean;
  deployOptions: {
    practiceSets: boolean;
    diagnostics: boolean;
    mock2081: boolean;
  };
}

export interface ApprovedQuestion {
  id: string;
  type: string;
  marks: string;
  subject: string;
  chapter: string;
  prompt: string;
  usedInTests: number;
  successRate: number;
}

export interface QuestionBankData {
  header: QuestionBankHeader;
  title: UnifiedTitle;
  tabs: TabItem[];
  moderation: ModerationCard;
  draft: DraftCard;
  approvedTitle: string;
  approvedCount: string;
  approvedFilters: TabItem[];
  approvedQuestions: ApprovedQuestion[];
  exportLabel: string;
}