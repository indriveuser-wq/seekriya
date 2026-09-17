import { TestResultData } from "../types/testResult.types";

export const mockTestResult: TestResultData = {
  hero: {
    modelChip: "SEE MODEL 2081",
    subjectChip: "Physical & Chemical Sciences",
    title: "Unit 3 Summative Exam",
    score: 76,
    scoreTotal: "/100",
    aggregateLabel: "76% AGGREGATE",
    gradeLabel: "Grade: A (Very Good)",
    topValue: "15%",
    topMiddle: "among SEE Aspirants •",
    xpLabel: "+180 XP",
  },
  stats: [
    {
      key: "objective",
      label: "OBJECTIVE (MCQ)",
      icon: "fact-check",
      iconTone: "blue",
      value: "36",
      valueSuffix: "/ 40",
      progress: 90,
      progressLabel: "90%",
    },
    {
      key: "subjective",
      label: "SUBJECTIVE",
      icon: "history-edu",
      iconTone: "purple",
      value: "40",
      valueSuffix: "/ 60",
      footText: "AI & Teacher provisional",
      footTone: "purple",
    },
    {
      key: "duration",
      label: "DURATION",
      icon: "timer",
      iconTone: "amber",
      value: "2h 14m",
      footText: "Allocated: 3h 00m",
      footTone: "gray",
    },
    {
      key: "tally",
      label: "TALLY",
      icon: "tune",
      iconTone: "dark",
      value: "",
      tally: {
        dots: [
          { color: "#1B74E4", count: 28 },
          { color: "#C0182B", count: 6 },
          { color: "#9AA1B0", count: 2 },
        ],
        summary: "28 Won • 6 Miss • 2 Skip",
      },
    },
  ],
  diagnosticsTitle: "Exam Target Diagnostics",
  diagnostics: [
    {
      icon: "priority-high",
      iconTone: "crimson",
      tag: "CRITICAL WEAKNESS",
      chip: "42% Accuracy",
      title: "Organic Reaction Conditions",
      body: "High frequency SEE topic. Frequent confusion on catalytic temperatures in Alkane/Alkene synthesis.",
    },
    {
      icon: "speed",
      iconTone: "amber",
      tag: "TIME STRATEGY WARNING",
      title: "Pacing on 4-Mark Structured Questions",
      body: "You spent an average of 14 mins per long item (recommended: 8 mins). Practice structured diagram templates.",
    },
  ],
  audit: {
    sectionTitle: "Key Subjective Audit",
    evalLabel: "Q. 18 Evaluation",
    groupLabel: "GROUP D • CHEMISTRY",
    question:
      '"Describe the laboratory preparation of Methane gas with balanced chemical equation."',
    score: "3.5",
    scoreTotal: "/ 5.0",
    aiPill: "AI EVALUATED • VERIFIED BY RAMESH SIR",
    strengthsTag: "Strengths Noted",
    strengthsBody:
      "Correct balanced chemical reaction (CH₃COONa + NaOH → Na₂CO₃ + CH₄↑) and clean labeled apparatus schematic.",
    missingTag: "Missing Mark Concept (-1.5)",
    missingBody:
      "Forgot to mention collection mechanism: gas is collected over water by downward displacement due to low solubility.",
  },
  practiceLabel: "Practice Weak Areas Now",
  practiceChip: "12 Drills",
  reviewLabel: "Review Full Answer Sheet & Marking Scheme",
};