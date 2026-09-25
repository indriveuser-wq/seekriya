import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
import { RootStackParamList } from "../navigation/AppNavigator";
import { askAI, AIExplanation } from "../services/ai.service";

export default function PracticeDrillScreen() {
  const insets = useSafeAreaInsets();
  const { data, loading } = usePracticeDrill();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [copilotVisible, setCopilotVisible] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [explaining, setExplaining] = useState(false);

  const explainWithAI = async () => {
    if (!data) return;
    setExplaining(true);
    try {
      const result = await askAI<AIExplanation>({
        action: "explain_answer",
        context: `${data.question.text}\nSelected option: ${selectedOption ?? "none"}\nFeedback: ${data.feedback.titleLine1} ${data.feedback.titleLine2}`,
      });
      Alert.alert("AI explanation", result.explanation);
    } catch (error: any) {
      Alert.alert("AI unavailable", error?.message ?? "Deploy the ai-assistant Edge Function and try again.");
    } finally {
      setExplaining(false);
    }
  };

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
        onNotificationPress={() => Alert.alert("Notifications", "You are all caught up.")}
        onAvatarPress={() => navigation.navigate("Settings")}
      />

      <DrillStatsBar stats={data.stats} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <QuestionCard question={data.question} onBookmark={() => Alert.alert("Saved", "Question added to your drill vault.")} />

        {data.question.options.map((option) => (
          <OptionRow
            key={option.key}
            option={{ ...option, state: option.key === selectedOption ? "selected" : "idle" }}
            onSelect={(key) => setSelectedOption(key)}
          />
        ))}

        <FeedbackCard feedback={data.feedback} />

        <DrillActions
          explainLabel={data.explainLabel}
          savedLabel={data.savedLabel}
          nextLabel={data.nextLabel}
          targetPrefix={data.targetPrefix}
          targetHighlight={data.targetHighlight}
          onExplain={explainWithAI}
          onSaved={() => Alert.alert("Saved", "This question is in your drill vault.")}
          onNext={() => navigation.navigate("Practice")}
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