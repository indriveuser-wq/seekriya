export type RowTone = "amber" | "blue" | "purple" | "gray" | "crimson";

export interface SettingsHeader {
  backLabel: string;
  statusChip: string;
  cockpitTag: string;
  cohortTag: string;
  title: string;
  subtitle: string;
}

export interface GpaLabel {
  label: string;
  active?: boolean;
}

export interface AcademicSection {
  title: string;
  rightLabel: string;
  gridTitle: string;
  gridSub: string;
  lockedChip: string;
  datumTitle: string;
  editLabel: string;
  datumValue: string;
  datumSub: string;
  daysChip: string;
  electivesLabel: string;
  changeLabel: string;
  electives: { code: string; name: string }[];
  gpaLabel: string;
  gpaValue: string;
  gpaFill: number;
  gpaLabels: GpaLabel[];
}

export type RowControl =
  | "button"
  | "toggle"
  | "icon"
  | "chevron"
  | "segment"
  | "storage"
  | "none";

export interface SettingRow {
  id: string;
  icon: string;
  iconTone: RowTone;
  title: string;
  titleTone?: "crimson";
  sub?: string;
  chip?: string;
  control: RowControl;
  controlLabel?: string;
  controlIcon?: string;
  controlIconTone?: RowTone;
  toggleDefault?: boolean;
  rightNote?: string;
  progress?: number;
}

export interface SettingsSectionModel {
  id: string;
  icon: string;
  iconTone: RowTone;
  title: string;
  rightLabel?: string;
  rows: SettingRow[];
}

export interface SettingsData {
  header: SettingsHeader;
  academic: AcademicSection;
  sections: SettingsSectionModel[];
  footerVersion: string;
  footerCompliance: string;
}