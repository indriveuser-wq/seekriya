import React, { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ActivityRhythmCard from "../components/ActivityRhythmCard";
import CandidateTelemetry from "../components/CandidateTelemetry";
import CohortSelectorCard from "../components/CohortSelectorCard";
import CohortStatsGrid from "../components/CohortStatsGrid";
import ConsoleHeader from "../components/ConsoleHeader";
import HotspotDiagnostics from "../components/HotspotDiagnostics";
import PtmCard from "../components/PtmCard";
import TeacherBottomNav from "../components/TeacherBottomNav";
import { useCohort } from "../hooks/useCohort";
import { mockTeacher } from "../mocks/teacher.mock";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

export default function TeacherCohortScreen() {
  const insets = useSafeAreaInsets();
  const { data, loading } = useCohort();
  const [snackbarVisible, setSnackbarVisible] = useState(false);

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

      <ConsoleHeader
        header={data.header}
        avatarUrl={mockTeacher.profile.avatarUrl}
        onNotification={() => console.log("notifications")}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CohortSelectorCard selector={data.selector} />

        <CohortStatsGrid stats={data.stats} />

        <HotspotDiagnostics
          title={data.diagnosticsTitle}
          hint={data.diagnosticsHint}
          bottleneck={data.bottleneck}
          hotspots={data.hotspots}
          onPushSortie={() => setSnackbarVisible(true)}
          onHotspotPress={(id) => console.log("hotspot:", id)}
        />

        <CandidateTelemetry
          title={data.telemetryTitle}
          sub={data.telemetrySub}
          chip={data.telemetryChip}
          filters={data.filters}
          students={data.students}
          onNudge={(id) => console.log("nudge:", id)}
          onDossier={(id) => console.log("dossier:", id)}
        />

        <ActivityRhythmCard rhythm={data.rhythm} />

        <PtmCard ptm={data.ptm} onDownload={() => console.log("download-ptm")} />
      </ScrollView>

      {snackbarVisible ? (
        <View style={[styles.snackbar, { bottom: Math.max(insets.bottom, 12) + 64 }]}>
          <MaterialIcons name="task-alt" size={15} color="#15803D" />
          <Text style={styles.snackbarText}>{data.snackbar}</Text>
          <Pressable onPress={() => setSnackbarVisible(false)} hitSlop={8}>
            <MaterialIcons name="close" size={14} color={colors.textSecondary} />
          </Pressable>
        </View>
      ) : null}

      <TeacherBottomNav activeKey="performance" bottomInset={insets.bottom} />
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
    paddingBottom: 8,
  },
  snackbar: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F8F9FC",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#1B2559",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  snackbarText: {
    flex: 1,
    ...monoText(10, "700"),
    color: colors.textPrimary,
  },
});