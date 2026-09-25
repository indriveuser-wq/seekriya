import React from "react";
import { ActivityIndicator, Alert, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
import { RootStackParamList } from "../navigation/AppNavigator";

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const { data, loading } = useProgress();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
        subtitle="Progress"
        badge={mockLoginMeta.gradeBadge}
        streakDays={mockUserProfile.streakDays}
        avatarUrl={mockUserProfile.avatarUrl}
        onNotificationPress={() => Alert.alert("Notifications", "You are all caught up.")}
        onAvatarPress={() => navigation.navigate("Settings")}
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
          onRecovery={() => navigation.navigate("Practice")}
        />

        <CommandDeck
          title={data.deckTitle}
          link={data.deckLink}
          subjects={data.subjects}
          minis={data.minis}
          expandLabel={data.expandLabel}
          onLink={() => navigation.navigate("Subjects")}
          onExpand={() => navigation.navigate("Subjects")}
        />

        <VelocityCard velocity={data.velocity} />

        <BadgesGrid title={data.badgesTitle} count={data.badgesCount} badges={data.badges} />

        <ProgressActions
          generateLabel={data.generateLabel}
          exportLabel={data.exportLabel}
          onGenerate={() => Alert.alert("Study plan", "Your personalized 7-day plan is being prepared.")}
          onExport={() => Alert.alert("Performance dossier", "Your dossier is ready to export.")}
        />
      </ScrollView>

      <AppBottomNav activeKey="progress" bottomInset={insets.bottom} />
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