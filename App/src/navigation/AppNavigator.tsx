import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import PracticeDrillScreen from "../screens/PracticeDrillScreen";
import SubjectDetailScreen from "../screens/SubjectDetailScreen";
import SubjectsScreen from "../screens/SubjectsScreen";
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
    </Stack.Navigator>
  );
}