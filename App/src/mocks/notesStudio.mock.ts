import { NotesStudioData } from "../types/notesStudio.types";

export const mockNotesStudio: NotesStudioData = {
  header: {
    appTitle: "Arohan SEE",
    appSub: "Notes Studio",
    consoleChip: "TEACHER CONSOLE",
  },
  source: {
    label: "CURRICULUM SOURCE OF TRUTH",
    chip: "CDC 2081/82 Vetted",
  },
  curriculum: {
    title: "Compulsory Science (Class 10)",
    unitsLabel: "12 Units • 48 Topics",
    editionLabel: "Ramesh Sir's Edition",
    uploadLabel: "+ Upload / New Notes",
  },
  vectorIndex: {
    title: "AI QUESTION VECTOR INDEX",
    percent: "98.4%",
    syncChip: "Live Sync Active",
    stats: [
      { label: "Published", value: "48", sub: "Modules", tone: "blue" },
      { label: "Synthesized", value: "142", sub: "SEE Questions", tone: "blue" },
      { label: "Needs Sync", value: "3", sub: "Outdated Topics", tone: "red" },
    ],
    footer: "Verified against CDC 2081 Specification Grid",
  },
  searchPlaceholder: "Search concepts, formulas, keywords...",
  tabs: ["All Units (12)", "Chemistry (4)", "Physics (4)", "Biology (4)"],
  sectionTitle: "COURSE MODULES",
  sortLabel: "Sort: Syllabus Order",
  modules: [
    {
      id: "hydrocarbon",
      unitTag: "Unit 12 • Chemistry",
      timeOrStatus: { label: "2d ago", tone: "gray", icon: "history" },
      title: "Hydrocarbon & its Compounds",
      statusBox: {
        title: "5 Syllabus Topics Documented:",
        percent: "100% Covered",
        body: "Saturated vs Unsaturated • IUPAC Nomenclature rules • Methane & Ethane Lab Preparation • Ethyn...",
        tone: "blue",
      },
      footerInfo: "Authoritative base for 18 Active SEE Questions",
      buttons: [
        { label: "Open Note Editor", tone: "dark-blue", icon: "edit" },
        { label: "Gen AI Questions", tone: "purple", icon: "auto-awesome" },
      ],
      extraIcon: "visibility",
    },
    {
      id: "light",
      unitTag: "Unit 5 • Physics",
      timeOrStatus: { label: "Needs Attention", tone: "red" },
      title: "Light & Refraction",
      statusBox: {
        title: "Diagram Prompt Incomplete",
        percent: "",
        body: "Missing critical angle & total internal reflection diagram annotations required for 2081 Model Set.",
        tone: "red",
      },
      footerInfo: "12 Questions Linked",
      footerRight: "Re-sync paused",
      buttons: [
        { label: "Edit Notes", tone: "outline", icon: "edit" },
        { label: "Re-index with AI", tone: "dark-blue", icon: "sync" },
      ],
    },
    {
      id: "force",
      unitTag: "Unit 1 • Physics",
      timeOrStatus: { label: "100% Complete", tone: "green", icon: "check-circle" },
      title: "Force & Gravity",
      description: "Newton's Gravitational Law, Gravitational Field Intensity, Weightlessness states, and 4 solved numerical templates.",
      footerInfo: "24 Approved Questions in Exam Pool",
      buttons: [{ label: "View (24)", tone: "outline", icon: "arrow-forward" }],
    },
  ],
  alignment: {
    title: "Exam Board Alignment",
    sub: "All 48 modules adhere to CDC Nepal 2081/82 question weightage matrix.",
    buttonLabel: "Run AI Curriculum Check",
    buttonSub: "Scan 48 Units",
  },
};