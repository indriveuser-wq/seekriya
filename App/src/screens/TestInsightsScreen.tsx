import React from "react";
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, View } from "react-native";
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
  const { testId } = route.params;
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
        subtitle="Subjects"
        badge={mockLoginMeta.gradeBadge}
        streakDays={mockUserProfile.streakDays}
        avatarUrl={mockUserProfile.avatarUrl}
        onNotificationPress={() => console.log("notifications")}
        onAvatarPress={() => console.log("profile")}
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
            onListen={() => console.log("listen-voice-note")}
            onReply={() => console.log("reply-to-sir")}
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
            onPress={() => console.log("recovery-drill")}
          />
          <InsightActions actions={data.actions} onPress={(id) => console.log("insight-action:", id)} />
        </View>
      </ScrollView>

      <AppBottomNav activeKey="subjects" bottomInset={insets.bottom} />
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