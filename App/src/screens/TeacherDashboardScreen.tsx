import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import AppBottomNav from "../components/AppBottomNav";
import AppHeader from "../components/AppHeader";
import CalibrationCard from "../components/CalibrationCard";
import DraftQueueCard from "../components/DraftQueueCard";
import QuestionStudioCard from "../components/QuestionStudioCard";
import TeacherProfileCard from "../components/TeacherProfileCard";
import TeacherTabs from "../components/TeacherTabs";
import VettedRow from "../components/VettedRow";
import { useTeacherDashboard } from "../hooks/useTeacherDashboard";
import { mockLoginMeta, mockUserProfile } from "../mocks/auth.mock";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { DraftCardModel } from "../types/teacher.types";

export default function TeacherDashboardScreen() {
  const insets = useSafeAreaInsets();
  const { data, loading } = useTeacherDashboard();
  const [activeTab, setActiveTab] = useState(0);
  const [drafts, setDrafts] = useState<DraftCardModel[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (data) setDrafts(data.drafts);
  }, [data]);

  if (loading || !data) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surfaceLight} />

      <AppHeader
        title={mockLoginMeta.appName}
        subtitle="Subjects"
        badge={mockLoginMeta.gradeBadge}
        streakDays={mockUserProfile.streakDays}
        avatarUrl={mockUserProfile.avatarUrl}
        onNotificationPress={() => console.log("notifications")}
        onAvatarPress={() => navigation.navigate("TeacherCohort")}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TeacherTabs tabs={data.tabs} activeIndex={activeTab} onSelect={setActiveTab} />

        <TeacherProfileCard profile={data.profile} />

        <CalibrationCard
          calibration={data.calibration}
          onReview={() => console.log("review-student-script")}
        />

        <QuestionStudioCard
          studio={data.studio}
          onGenerate={() => console.log("generate-batch")}
          onChangeFocus={() => console.log("change-focus")}
        />

        <View style={styles.queueHeader}>
          <Text style={styles.queueTitle}>{data.queueTitle}</Text>
          <View style={styles.queueCount}>
            <Text style={styles.queueCountText}>{drafts.length}</Text>
          </View>
          <View style={styles.spacer} />
          <Text style={styles.queueHint}>{data.queueHint}</Text>
        </View>

        {drafts.map((draft) => (
          <DraftQueueCard
            key={draft.id}
            draft={draft}
            onReject={(id) => setDrafts((current) => current.filter((d) => d.id !== id))}
            onEdit={(id) => console.log("edit-draft:", id)}
            onApprove={(id) => setDrafts((current) => current.filter((d) => d.id !== id))}
          />
        ))}

        <VettedRow vetted={data.vetted} onPress={() => console.log("vetted-history")} />
      </ScrollView>

      <AppBottomNav activeKey="subjects" bottomInset={insets.bottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 8,
  },
  queueHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 18,
  },
  queueTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  queueCount: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#CFE0F8",
    alignItems: "center",
    justifyContent: "center",
  },
  queueCountText: {
    ...monoText(9, "700"),
    color: colors.primary,
  },
  spacer: {
    flex: 1,
  },
  queueHint: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
});