import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AdaptiveHeroCard from "../components/AdaptiveHeroCard";
import AppBottomNav from "../components/AppBottomNav";
import AppHeader from "../components/AppHeader";
import AscensionCard from "../components/AscensionCard";
import ModerationCard from "../components/ModerationCard";
import TestCard from "../components/TestCard";
import TestsFilterTabs from "../components/TestsFilterTabs";
import TestsStatsRow from "../components/TestsStatsRow";
import TestsTitleBlock from "../components/TestsTitleBlock";
import { useTestsCenter } from "../hooks/useTestsCenter";
import { mockLoginMeta, mockUserProfile } from "../mocks/auth.mock";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";

export default function TestsCenterScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, loading } = useTestsCenter();
  const [activeTab, setActiveTab] = useState("All Tests");

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
        subtitle="Tests"
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
        <TestsTitleBlock header={data.header} />

        <View style={styles.padded}>
          <AdaptiveHeroCard
            hero={data.hero}
            onStart={() => navigation.navigate("LiveExam")}
            onSettings={() => console.log("adaptive-settings")}
          />

          <TestsStatsRow stats={data.stats} />
        </View>

        <TestsFilterTabs tabs={data.tabs} activeTab={activeTab} onSelect={setActiveTab} />

        <View style={styles.padded}>
          {data.cards.map((card) => (
            <TestCard
              key={card.id}
              card={card}
              onAction={(id) => {
  if (id === "organic-sprint" || id === "force-pressure") {
    navigation.navigate("TestInsights", { testId: id });
  } else {
    navigation.navigate("LiveExam");
  }
}}
            />
          ))}

          <ModerationCard moderation={data.moderation} />

          <AscensionCard ascension={data.ascension} />
        </View>
      </ScrollView>

      <AppBottomNav activeKey="tests" bottomInset={insets.bottom} />
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
  padded: {
    paddingHorizontal: 16,
  },
});