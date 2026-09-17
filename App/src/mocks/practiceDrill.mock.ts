import { PracticeDrillData } from "../types/practiceDrill.types";

export const mockPracticeDrill: PracticeDrillData = {
  stats: {
    subjectChip: "COMPULSORY SCIENCE",
    marksChip: "2 Marks • Medium",
    timer: "01:24",
    questionIndex: 4,
    totalQuestions: 10,
    streak: 3,
    xpBonus: "+50 XP bonus",
  },
  question: {
    chapterChip: "CH. HYDROCARBONS & COMPOUNDS",
    text: "Which of the following hydrocarbons undergoes an addition reaction with bromine water and decolorizes it?",
    sourceLabel: "SEE Board Curriculum • Organic Reactions Diagnostic",
    options: [
      { key: "A", title: "Methane", formula: "CH₄ • Saturated Alkane", state: "idle" },
      { key: "B", title: "Ethane", formula: "C₂H₆ • Saturated Alkane", state: "idle" },
      {
        key: "C",
        title: "Ethene",
        formula: "C₂H₄ • Unsaturated Alkene (C=C)",
        state: "selected",
        selectedChip: "SELECTED",
      },
      { key: "D", title: "Propane", formula: "C₃H₈ • Saturated Alkane", state: "idle" },
    ],
  },
  feedback: {
    titleLine1: "Target Acquired!",
    titleLine2: "Correct 🎉",
    xpLine: "+20 Mastery XP Recorded",
    cohortLabel: "88% SEE Cohort Solved",
    rationaleTag: "Authoritative Curriculum Rationale",
    rationaleSegments: [
      { text: "Ethene (C₂H₄)", tone: "dark", bold: true },
      { text: " is an unsaturated hydrocarbon containing a reactive double bond " },
      { text: "(C=C)", tone: "blue" },
      { text: ". It readily undergoes an addition reaction with reddish-brown bromine water to form colorless " },
      { text: "1,2-dibromoethane", tone: "dark", italic: true },
      { text: ", resulting in prompt decolorization. Saturated alkanes (methane, ethane, propane) only undergo slow substitution under direct sunlight." },
    ],
    highTag: "HIGH PROBABILITY SEE QUESTION (GROUP B)",
    highBody:
      "Bromine water decolorization is frequently tested as the laboratory chemical test to distinguish alkanes from alkenes.",
    equationLabel: "Reaction Equation",
    equationImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbcZbI0lIIeLUDvs6NVKQZJQJLF3rVIpoXCSIRYGBYdJtSO9JHHKIu9KlTW9IPPPDrZ7ogHTjoFgDAcrefhZ0U3MzrJneBIuo2o9cIhrEL9STVVoX-8eoKn5VT7ADvKwGDYVwInfOk5EhIOO1np9El0FwRUwVgBsSbFt2xy7qUxr5YtkX7Tt5Jmfbpt40Y_uRYTVutMRUhYdYqeHGKIGG53HvXjsM2syYF2A6UyEsLmIrRiCm84Us",
    equationParts: [
      { text: "C₂H₄", tone: "blue" },
      { text: " + ", tone: "gray" },
      { text: "Br₂", tone: "amber" },
      { text: " → ", tone: "gray" },
      { text: "CH₂Br-CH₂Br", tone: "blue" },
    ],
    equationChip: "Decolorized",
  },
  explainLabel: "Explain Concept ✨",
  savedLabel: "Saved to Drills",
  nextLabel: "NEXT QUESTION",
  targetPrefix: "Target: Complete 10 questions to unlock ",
  targetHighlight: "Hydrocarbons Mastery Badge",
    copilot: {
    title: "Arohan AI Copilot",
    quote:
      '"Remember the mnemonic: Alkenes \'Add\', Alkanes \'Substitute\'. Double bonds open their arms to welcome halogen guests without kicking out existing hydrogen atoms!"',
    chips: ["NEB Syllabus Aligned", "Instant Audio Note Available"],
  },
};