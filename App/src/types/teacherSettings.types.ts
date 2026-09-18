export interface TeacherSettingsHeaderInfo {
  appTitle: string;
  gradeChip: string;
  screenTitle: string;
}

export interface TeacherProfile {
  avatarUrl: string;
  cdcId: string;
  roleChip: string;
  name: string;
  position: string;
  school: string;
  pedagogyYears: string;
  pedagogyLabel: string;
  candidatesCount: string;
  candidatesLabel: string;
  terminalStatus: string;
}

export interface StatCard {
  id: string;
  icon: string;
  iconTone: "blue" | "purple" | "amber" | "gray";
  label: string;
  value: string;
  sub?: string;
  progress?: number;
}

export interface CurriculumItem {
  title: string;
  subtitle: string;
  chip: string;
  chipTone: "blue" | "gray";
}

export interface CurriculumAuthority {
  title: string;
  rightLabel: string;
  items: CurriculumItem[];
  registryLabel: string;
  registryValue: string;
}

export interface AIStudioConfig {
  title: string;
  engineChip: string;
  bloomLabel: string;
  bloomValue: string;
  bloomSub: string;
  modeLabel: string;
  thresholdLabel: string;
  thresholdValue: string;
  thresholdPercent: number;
  thresholdNote: string;
  rubricLabel: string;
  rubricSub: string;
  rubricDefault: boolean;
  bilingualLabel: string;
  bilingualSub: string;
  bilingualDefault: boolean;
}

export interface EvaluationConfig {
  title: string;
  answerModeLabel: string;
  answerModeSub: string;
  diagramLabel: string;
  diagramSub: string;
  diagramChip: string;
  guardianLabel: string;
  guardianSub: string;
  guardianChip: string;
}

export interface InstitutionalItem {
  id: string;
  icon: string;
  title: string;
  sub: string;
  actionIcon: string;
}

export interface TeacherSettingsData {
  header: TeacherSettingsHeader;
  profile: TeacherProfile;
  stats: StatCard[];
  curriculum: CurriculumAuthority;
  aiStudio: AIStudioConfig;
  evaluation: EvaluationConfig;
  institutional: InstitutionalItem[];
  terminateLabel: string;
  footerBuild: string;
}