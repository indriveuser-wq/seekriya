import { LiveExamData, QuestionState } from "../types/liveExam.types";

const QUESTION_STATES: Record<number, QuestionState> = {
  4: "review",
  8: "blank",
  10: "blank",
  12: "current",
  22: "blank",
  25: "blank",
};

export const mockLiveExam: LiveExamData = {
  header: {
    liveTag: "LIVE SUMMATIVE",
    title: "Unit 3: Physical & Chemical",
    timer: "01:14:19",
    finishLabel: "Finish",
    indexLabel: "INDEX",
    indexChip: "Q 12 / 25",
    legend: [
      { key: "done", label: "Done" },
      { key: "review", label: "Review" },
      { key: "blank", label: "Blank" },
    ],
    questions: Array.from({ length: 25 }, (_, i) => ({
      n: i + 1,
      state: QUESTION_STATES[i + 1] ?? "done",
    })),
  },
  question: {
    groupChip: "GROUP C",
    marksChip: "3 MARKS",
    subjectChip: "Science",
    reviewLaterLabel: "Review Later",
    text: "Explain why ethyne undergoes addition reactions more readily than ethene. Write a balanced chemical equation for the catalytic hydrogenation of ethyne into ethane.",
    rubric:
      "Rubric: 1.5 marks for electronic bond structure explanation + 1.5 marks for complete equation.",
  },
  editor: {
    typeTab: "Type Answer",
    scanTab: "Scan Sheet",
    autosavedLabel: "Draft Autosaved",
    insertLabel: "INSERT:",
    symbols: ["≡", "=", "→", "⇌", "₂", "₃", "₄", "Δ", "π", "σ"],
    draft:
      "Ethyne contains a carbon-carbon triple bond comprising one σ (sigma) bond and two π (pi) bonds. The higher cylindrical electron cloud density and the exposed nature of the two π bonds make it more susceptible to electrophilic addition compared to ethene, which has only one π bond.\n\nCatalytic Hydrogenation Equation:\nC₂H₂ + 2H₂ ⎯(Ni/Δ)⎯→ C₂H₆",
    wordsLabel: "54 words • 332 chars",
    formatLabel: "Formatting OK",
    flagLabel: "Flag for second pass verification",
    resetLabel: "Reset Draft",
  },
  scanSheet: {
    title: "Snap physical answer page",
    subtitle: "Capture clearly using camera or attach existing snapshots of Question 12 sheet.",
    cameraLabel: "Launch Camera",
    galleryLabel: "Gallery",
    attachment: {
      name: "Q12_Scan_Sheet_1.jpg",
      meta: "1.4 MB • Auto-enhanced",
      chip: "Ready for review",
    },
  },
  stats: [
    { label: "TOPIC WEIGHT", value: "18%", footLabel: "Organic Chem", footTone: "purple" },
    { label: "AVG CLASS TIME", value: "4m 15s", footLabel: "High Value", footTone: "blue" },
  ],
  nav: {
    prevLabel: "Q 11",
    nextLabel: "Next Question (Q13)",
  },
  submit: {
    title: "Submit Assessment?",
    body: "You have answered 21 of 25 questions. 4 remain unvisited or flagged for review.",
    stats: [
      { value: "20", label: "Done", tone: "blue" },
      { value: "1", label: "Flagged", tone: "amber" },
      { value: "4", label: "Left", tone: "gray" },
    ],
    confirmLabel: "Yes, Submit Test",
    cancelLabel: "Return to Exam",
  },
};