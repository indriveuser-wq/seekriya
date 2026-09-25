export type UserRole = "student" | "teacher";

export interface LoginPayload {
  email: string;
  password: string;
  role: UserRole;
  keepActive: boolean;
}

export interface UserProfile {
  id: string;
  fullName: string;
  gradeLabel: string;
  symbolId: string;
  avatarUrl: string;
  streakDays: number;
  isActive: boolean;
  role: UserRole;
}

export interface ExamCountdown {
  daysToExam: number;
  candidatesCount: number;
  examTitle: string;
}

export type BottomTabKey = "home" | "subjects" | "practice" | "tests" | "progress";