import React from "react";
import { ActivityIndicator, Alert, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AICalibrationHeader from "../components/AICalibrationHeader";
import ActionButtons from "../components/ActionButtons";
import CalibrationItemCard from "../components/CalibrationItemCard";
import FinalMarkDisplay from "../components/FinalMarkDisplay";
import OCRImageViewer from "../components/OCRImageViewer";
import StudentInfoCard from "../components/StudentInfoCard";
import TeacherBottomNav from "../components/TeacherBottomNav";
import TeacherFeedbackSection from "../components/TeacherFeedbackSection";
import { useAICalibration } from "../hooks/useAICalibration";
import { mockTeacher } from "../mocks/teacher.mock";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

type Props = NativeStackScreenProps<RootStackParamList, "AICalibration">;

export default function AICalibrationScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { paperId } = route.params;
  const { data, loading } = useAICalibration(paperId);

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

      <AICalibrationHeader
        title={data.headerTitle}
        subtitle={data.headerSubtitle}
        auditBadge={data.auditBadge}
        reviewCount={data.reviewCount}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <StudentInfoCard
          student={data.student}
          question={data.question}
          aiConfidence={data.aiConfidence}
        />

        <OCRImageViewer imageUrl={data.submissionImage} ocrInfo={data.ocrInfo} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{data.criteriaTitle}</Text>
          <Text style={styles.criteriaCount}>{data.criteriaCount}</Text>
        </View>

        {data.calibrationItems.map((item) => (
          <CalibrationItemCard key={item.id} item={item} />
        ))}

        <TeacherFeedbackSection feedback={data.teacherFeedback} />

        <FinalMarkDisplay finalMark={data.finalMark} />

        <ActionButtons
          confirmLabel={data.confirmLabel}
          reevaluateLabel={data.reevaluateLabel}
          onConfirm={() => navigation.navigate("TeacherCohort")}
          onReevaluate={() => Alert.alert("Re-evaluation requested", "The annotated script was sent for model review.")}
        />
      </ScrollView>

      <TeacherBottomNav activeKey="dashboard" bottomInset={insets.bottom} />
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
    padding: 12,
    paddingBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  criteriaCount: {
    ...monoText(9, "700"),
    color: colors.primary,
  },
});