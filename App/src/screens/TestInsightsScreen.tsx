import React from "react";
import { ActivityIndicator, Alert, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppBottomNav from "../components/AppBottomNav";
import AppHeader from "../components/AppHeader";
import GapCard from "../components/GapCard";
import InsightActions from "../components/InsightActions";
import InsightsSubHeader from "../components/InsightsSubHeader";
import OtherQuestions from "../components/OtherQuestions";
import QuestionAuditCard from "../components/QuestionAuditCard";
import RecoveryCta from "../components/RecoveryCta";
import ScoreHeroCard from "../components/ScoreHeroCard";
import { useTestInsights } from "../hooks/useTestInsights";
import { mockLoginMeta, mockUserProfile } from "../mocks/auth.mock";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "TestInsights">;

export default function TestInsightsScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const testId = route.params?.testId ?? "CUMULATIVE-U1-4";
  const { data, loading } = useTestInsights(testId);

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
        onNotificationPress={() => Alert.alert("Notifications", "You are all caught up.")}
        onAvatarPress={() => navigation.navigate("Settings")}
      />

      <InsightsSubHeader meta={data.meta} onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.padded}>
          <ScoreHeroCard hero={data.hero} />
          <GapCard gap={data.gap} />
          <QuestionAuditCard
            audit={data.audit}
            onListen={() => Alert.alert("Voice note", "Ramesh Sir's feedback is ready to play.")}
            onReply={() => Alert.alert("Teacher Q&A", "Your question has been prepared for Ramesh Sir.")}
          />
          <OtherQuestions
  label={data.otherLabel}
  questions={data.otherQuestions}
  onPress={(id) => navigation.navigate("TestResult", { resultId: id })}
/>
          <RecoveryCta
            title={data.recovery.title}
            sub={data.recovery.sub}
            xp={data.recovery.xp}
            onPress={() => navigation.navigate("Practice")}
          />
          <InsightActions actions={data.actions} onPress={(id) => Alert.alert("Diagnostic action", `${id} is ready.`)} />
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