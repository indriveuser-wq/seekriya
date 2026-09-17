import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppBottomNav from "../components/AppBottomNav";
import AppHeader from "../components/AppHeader";
import CopilotCard from "../components/CopilotCard";
import DrillActions from "../components/DrillActions";
import DrillStatsBar from "../components/DrillStatsBar";
import FeedbackCard from "../components/FeedbackCard";
import OptionRow from "../components/OptionRow";
import QuestionCard from "../components/QuestionCard";
import { usePracticeDrill } from "../hooks/usePracticeDrill";
import { mockLoginMeta, mockUserProfile } from "../mocks/auth.mock";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

export default function PracticeDrillScreen() {
  const insets = useSafeAreaInsets();
  const { data, loading } = usePracticeDrill();
  const [copilotVisible, setCopilotVisible] = useState(true);

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
        subtitle="Practice"
        badge={mockLoginMeta.gradeBadge}
        streakDays={mockUserProfile.streakDays}
        avatarUrl={mockUserProfile.avatarUrl}
        onNotificationPress={() => console.log("notifications")}
        onAvatarPress={() => console.log("profile")}
      />

      <DrillStatsBar stats={data.stats} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <QuestionCard question={data.question} onBookmark={() => console.log("bookmark")} />

        {data.question.options.map((option) => (
          <OptionRow key={option.key} option={option} onSelect={(key) => console.log("select:", key)} />
        ))}

        <FeedbackCard feedback={data.feedback} />

        <DrillActions
          explainLabel={data.explainLabel}
          savedLabel={data.savedLabel}
          nextLabel={data.nextLabel}
          targetPrefix={data.targetPrefix}
          targetHighlight={data.targetHighlight}
          onExplain={() => console.log("explain")}
          onSaved={() => console.log("saved")}
          onNext={() => console.log("next-question")}
        />

        {copilotVisible ? (
          <>
            <CopilotCard copilot={data.copilot} onClose={() => setCopilotVisible(false)} />
            <View style={styles.copilotChips}>
              {data.copilot.chips.map((chip) => (
                <View key={chip} style={styles.copilotChip}>
                  <Text style={styles.copilotChipText}>{chip}</Text>
                </View>
              ))}
            </View>
          </>
        ) : null}
      </ScrollView>

      <AppBottomNav activeKey="practice" bottomInset={insets.bottom} />
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
  copilotChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
    marginBottom: 8,
  },
  copilotChip: {
    backgroundColor: "#E9EBF4",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  copilotChipText: {
    ...monoText(9.5, "600"),
    color: colors.textPrimary,
  },
});