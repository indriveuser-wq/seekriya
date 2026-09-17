import { TestsCenterData } from "../types/testsCenter.types";

export const mockTestsCenter: TestsCenterData = {
  header: {
    countdownChip: "T-12 DAYS: GRAND SCIENCE MOCK",
    vettedLabel: "CDC Vetted",
    title: "Summative Test Center",
    subtitle: "CDC Model Sets & Cumulative Evaluations",
  },
  hero: {
    tag: "ADAPTIVE ASSEMBLY",
    marksLabel: "50 MARKS",
    title: "Units 1 to 4 Cumulative Diagnostic",
    subtitle: "Physical & Chemical Sciences • Teacher Calibrated",
    note: "Dynamically synthesized from your completed chapters. 25 Qs • 45 Mins • 50 Marks total yield.",
    actionLabel: "Start Evaluation Now",
  },
  stats: [
    { label: "SIMULATED", value: "14", tone: "dark", footIcon: "check-circle", footLabel: "Pass 92%", footTone: "blue" },
    { label: "MEAN SCORE", value: "79.4", tone: "amber", footIcon: "trending-up", footLabel: "+4.2 GPA", footTone: "amber" },
    { label: "RANK TIER", value: "TOP 5%", tone: "purple", footPlain: "SEE Elite" },
  ],
  tabs: ["All Tests", "Cumulative", "CDC Model Sets", "Past Attempts"],
  cards: [
    {
      id: "cdc-model-set",
      statusChip: { label: "HIGH YIELD", tone: "purple" },
      categoryChip: { label: "Theory & Numerical", tone: "gray" },
      icon: "science",
      iconTone: "blue",
      title: "CDC Specification Model Set 2081",
      subtitle: "Compulsory Science • Curriculum Development Centre Authentic",
      meta: {
        hours: "3 Hours",
        marks: "75 Marks",
        rightChip: { label: "Ready to Attempt", tone: "blue" },
      },
      action: { label: "Launch Model Simulation", icon: "chevron", tone: "dark" },
    },
    {
      id: "math-mock-4",
      statusChip: { label: "MID-SPRINT", tone: "amber" },
      categoryChip: { label: "Sets, Algebra & Geom", tone: "gray" },
      icon: "functions",
      iconTone: "purple",
      title: "Compulsory Mathematics Mock IV",
      subtitle: "Focus: Circle Theorems, Trigonometry & Quadratic Proofs",
      meta: {
        hours: "2 Hours",
        marks: "50 Marks",
        rightChip: { label: "Ready", tone: "gray" },
      },
      action: { label: "Start Timed Session", icon: "chevron", tone: "dark" },
    },
    {
      id: "organic-sprint",
      statusChip: { label: "COMPLETED YESTERDAY", tone: "gray" },
      categoryChip: { label: "Unit 11", tone: "purple" },
      score: { value: "76", grade: "A", gradeTone: "blue" },
      title: "Organic Chemistry Unit Sprint",
      subtitle: "Hydrocarbons, Functional Groups & IUPAC Nomenclature",
      footnote: {
        left: "45 Mins • 25 Marks completed",
        right: { icon: "warning", label: "Review isomer proofs", tone: "amber" },
      },
      action: { label: "View Detailed Diagnostic", icon: "arrow", tone: "blue" },
    },
    {
      id: "force-pressure",
      statusChip: { label: "ATTEMPT LOGGED", tone: "gray" },
      categoryChip: { label: "Unit 1 & 2", tone: "purple" },
      score: { value: "88", grade: "A+", gradeTone: "amber" },
      title: "Force & Pressure Comprehensive",
      subtitle: "Archimedes Principle, Hydraulic Machines & Gravitation",
      footnote: {
        left: "Teacher calibrated grading verified",
        right: { icon: "verified-user", label: "Full Credit", tone: "blue" },
      },
      action: { label: "Review Script & Model Solution", icon: "eye", tone: "dark" },
    },
  ],
  moderation: {
    title: "Teacher Moderated Grading",
    badge: "Dual Check",
    body: "Subjective long-form questions are initially scored via SEE rubric AI and calibrated by your school teacher before final marks lock into your transcript.",
  },
  ascension: {
    tag: "ASCENSION PROTOCOL",
    title: "SEE Model Examination Readiness",
    percent: 82,
    verifiedLabel: "82% Verified",
  },
};