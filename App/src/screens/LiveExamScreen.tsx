import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AnswerEditorCard from "../components/AnswerEditorCard";
import AppBottomNav from "../components/AppBottomNav";
import AppHeader from "../components/AppHeader";
import ExamActionBar from "../components/ExamActionBar";
import LiveExamHeaderBar from "../components/LiveExamHeaderBar";
import LiveQuestionCard from "../components/LiveQuestionCard";
import LiveStatsRow from "../components/LiveStatsRow";
import SubmitModal from "../components/SubmitModal";
import { useLiveExam } from "../hooks/useLiveExam";
import { mockLoginMeta, mockUserProfile } from "../mocks/auth.mock";
import { colors } from "../theme/colors";

export default function LiveExamScreen() {
  const insets = useSafeAreaInsets();
  const { data, loading } = useLiveExam();
  const [submitVisible, setSubmitVisible] = useState(false);

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

      <LiveExamHeaderBar
        header={data.header}
        onFinish={() => setSubmitVisible(true)}
        onQuestionPress={(n) => console.log("jump-to:", n)}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <LiveQuestionCard question={data.question} onReviewLater={() => console.log("review-later")} />

        <AnswerEditorCard editor={data.editor} scanSheet={data.scanSheet} />

        <LiveStatsRow stats={data.stats} />
      </ScrollView>

      <ExamActionBar
        nav={data.nav}
        onPrev={() => console.log("prev-question")}
        onBookmark={() => console.log("bookmark-question")}
        onNext={() => console.log("next-question")}
      />

      <View style={{ height: Math.max(insets.bottom, 12) }} />

      <AppBottomNav activeKey="tests" bottomInset={insets.bottom} />

      <SubmitModal
        submit={data.submit}
        visible={submitVisible}
        onConfirm={() => {
          console.log("submit-test");
          setSubmitVisible(false);
        }}
        onCancel={() => setSubmitVisible(false)}
      />
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
    paddingBottom: 12,
  },
});