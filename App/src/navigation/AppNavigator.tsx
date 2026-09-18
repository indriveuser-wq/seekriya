import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AICalibrationScreen from "../screens/AICalibrationScreen";
import HomeScreen from "../screens/HomeScreen";
import LiveExamScreen from "../screens/LiveExamScreen";
import LoginScreen from "../screens/LoginScreen";
import NotesStudioScreen from "../screens/NotesStudioScreen";
import PracticeDrillScreen from "../screens/PracticeDrillScreen";
import ProgressScreen from "../screens/ProgressScreen";
import QuestionBankScreen from "../screens/QuestionBankScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SubjectDetailScreen from "../screens/SubjectDetailScreen";
import SubjectsScreen from "../screens/SubjectsScreen";
import TeacherCohortScreen from "../screens/TeacherCohortScreen";
import TeacherDashboardScreen from "../screens/TeacherDashboardScreen";
import TeacherSettingsScreen from "../screens/TeacherSettingsScreen";
import TestInsightsScreen from "../screens/TestInsightsScreen";
import TestResultScreen from "../screens/TestResultScreen";
import TestsCenterScreen from "../screens/TestsCenterScreen";
import TopicDrillScreen from "../screens/TopicDrillScreen";
import TopicNotesScreen from "../screens/TopicNotesScreen";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Subjects: undefined;
  SubjectDetail: { subjectId: string };
  TopicDrill: { chapterId: string };
  TopicNotes: { topicId: string };
  Practice: undefined;
  Tests: undefined;
  LiveExam: undefined;
  TestInsights: { testId: string };
  TestResult: { resultId: string };
  Progress: undefined;
  Settings: undefined;
  Teacher: undefined;
  TeacherCohort: undefined;
  NotesStudio: undefined;
  AICalibration: { paperId: string };
  QuestionBank: undefined;
  TeacherSettings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Subjects" component={SubjectsScreen} />
      <Stack.Screen name="SubjectDetail" component={SubjectDetailScreen} />
      <Stack.Screen name="TopicDrill" component={TopicDrillScreen} />
      <Stack.Screen name="TopicNotes" component={TopicNotesScreen} />
      <Stack.Screen name="Practice" component={PracticeDrillScreen} />
      <Stack.Screen name="Tests" component={TestsCenterScreen} />
      <Stack.Screen name="LiveExam" component={LiveExamScreen} />
      <Stack.Screen name="TestInsights" component={TestInsightsScreen} />
      <Stack.Screen name="TestResult" component={TestResultScreen} />
      <Stack.Screen name="Progress" component={ProgressScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Teacher" component={TeacherDashboardScreen} />
      <Stack.Screen name="TeacherCohort" component={TeacherCohortScreen} />
      <Stack.Screen name="NotesStudio" component={NotesStudioScreen} />
      <Stack.Screen name="AICalibration" component={AICalibrationScreen} />
      <Stack.Screen name="QuestionBank" component={QuestionBankScreen} />
      <Stack.Screen name="TeacherSettings" component={TeacherSettingsScreen} />
    </Stack.Navigator>
  );
}