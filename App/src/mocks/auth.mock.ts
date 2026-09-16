import { ExamCountdown, UserProfile } from "../types/auth.types";

export const mockUserProfile: UserProfile = {
  id: "mock-user-001",
  fullName: "Subham Shrestha",
  gradeLabel: "Grade 10 Candidate",
  symbolId: "SEE-2081-0492",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCZLUlUFKp2iyAIdWqPpew-gbIC4xnuYf6Tdr27_ehP0W694LZAT_SPOnlaaD6cyEG8TSKUw4UvdFEePEM5M4iX0IaYIENB8-z_DnJLiuVWTUCYh4KK2YC9o-aBLpQ6xWfy6g-Dt1UDYjSiWdY7IRWsOGAVAf-z6Ka6Www0UUXrjwdPc3VJdsUtioiKV7iWbwQbA-QTDVXq7ejEJSvGx_UrGxr5_uAOFuD5T3G2fjcUxkq5DNhPP5I",
  streakDays: 5,
  isActive: true,
  role: "student",
};

export const mockCredentials = {
  identifier: "SEE-2081-0492",
  password: "see2081pin",
};

export const mockExamCountdown: ExamCountdown = {
  daysToExam: 42,
  candidatesCount: 14200,
  examTitle: "SEE Board Exam",
};

export const mockLoginMeta = {
  appName: "Arohan SEE",
  appNameNe: "(आरोहण)",
  headerSubtitle: "Tests",
  gradeBadge: "GR. 10",
  gridLabel: "CDC 2081/82 GRID",
  languageLabel: "नेपाली / EN",
  tagline: "Nepal Grade 10 CDC Curriculum Mastery & Exam Readiness Gateway",
  complianceNote: "Ministry of Education CDC Nepal Syllabus Compliant (२०८१)",
};