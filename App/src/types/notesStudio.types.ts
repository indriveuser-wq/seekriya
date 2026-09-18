export interface NotesStudioHeader {
  appTitle: string;
  appSub: string;
  consoleChip: string;
}

export interface CurriculumSource {
  label: string;
  chip: string;
}

export interface ActiveCurriculum {
  title: string;
  unitsLabel: string;
  editionLabel: string;
  uploadLabel: string;
}

export interface VectorIndexStat {
  label: string;
  value: string;
  sub?: string;
  tone: "blue" | "red";
}

export interface VectorIndex {
  title: string;
  percent: string;
  syncChip: string;
  stats: VectorIndexStat[];
  footer: string;
}

export interface ModuleCardModel {
  id: string;
  unitTag: string;
  timeOrStatus: { label: string; tone: "gray" | "red" | "green"; icon?: string };
  title: string;
  statusBox?: {
    title: string;
    percent: string;
    body: string;
    tone: "blue" | "red";
  };
  description?: string;
  footerInfo: string;
  footerRight?: string;
  buttons: { label: string; tone: "blue" | "purple" | "outline" | "dark-blue"; icon?: string }[];
  extraIcon?: string;
}

export interface AlignmentCardModel {
  title: string;
  sub: string;
  buttonLabel: string;
  buttonSub: string;
}

export interface NotesStudioData {
  header: NotesStudioHeader;
  source: CurriculumSource;
  curriculum: ActiveCurriculum;
  vectorIndex: VectorIndex;
  searchPlaceholder: string;
  tabs: string[];
  sectionTitle: string;
  sortLabel: string;
  modules: ModuleCardModel[];
  alignment: AlignmentCardModel;
}