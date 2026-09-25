import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AIStudioCard from "../components/AIStudioCard";
import CurriculumAuthorityCard from "../components/CurriculumAuthorityCard";
import EvaluationCard from "../components/EvaluationCard";
import InstitutionalCard from "../components/InstitutionalCard";
import TeacherBottomNav from "../components/TeacherBottomNav";
import TeacherSettingsHeader from "../components/TeacherSettingsHeader";
import TeacherSettingsProfileCard from "../components/TeacherSettingsProfileCard";
import TeacherStatsGrid from "../components/TeacherStatsGrid";
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
        onNotification={() => Alert.alert("Notifications", "You are all caught up.")}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <TeacherSettingsProfileCard profile={data.profile} />

        {/* Stats Grid */}
        <TeacherStatsGrid stats={data.stats} />

        {/* Curriculum Authority */}
        <CurriculumAuthorityCard curriculum={data.curriculum} />

        {/* AI Studio Calibration */}
        <AIStudioCard config={data.aiStudio} />

        {/* Evaluation & Moderation */}
        <EvaluationCard config={data.evaluation} />

        {/* Institutional Faculty Desk */}
        <InstitutionalCard
          items={data.institutional}
          onPress={(id) => Alert.alert("Institutional desk", `${id} is ready to configure.`)}
        />

        {/* Terminate Button */}
        <Pressable
          style={styles.terminateButton}
          onPress={() => Alert.alert("End session", "Your session remains active on this device.")}
        >
          <MaterialIcons name="logout" size={18} color={colors.crimson} />
          <Text style={styles.terminateText}>{data.terminateLabel}</Text>
        </Pressable>

        {/* Footer Build Info */}
        <Text style={styles.footerBuild}>{data.footerBuild}</Text>
      </ScrollView>

      {/* Bottom Navigation */}
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
    padding: 12,
    paddingBottom: 100, // Space for bottom nav
  },
  terminateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 16,
    marginHorizontal: 12,
  },
  terminateText: {
    ...monoText(12, "700"),
    color: colors.crimson,
  },
  footerBuild: {
    ...monoText(8, "600"),
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 8,
  },
});