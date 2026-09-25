import React from "react";
import { ActivityIndicator, Alert, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppBottomNav from "../components/AppBottomNav";
import AppHeader from "../components/AppHeader";
import DiagnosticCard from "../components/DiagnosticCard";
import ResultActions from "../components/ResultActions";
import ResultHeroCard from "../components/ResultHeroCard";
import ResultStatsGrid from "../components/ResultStatsGrid";
import SubjectiveAuditCard from "../components/SubjectiveAuditCard";
import { useTestResult } from "../hooks/useTestResult";
import { mockLoginMeta, mockUserProfile } from "../mocks/auth.mock";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "TestResult">;

export default function TestResultScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { resultId } = route.params;
  const { data, loading } = useTestResult(resultId);

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

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ResultHeroCard hero={data.hero} />

        <ResultStatsGrid stats={data.stats} />

        <View style={styles.sectionHeader}>
          <MaterialIcons name="troubleshoot" size={17} color={colors.amber} />
          <Text style={styles.sectionTitle}>{data.diagnosticsTitle}</Text>
        </View>
        {data.diagnostics.map((card) => (
          <DiagnosticCard key={card.tag} card={card} />
        ))}

        <View style={[styles.sectionHeader, styles.sectionHeaderAudit]}>
          <MaterialIcons name="rate-review" size={17} color={colors.purple} />
          <Text style={styles.sectionTitle}>{data.audit.sectionTitle}</Text>
          <View style={styles.spacer} />
          <Text style={styles.evalLabel}>{data.audit.evalLabel}</Text>
        </View>
        <SubjectiveAuditCard audit={data.audit} />

        <ResultActions
          practiceLabel={data.practiceLabel}
          practiceChip={data.practiceChip}
          reviewLabel={data.reviewLabel}
          onPractice={() => navigation.navigate("Practice")}
          onReview={() => navigation.navigate("TestInsights", { testId: resultId })}
        />
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
    padding: 16,
    paddingBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
  },
  sectionHeaderAudit: {
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  spacer: {
    flex: 1,
  },
  evalLabel: {
    fontSize: 9.5,
    fontWeight: "700",
    color: colors.primary,
    fontFamily: "Menlo",
  },
});