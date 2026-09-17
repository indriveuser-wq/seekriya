export type Tone = "blue" | "amber" | "gray" | "crimson" | "dark";

export interface RichSegment {
  text: string;
  tone?: Tone;
  bold?: boolean;
  italic?: boolean;
}

export interface TopicAuthor {
  name: string;
  roleChip: string;
  subtitle: string;
  avatarUrl: string;
}

export interface TopicNotesMeta {
  chapterChip: string;
  topicLabel: string;
  durationLabel: string;
  gradeChip: string;
  yieldChip: string;
  title: string;
  author: TopicAuthor;
}

export interface MetricColumn {
  title: string;
  titleTone: Tone;
  formula?: string;
  sub?: string;
  body?: string;
  chip?: string;
  chipTone?: "gray" | "amber";
  icon?: string;
}

export interface MetricModel {
  label: string;
  kind: "formula" | "reactivity" | "combustion";
  columns: MetricColumn[];
}

export interface SchematicData {
  label: string;
  equation: string;
  left: { formula: string; name: string; chip: string };
  middle: { reagent: string; reagentSub: string; instant?: string };
  right: { formula: string; name: string; result: string };
  caption: string;
}

export interface LabData {
  imageUrl: string;
  tag: string;
  title: string;
  body: string;
}

export interface TopicNotesData {
  headerTitle: string;
  headerSubtitle: string;
  meta: TopicNotesMeta;
  section1Title: string;
  section1Paragraph: string;
  definitionTag: string;
  definitionSegments: RichSegment[];
  section2Title: string;
  section2Hint: string;
  metrics: MetricModel[];
  section3Title: string;
  section3Chip: string;
  schematic: SchematicData;
  lab: LabData;
  boardTipTitle: string;
  boardTipSegments: RichSegment[];
  boardTipQuote: string;
  understood: { title: string; sub: string; toggleLabel: string };
  cta: { label: string; duration: string; xp: string };
}

export interface RichSegment {
  text: string;
  tone?: Tone;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}