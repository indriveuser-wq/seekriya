export interface ProfileStat {
  icon: string;
  iconKind: "icon" | "emoji";
  tone: "purple" | "amber" | "blue";
  label: string;
  value: string;
}

export interface ProfileHero {
  name: string;
  levelBadge: string;
  roleLabel: string;
  rankLabel: string;
  rankValue: string;
  avatarUrl: string;
  stats: ProfileStat[];
}

export interface TrajectoryStep {
  icon: string;
  tone: "blue" | "purple" | "gray";
  label: string;
  sub: string;
}

export interface Trajectory {
  telemetryTag: string;
  daysChip: string;
  daysSub: string;
  title: string;
  centerPercent: string;
  centerLabel: string;
  gpaPill: string;
  steps: TrajectoryStep[];
}

export interface DiagBox {
  value: string;
  icon: string;
  tone: "blue" | "amber" | "crimson";
  label: string;
}

export interface Vulnerability {
  code: string;
  title: string;
  acc: string;
}

export interface Diagnostics {
  title: string;
  totalLabel: string;
  boxes: DiagBox[];
  vulnTitle: string;
  vulnChip: string;
  vulnerabilities: Vulnerability[];
  recoveryLabel: string;
}

export interface CommandSubject {
  code: string;
  tone: "blue" | "amber" | "purple";
  title: string;
  sub: string;
  percent: number;
  chip: string;
  mockLabel: string;
  strengthLabel: string;
}

export interface MiniSubject {
  title: string;
  percent: string;
  tone: "blue" | "amber";
  sub: string;
}

export interface VelocityBar {
  day: string;
  value: number;
  color: string;
}

export interface Velocity {
  tag: string;
  title: string;
  trendLabel: string;
  total: string;
  totalSub: string;
  bars: VelocityBar[];
}

export interface BadgeModel {
  emoji?: string;
  icon?: string;
  locked?: boolean;
  rightLabel: string;
  rightTone: "amber" | "dark" | "blue" | "gray";
  title: string;
  sub: string;
  footer: "claimed" | "bar" | "locked";
  barPercent?: number;
}

export interface ProgressData {
  profile: ProfileHero;
  trajectory: Trajectory;
  diagnostics: Diagnostics;
  deckTitle: string;
  deckLink: string;
  subjects: CommandSubject[];
  minis: MiniSubject[];
  expandLabel: string;
  velocity: Velocity;
  badgesTitle: string;
  badgesCount: string;
  badges: BadgeModel[];
  generateLabel: string;
  exportLabel: string;
}