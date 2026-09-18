import React from "react";
import { ActivityIndicator, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CurriculumAuthorityCard from "../components/CurriculumAuthorityCard";
import EvaluationCard from "../components/EvaluationCard";
import InstitutionalCard from "../components/InstitutionalCard";
import TeacherBottomNav from "../components/TeacherBottomNav";
import TeacherSettingsProfileCard from "../components/TeacherSettingsProfileCard";
import TeacherSettingsHeader from "../components/TeacherSettingsHeader";
import TeacherStatsGrid from "../components/TeacherStatsGrid";
import AIStudioCard from "../components/AIStudioCard";
import { useTeacherSettings } from "../hooks/useTeacherSettings";
import { mockTeacher } from "../mocks/teacher.mock";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

export default function TeacherSettingsScreen() {
  const insets = useSafeAreaInsets();
  const { data, loading } = useTeacherSettings();

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

      <TeacherSettingsHeader
        header={data.header}
        avatarUrl={mockTeacher.profile.avatarUrl}
        onNotification={() => console.log("notifications")}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TeacherSettingsProfileCard profile={data.profile} />

        <TeacherStatsGrid stats={data.stats} />

        <CurriculumAuthorityCard curriculum={data.curriculum} />

        <AIStudioCard config={data.aiStudio} />

        <EvaluationCard config={data.evaluation} />

        <InstitutionalCard
          items={data.institutional}
          onPress={(id) => console.log("institutional:", id)}
        />

        <Pressable style={styles.terminateButton}>
          <MaterialIcons name="logout" size={15} color={colors.crimson} />
          <Text style={styles.terminateText}>{data.terminateLabel}</Text>
        </Pressable>

        <Text style={styles.footerBuild}>{data.footerBuild}</Text>
      </ScrollView>

      <TeacherBottomNav activeKey="settings" bottomInset={insets.bottom} />
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
    paddingBottom: 8,
  },
  terminateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    paddingVertical: 13,
    marginTop: 16,
    marginHorizontal: 12,
  },
  terminateText: {
    ...monoText(11, "700"),
    color: colors.crimson,
  },
  footerBuild: {
    ...monoText(8.5, "600"),
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 8,
  },
});