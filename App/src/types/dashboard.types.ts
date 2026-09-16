export interface ReadinessStat {
  masteryPercent: number;
  trackLabel: string;
  subjectsActive: string;
  subjectsActiveSub: string;
  accuracyAvg: string;
}

export interface ContinueLesson {
  id: string;
  subject: string;
  weightage: string;
  title: string;
  topic: string;
  completionPercent: number;
  timeLeft: string;
}

export interface AttentionItem {
  id: string;
  tag: string;
  subject: string;
  title: string;
  accuracyPercent: number;
  weightage: string;
}

export type MissionIconKey = "notes" | "brain" | "replay";
export type MissionActionStyle = "soft-blue" | "solid-blue" | "soft-amber";

export interface Mission {
  id: string;
  title: string;
  metaLeft: string;
  metaRight: string;
  actionLabel: string;
  iconKey: MissionIconKey;
  actionStyle: MissionActionStyle;
}

export interface Achievement {
  id: string;
  label: string;
  title: string;
  xp: number;
}

export interface SocialProofPeer {
  initial: string;
  color: string;
}

export interface SocialProof {
  count: number;
  label: string;
  peers: SocialProofPeer[];
}

export interface HomeDashboardData {
  greeting: string;
  studentName: string;
  subtitle: string;
  countdownLabel: string;
  streakDays: number;
  xp: number;
  levelLabel: string;
  readiness: ReadinessStat;
  continueLesson: ContinueLesson;
  attention: AttentionItem;
  missionsCount: number;
  missions: Mission[];
  achievement: Achievement;
  socialProof: SocialProof;
}