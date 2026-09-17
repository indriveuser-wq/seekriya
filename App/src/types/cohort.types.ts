export interface CohortHeader {
  appTitle: string;
  appSub: string;
  consoleChip: string;
}

export interface CohortSelector {
  activeChip: string;
  liveChip: string;
  title: string;
  sub: string;
  horizonTag: string;
  horizonValue: string;
  distLabel: string;
  distValue: string;
}

export interface StatChip {
  label: string;
  tone: "purple" | "green" | "crimson";
  icon?: string;
}

export interface CohortStat {
  id: string;
  icon: string;
  iconTone: "blue" | "purple" | "amber" | "crimson";
  chip?: StatChip;
  label: string;
  value: string;
  valueTone: "dark" | "amber" | "crimson";
  sub?: string;
  subTone?: "gray" | "amber";
  progress?: number;
  badge?: boolean;
}

export interface Bottleneck {
  chip: string;
  title: string;
  thresholdLabel: string;
  thresholdValue: string;
  progress: number;
  note: string;
  actionLabel: string;
}

export interface Hotspot {
  id: string;
  icon: string;
  subjectChip: string;
  acc: string;
  title: string;
  sub: string;
}

export interface StudentCardModel {
  id: string;
  name: string;
  avatarUrl: string;
  levelChip: string;
  extraChip?: { label: string; tone: "purple" | "blue-solid" };
  badge: { text: string; tone: "crimson" | "amber" | "blue" };
  actionChip?: string;
  statValue: string;
  statTone: "crimson" | "blue";
  middleIcon?: string;
  middleLabel?: string;
  tail?: string;
  tailTone?: "crimson" | "amber" | "gray";
  flag?: { text: string; action: string };
  footer?: { text: string; action: string };
}

export interface RhythmBar {
  day: string;
  height: number;
  color: string;
  dot?: boolean;
}

export interface CohortData {
  header: CohortHeader;
  selector: CohortSelector;
  stats: CohortStat[];
  diagnosticsTitle: string;
  diagnosticsHint: string;
  bottleneck: Bottleneck;
  hotspots: Hotspot[];
  telemetryTitle: string;
  telemetrySub: string;
  telemetryChip: string;
  filters: string[];
  students: StudentCardModel[];
  rhythm: {
    tag: string;
    chip: string;
    total: string;
    bars: RhythmBar[];
    peakNote: string;
    participation: string;
  };
  ptm: { title: string; sub: string; buttonLabel: string };
  snackbar: string;
}