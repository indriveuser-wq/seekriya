export interface TopicDrillHero {
  deckCode: string;
  sectorLabel: string;
  chapterChip: string;
  weightageChip: string;
  title: string;
  subtitle: string;
  masteryPercent: number;
  stars: number;
  starsTotal: number;
  milestoneLabel: string;
  rankDelta: string;
}

export type SortieTone = "learn" | "drill" | "test" | "master";

export interface SortieStep {
  key: string;
  label: string;
  sub: string;
  icon: string;
  tone: SortieTone;
  active?: boolean;
}

export interface InFlightTopic {
  tag: string;
  title: string;
  meta: string;
  actionLabel: string;
}

export interface IntelSegment {
  text: string;
  highlight?: boolean;
}

export interface BoardIntel {
  title: string;
  groupChip: string;
  segments: IntelSegment[];
}

export type MatrixTone = "blue" | "purple" | "red";

export interface PracticeMatrix {
  id: string;
  title: string;
  sub: string;
  icon: string;
  tone: MatrixTone;
  badge?: boolean;
  subTone?: "gray" | "red";
}

export type ModuleState = "done" | "active" | "next";

export interface FlightModule {
  id: string;
  title: string;
  sub: string;
  state: ModuleState;
  subTone?: "gray" | "blue";
  actionLabel: string;
}

export interface SprintInfo {
  title: string;
  sub: string;
  actionLabel: string;
}

export interface TopicDrillData {
  headerTitle: string;
  headerSubtitle: string;
  hero: TopicDrillHero;
  pathTitle: string;
  phaseLabel: string;
  steps: SortieStep[];
  inFlight: InFlightTopic;
  intel: BoardIntel;
  matricesTitle: string;
  matricesSettingsLabel: string;
  matrices: PracticeMatrix[];
  notesTitle: string;
  modulesCountLabel: string;
  curatorLabel: string;
  modules: FlightModule[];
  sprint: SprintInfo;
}