import { QuestionBankData } from "../types/questionBank.types";

export const mockQuestionBank: QuestionBankData = {
  header: {
    appTitle: "Arohan SEE",
    consoleBadge: "TEACHER CONSOLE",
  },
  title: {
    title: "Unified Question Bank",
    gradeChip: "Grade 10 SEE",
    subtitle:
      "Central review studio for AI generation, syllabus tagging, and question publishing.",
  },
  tabs: [
    { label: "Draft Review", count: 4, key: "draft" },
    { label: "Approved Bank", count: 142, key: "approved" },
    { label: "Archived", key: "archived" },
  ],
  moderation: {
    title: "Human-in-the-Loop Moderation",
    badge: "Active",
    subtitle:
      "AI Drafts synthesized from Ramesh Sir's Unit 12 & Unit 5 Lecture Notes. Verify CDC rubric before publishing to student tests.",
  },
  draft: {
    draftNumber: "AI Draft #104",
    subject: "Compulsory Science",
    chapter: "Ch. 12 Hydrocarbons",
    marks: "4 Marks (Grp C)",
    bloomLevel: "Bloom IV (Analytical)",
    questionPrompt:
      "Explain why unsaturated hydrocarbons are significantly more reactive than saturated hydrocarbons. Write the IUPAC structural formula of Ethyne and mention one essential industrial application of it.",
    nepaliViewAvailable: true,
    reference: "Teacher Note Ch.12 Topic 4 (Saturated vs Unsaturated)",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAcLM4ADHUXSxOBng-Nit_c2vPnZfkgVrO0vuQ4HolPT9DqvJNzZAWJ1KaN1bAW4KOPMAvMYjvMlN_8kJzLY3A6TTYe-2RCfy-BGehypeo7XXXkDYACFYe-YHGXGTwF7eVxqBlYDt_mpPFAx-jjlI5PPj6IwHk9I0PEtLSsnWOmikXBZBLBOPTed6vTqbQnAQnlyplpm7FlA3CN3cy5igLgTuMGuHjse2vGW3Mj9DS6UEcByEu3h4",
        caption: "Bond Geometry",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz-SZup8Na2BTT7UQRXyZYHXHHplRPLruKXBEtYR7YRNt7ULBGEwLGE3XS7ai4JRqT_wJWiUqckt2ehyHS7vn_QEPimSCB1W7kMlDmNU_ajcppYjYU5BFYlefDEruqiSoJyq6_401-qhytrXq0NhrRUU79CYnHyg90ekuv6VxHM92KDXBJH9wQksRkJcHjAmyR8oMyW_UQydBuCy76noXsWvD_itht_cRUlEQ8vvdFxIMDupTXYW0",
        caption: "Industrial Usage Context",
      },
    ],
    rubricTitle: "CDC Official Marking Rubric",
    rubricTotal: "4.0 Marks Total",
    rubricItems: [
      {
        number: 1,
        title: "Bond Reactivity Basis",
        description:
          "Identification of presence of weak pi (π) bonds in unsaturated vs strong sigma (σ) bonds in saturated hydrocarbons.",
        marks: "1.0 M",
      },
      {
        number: 2,
        title: "Electron Cloud Instability",
        description:
          "Comparative reasoning: exposed π-electron density makes unsaturated compounds prone to electrophilic addition.",
        marks: "1.5 M",
      },
      {
        number: 3,
        title: "Structural Formula & Application",
        description:
          "Accurate formula H-C≡C-H (0.75M) + Mention of oxy-acetylene welding or ripening agent (0.75M).",
        marks: "1.5 M",
      },
    ],
    syllabusMatch: "99.4%",
    zeroHallucinations: true,
    deployOptions: {
      practiceSets: true,
      diagnostics: true,
      mock2081: true,
    },
  },
  approvedTitle: "Approved Question Bank",
  approvedCount: "142 Items Live",
  approvedFilters: [
    { label: "All 142", key: "all" },
    { label: "MCQ 42", key: "mcq" },
    { label: "Short Qs 58", key: "short" },
    { label: "Long Qs 32", key: "long" },
  ],
  approvedQuestions: [
    {
      id: "q1",
      type: "MCQ",
      marks: "1 Mark",
      subject: "Science",
      chapter: "Ch. 5 Heredity",
      prompt: "Which pair of chromosomes determines the biological sex of a human male?",
      usedInTests: 3,
      successRate: 84,
    },
    {
      id: "q2",
      type: "Short Q",
      marks: "2 Marks",
      subject: "Science",
      chapter: "Ch. 2 Force",
      prompt: "State Newton's Universal Law of Gravitation and formulate its SI unit of constant 'G'.",
      usedInTests: 5,
      successRate: 72,
    },
  ],
  exportLabel: "Export Formatted Word / PDF for Print Exam",
};