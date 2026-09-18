import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { StudentInfo, QuestionInfo, AIConfidence } from "../types/aiCalibration.types";

interface StudentInfoCardProps {
  student: StudentInfo;
  question: QuestionInfo;
  aiConfidence: AIConfidence;
}

export default function StudentInfoCard({
  student,
  question,
  aiConfidence,
}: StudentInfoCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.initialsBox}>
          <Text style={styles.initialsText}>{student.initials}</Text>
        </View>
        <View style={styles.nameWrap}>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.meta}>
            {student.rollNumber} • {student.school}
          </Text>
        </View>
        <View style={styles.timestamp}>
          <MaterialIcons name="schedule" size={12} color={colors.textMuted} />
          <Text style={styles.timestampText}>{student.timestamp}</Text>
        </View>
      </View>

      <View style={styles.questionBox}>
        <View style={styles.questionHeader}>
          <MaterialIcons name="help-outline" size={14} color={colors.primary} />
          <Text style={styles.questionLabel}>
            QUESTION {question.number} • {question.maxMarks} MARKS
          </Text>
        </View>
        <Text style={styles.questionText}>{question.text}</Text>
      </View>

      <View style={styles.confidenceBox}>
        <MaterialIcons name="warning" size={14} color={colors.amber} />
        <View style={styles.confidenceText}>
          <Text style={styles.confidenceTitle}>
            AI Confidence: {aiConfidence.percentage}%{" "}
            {aiConfidence.requiresSignoff && "(Teacher Sign-off Required)"}
          </Text>
          <Text style={styles.confidenceWarning}>{aiConfidence.warning}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  initialsBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E6DDFB",
    alignItems: "center",
    justifyContent: "center",
  },
  initialsText: {
    ...monoText(12, "800"),
    color: "#6D28D9",
  },
  nameWrap: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  name: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  meta: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  timestamp: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timestampText: {
    ...monoText(9, "600"),
    color: colors.textMuted,
  },
  questionBox: {
    backgroundColor: "#F8F9FC",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  questionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  questionLabel: {
    ...monoText(9, "700"),
    color: colors.primary,
  },
  questionText: {
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 17,
  },
  confidenceBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FEF2F2",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    gap: 8,
  },
  confidenceText: {
    flex: 1,
  },
  confidenceTitle: {
    ...monoText(9.5, "700"),
    color: colors.crimson,
    marginBottom: 4,
  },
  confidenceWarning: {
    fontSize: 10.5,
    color: colors.textSecondary,
    lineHeight: 15,
  },
});