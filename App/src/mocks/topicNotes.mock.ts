import { TopicNotesData } from "../types/topicNotes.types";

export const mockTopicNotes: TopicNotesData = {
  headerTitle: "TOPIC DRILL DETAIL",
  headerSubtitle: "SEE Tactical Sortie",
  meta: {
    chapterChip: "CH. HYDROCARBON",
    topicLabel: "Topic 04/07",
    durationLabel: "8 min",
    gradeChip: "GRADE 10 SCIENCE",
    yieldChip: "HIGH YIELD • 4 MARKS",
    title: "Saturated vs. Unsaturated Hydrocarbons",
    author: {
      name: "Ramesh Shrestha",
      roleChip: "SEE Examiner",
      subtitle: "Curated & Verified • Lead SEE Science Faculty",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC0AJn_KmY-ijZjJPQ-sBD6cUsIAS12Gj3fakDQtpOj_-DKmjssPfTl1I9RPgRDdpwmEW5EGxTn9aARmpSShevKHoQfgTi_pj89bxIvadSCgfg1-jmxWNywjM-eVTccgN5alV5H5OIDwz9qTy4JHEw9p_InHHBrn3zWoFaTU4wR0_oZtsMmGwdlqn_DTmCyX_12vEfV2UhA8osyomFUrvUeu04kSY4yJvl6FFfu1ILY7A96Hnkowu4",
    },
  },
  section1Title: "1. FUNDAMENTALS OF COVALENT BONDS",
  section1Paragraph:
    "Hydrocarbons are organic compounds composed strictly of carbon and hydrogen atoms. Their chemical stability and reaction paths are dictated primarily by whether their carbon atoms share single, double, or triple electron pairs.",
  definitionTag: "SEE HIGH-YIELD CORE DEFINITION",
  definitionSegments: [
    { text: "Alkanes (Saturated)", tone: "blue", bold: true },
    {
      text: " contain only single carbon-carbon (C—C) covalent bonds with maximal hydrogen saturation. Conversely, ",
    },
    { text: "Alkenes & Alkynes (Unsaturated)", tone: "amber", bold: true },
    {
      text: " contain double (C=C) or triple (C≡C) bonds with exposed electron density and labile π-bond rings.",
    },
  ],
  section2Title: "2. DIRECT PROPERTY COMPARISON",
  section2Hint: "Tap to inspect",
  metrics: [
    {
      label: "METRIC 01 • MOLECULAR FORMULA",
      kind: "formula",
      columns: [
        { title: "Alkane (Ethane)", titleTone: "blue", formula: "CₙH₂ₙ₊₂", sub: "C₂H₆ • Open Chain" },
        { title: "Alkene (Ethene)", titleTone: "amber", formula: "CₙH₂ₙ", sub: "C₂H₄ • Double bond" },
      ],
    },
    {
      label: "METRIC 02 • CHEMICAL REACTIVITY",
      kind: "reactivity",
      columns: [
        {
          title: "Substitution",
          titleTone: "blue",
          body: "Slow, inert at ambient conditions; requires UV photons.",
          chip: "Resistant",
          chipTone: "gray",
        },
        {
          title: "Addition Reaction",
          titleTone: "amber",
          body: "Spontaneous, swift breaking of weaker π-electron bond.",
          chip: "Highly Reactive",
          chipTone: "amber",
        },
      ],
    },
    {
      label: "METRIC 03 • COMBUSTION & SOOT OUTPUT",
      kind: "combustion",
      columns: [
        {
          title: "Clean Blue Flame",
          titleTone: "blue",
          body: "Complete combustion. Low carbon ratio generates zero soot.",
          icon: "local-fire-department",
        },
        {
          title: "Smoky Luminous",
          titleTone: "amber",
          body: "Incomplete combustion. High carbon ratio produces black smoke.",
          icon: "local-fire-department",
        },
      ],
    },
  ],
  section3Title: "3. MECHANISTIC SCHEMATIC",
  section3Chip: "Addition Test",
  schematic: {
    label: "BROMINE WATER ADDITION (ETHENE)",
    equation: "Br₂ (aq) + C₂H₄",
    left: { formula: "H₂C = CH₂", name: "Ethene (Gas)", chip: "Unsaturated" },
    middle: { reagent: "+ Br₂ (aq)", reagentSub: "Reddish-Brown" },
    right: { formula: "CH₂Br—CH₂Br", name: "1,2-Dibromoethane", result: "COLORLESS ✓" },
    caption:
      "The double bond breaks open. One bromine atom attaches to each carbon, causing the red color to dissipate immediately.",
  },
  lab: {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgHwUWOSsNBUhFvw-hM2YESExoPyMrxVa4yjbta60bx0PgGfPP7_yv6Smu9XGIqu6cE7ZbZqO2qM-O3oC1AeDRPry5EJxwjoQ9LA9-Q_BN5psmxda3L3Bltt0uln_ZebJuUMV4qrjnmOj5e833qrxS8BPh9Kf86N67xSyJffpkibkuKomsAYpoC0T2_mXLRvH6H4yDXVRsEL1rjO-uEvyYFd9-e-rCOHLuQH3ON98nx22ycQPjVwU",
    tag: "LABORATORY VERIFICATION",
    title: "Bromine Water Decolorization",
    body: "Saturated alkanes yield no color shift; unsaturated alkenes trigger instantaneous discharge.",
  },
  boardTipTitle: "RAMESH SIR'S BOARD TIP • GROUP B (2 MARKS)",
  boardTipSegments: [
    { text: "CDC examiners frequently penalize students who forget the keyword phrase! In question papers asking " },
    { text: '"How do you chemically distinguish Ethane from Ethene?"', tone: "amber", bold: true },
    { text: ", you MUST write:" },
  ],
  boardTipQuote:
    '"Pass both gases into Bromine water separately. Ethene discharges the reddish-brown color to colorless without any catalyst, whereas Ethane shows no reaction."',
  understood: {
    title: "Topic 4 Marked as Understood",
    sub: "+25 Mastery XP Claimed",
    toggleLabel: "Toggle",
  },
  cta: {
    label: "Ready for Practice? Launch 5-Question Drill",
    duration: "~3 mins",
    xp: "+50 Streak XP",
  },
};