export interface TestsHeader {
  countdownChip: string;
  vettedLabel: string;
  title: string;
  subtitle: string;
}

export interface AdaptiveHero {
  tag: string;
  marksLabel: string;
  title: string;
  subtitle: string;
  note: string;
  actionLabel: string;
}

export interface TestsStat {
  label: string;
  value: string;
  tone: "dark" | "amber" | "purple";
  footIcon?: string;
  footLabel?: string;
  footTone?: "blue" | "amber";
  footPlain?: string;
}

export interface ChipModel {
  label: string;
  tone: "purple" | "amber" | "gray" | "blue";
}

export interface TestCardModel {
  id: string;
  statusChip: ChipModel;
  categoryChip: ChipModel;
  icon?: string;
  iconTone?: "blue" | "purple";
  score?: { value: string; grade: string; gradeTone: "blue" | "amber" };
  title: string;
  subtitle: string;
  meta?: { hours?: string; marks?: string; rightChip?: ChipModel };
  footnote?: { left?: string; right?: { icon: string; label: string; tone: "amber" | "blue" } };
  action: { label: string; icon: "chevron" | "arrow" | "eye"; tone: "dark" | "blue" };
}

export interface ModerationInfo {
  title: string;
  badge: string;
  body: string;
}

export interface AscensionInfo {
  tag: string;
  title: string;
  percent: number;
  verifiedLabel: string;
}

export interface TestsCenterData {
  header: TestsHeader;
  hero: AdaptiveHero;
  stats: TestsStat[];
  tabs: string[];
  cards: TestCardModel[];
  moderation: ModerationInfo;
  ascension: AscensionInfo;
}