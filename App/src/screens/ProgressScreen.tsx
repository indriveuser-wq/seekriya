import React from "react";
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppBottomNav from "../components/AppBottomNav";
import AppHeader from "../components/AppHeader";
import BadgesGrid from "../components/BadgesGrid";
import CommandDeck from "../components/CommandDeck";
import DiagnosticsSection from "../components/DiagnosticsSection";
import ProfileHeroCard from "../components/ProfileHeroCard";
import ProgressActions from "../components/ProgressActions";
import TrajectoryCard from "../components/TrajectoryCard";
import VelocityCard from "../components/VelocityCard";
import { useProgress } from "../hooks/useProgress";
import { mockLoginMeta, mockUserProfile } from "../mocks/auth.mock";
import { colors } from "../theme/colors";

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const { data, loading } = useProgress();

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
        subtitle="Home"
        badge={mockLoginMeta.gradeBadge}
        streakDays={mockUserProfile.streakDays}
        avatarUrl={mockUserProfile.avatarUrl}
        onNotificationPress={() => console.log("notifications")}
        onAvatarPress={() => console.log("profile")}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeroCard profile={data.profile} />

        <TrajectoryCard trajectory={data.trajectory} />

        <DiagnosticsSection
          diagnostics={data.diagnostics}
          onRecovery={() => console.log("ai-recovery-sortie")}
        />

        <CommandDeck
          title={data.deckTitle}
          link={data.deckLink}
          subjects={data.subjects}
          minis={data.minis}
          expandLabel={data.expandLabel}
          onLink={() => console.log("view-syllabus-spec")}
          onExpand={() => console.log("expand-subjects")}
        />

        <VelocityCard velocity={data.velocity} />

        <BadgesGrid title={data.badgesTitle} count={data.badgesCount} badges={data.badges} />

        <ProgressActions
          generateLabel={data.generateLabel}
          exportLabel={data.exportLabel}
          onGenerate={() => console.log("generate-study-plan")}
          onExport={() => console.log("export-dossier")}
        />
      </ScrollView>

      <AppBottomNav activeKey="home" bottomInset={insets.bottom} />
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
});