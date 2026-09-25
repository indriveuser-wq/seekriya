import React from "react";
import { ActivityIndicator, Alert, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import AchievementRow from "../components/AchievementRow";
import AppBottomNav from "../components/AppBottomNav";
import AppHeader from "../components/AppHeader";
import AttentionCard from "../components/AttentionCard";
import ContinueLearningCard from "../components/ContinueLearningCard";
import MissionRow from "../components/MissionRow";
import ReadinessCard from "../components/ReadinessCard";
import SectionHeader from "../components/SectionHeader";
import SocialProofRow from "../components/SocialProofRow";
import { useHomeDashboard } from "../hooks/useHomeDashboard";
import { mockLoginMeta, mockUserProfile } from "../mocks/auth.mock";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { data, loading } = useHomeDashboard();
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
        subtitle="Home"
        badge={mockLoginMeta.gradeBadge}
        streakDays={mockUserProfile.streakDays}
        avatarUrl={mockUserProfile.avatarUrl}
        onNotificationPress={() => Alert.alert("Examiner broadcasts", "You have no new broadcasts.")}
        onAvatarPress={() => navigation.navigate("Settings")}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.greetingRow}>
          <View style={styles.greetingLeft}>
            <Text style={styles.greetingTitle}>
              {data.greeting}, {data.studentName} <Text style={styles.wave}>👋</Text>
            </Text>
            <Text style={styles.greetingSubtitle}>{data.subtitle}</Text>
          </View>

          <View style={styles.countdownWrap}>
            <View style={styles.countdownDot} />
            <Text style={styles.countdownText}>{data.countdownLabel}</Text>
          </View>
        </View>

        {/* Stat chips */}
        <View style={styles.chipsRow}>
          <View style={styles.chip}>
            <Text style={styles.chipEmoji}>🔥</Text>
            <Text style={styles.chipAmber}>{data.streakDays} Day Streak</Text>
          </View>

          <View style={styles.chip}>
            <MaterialCommunityIcons name="flash" size={14} color={colors.primary} />
            <Text style={styles.chipBlue}>{data.xp.toLocaleString("en-US")} XP</Text>
            <Text style={styles.chipDark}>{data.levelLabel}</Text>
          </View>
        </View>

        {/* Readiness donut card */}
        <ReadinessCard readiness={data.readiness} />

        {/* Continue learning */}
        <SectionHeader
          title="Continue Learning"
          style={styles.sectionHeader}
          right={<Text style={styles.sectionRightBlue}>HIGH PRIORITY</Text>}
        />
        <ContinueLearningCard
          lesson={data.continueLesson}
          onContinue={() => navigation.navigate("TopicDrill", { chapterId: "12" })}
        />

        <AttentionCard item={data.attention} onPractice={() => navigation.navigate("Practice")} />

        {/* Today's focus */}
        <SectionHeader
          title="Today's Focus"
          chip={`${data.missionsCount} Missions`}
          style={styles.sectionHeader}
          right={<Text style={styles.sectionRightGray}>Auto-curated</Text>}
        />
        {data.missions.map((mission) => (
          <MissionRow
            key={mission.id}
            mission={mission}
            onPress={() => navigation.navigate("Practice")}
          />
        ))}

        {/* Achievement */}
        <AchievementRow achievement={data.achievement} />

        {/* Social proof */}
        <SocialProofRow proof={data.socialProof} />
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
  greetingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  greetingLeft: {
    flex: 1,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  wave: {
    fontSize: 22,
  },
  greetingSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 6,
    lineHeight: 19,
  },
  countdownWrap: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    width: 130,
  },
  countdownDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 6,
  },
  countdownText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: colors.amber,
    lineHeight: 19,
  },
  chipsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipEmoji: {
    fontSize: 12,
  },
  chipAmber: {
    ...monoText(11, "700"),
    color: colors.amber,
  },
  chipBlue: {
    ...monoText(11, "700"),
    color: colors.primary,
  },
  chipDark: {
    ...monoText(10, "600"),
    color: colors.textPrimary,
  },
  sectionHeader: {
    marginTop: 22,
  },
  sectionRightBlue: {
    ...monoText(10, "700"),
    color: colors.primary,
    letterSpacing: 1,
  },
  sectionRightGray: {
    ...monoText(10),
    color: colors.textSecondary,
  },
});