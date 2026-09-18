import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ApprovedQuestionBank from "../components/ApprovedQuestionBank";
import DraftQuestionCard from "../components/DraftQuestionCard";
import ModerationCard from "../components/ModerationCard";
import QuestionBankHeader from "../components/QuestionBankHeader";
import QuestionBankTabs from "../components/QuestionBankTabs";
import TeacherBottomNav from "../components/TeacherBottomNav";
import UnifiedTitleSection from "../components/UnifiedTitleSection";
import { useQuestionBank } from "../hooks/useQuestionBank";
import { mockTeacher } from "../mocks/teacher.mock";
import { colors } from "../theme/colors";

export default function QuestionBankScreen() {
  const insets = useSafeAreaInsets();
  const { data, loading } = useQuestionBank();
  const [activeTab, setActiveTab] = useState("draft");

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

      <QuestionBankHeader
        header={data.header}
        avatarUrl={mockTeacher.profile.avatarUrl}
        onNotification={() => console.log("notifications")}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <UnifiedTitleSection title={data.title} />

        <QuestionBankTabs tabs={data.tabs} activeTab={activeTab} onSelect={setActiveTab} />

        <ModerationCard moderation={data.moderation} />

        {activeTab === "draft" ? (
          <DraftQuestionCard
            draft={data.draft}
            onApprove={() => console.log("approve-question")}
            onEdit={() => console.log("edit-rubric")}
            onClose={() => console.log("close-draft")}
          />
        ) : null}

        {activeTab === "approved" ? (
          <ApprovedQuestionBank
            title={data.approvedTitle}
            count={data.approvedCount}
            filters={data.approvedFilters}
            questions={data.approvedQuestions}
            exportLabel={data.exportLabel}
            onExport={() => console.log("export-questions")}
          />
        ) : null}
      </ScrollView>

      <TeacherBottomNav activeKey="qbank" bottomInset={insets.bottom} />
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
});