import { AICalibrationData } from "../types/aiCalibration.types";

export const mockAICalibration: AICalibrationData = {
  headerTitle: "Pending Paper Review",
  headerSubtitle: "GR. 10 CDC EXAMINER",
  auditBadge: "Human-in-the-Loop Audit",
  reviewCount: "Review 1 of 4 Pending",
  student: {
    name: "Subham Shrestha",
    initials: "SS",
    rollNumber: "Roll #14",
    school: "Prabhat Sec School",
    timestamp: "Today 11:42 AM",
  },
  question: {
    number: 14,
    maxMarks: 5.0,
    text: "Explain the laboratory preparation of Methane gas with a neat labeled diagram and balanced chemical reaction.",
  },
  aiConfidence: {
    percentage: 64,
    requiresSignoff: true,
    warning:
      "Pencil diagram line contrast partial; delivery tube angle and downward displacement of water label requires manual verification.",
  },
  ocrInfo: {
    isActive: true,
    detections: [
      {
        label: "Delivery Tube Entry",
        confidence: 0.58,
        x: 120,
        y: 80,
        width: 100,
        height: 40,
      },
      {
        label: "Apparatus Geometry Verified",
        confidence: 0.92,
        x: 80,
        y: 140,
        width: 140,
        height: 35,
      },
    ],
    notes: ["Trough & inverted jar identified correctly"],
  },
  submissionImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuACexRCp2j0HWJxRFBoDEhuN6DiXeoveSTyGsGkf_WQkTq5Hh0VElNfLB2MMmkxb8uCMDZIRbZNNDwIRWu_0mwvhZczw8oOsBvfXYvGH0vu2c6J6tZxNZknsdS9fFBe4F4S_fcdADYFEKycnPMYLxPUPhMXxk09GewvkII2jGzFb6s99ETLgXVEgnk8uwytFfXY_dYIYoTqin8MEz7lxPk8IRTDyQX8I6Id5yISTQALB2439yLJVkA",
  criteriaTitle: "Criteria Calibration",
  criteriaCount: "3 Specific Items",
  calibrationItems: [
    {
      id: 1,
      title: "Balanced Chemical Reaction",
      chemicalEquation: "CH₃COONa + NaOH → Na₂CO₃ + CH₄ ↑",
      catalyst: "(CaO catalyst)",
      aiStatus: "confirmed",
      aiScore: { current: 1.5, max: 1.5 },
      aiMatch: "100% Match",
      maxMarks: 1.5,
      currentMarks: 1.5,
    },
    {
      id: 2,
      title: "Apparatus Setup & Labels",
      aiStatus: "provisional",
      aiScore: { current: 1.0, max: 2.0 },
      flag: {
        text: "Check downward displacement of water label",
        type: "error",
      },
      teacherAdjustment: {
        from: 1.0,
        to: 1.5,
        delta: 0.5,
      },
      maxMarks: 2.0,
      currentMarks: 1.5,
    },
    {
      id: 3,
      title: "Precaution & Collection Technique",
      aiStatus: "note",
      aiNote:
        "Candidate omitted the explanation for why gas is collected over water.",
      aiScore: { current: 0.5, max: 1.5 },
      maxMarks: 1.5,
      currentMarks: 0.5,
    },
  ],
  teacherFeedback: {
    text:
      "Good diagram Subham, but remember delivery tube must not touch the soda lime mixture. +0.5 awarded.",
    hasVoiceDictation: true,
  },
  finalMark: {
    originalAI: 3.0,
    calibrated: 3.5,
    maxMarks: 5.0,
  },
  confirmLabel: "Confirm & Finalize Score (Lock Grade)",
  reevaluateLabel: "Request Model Re-evaluation",
};