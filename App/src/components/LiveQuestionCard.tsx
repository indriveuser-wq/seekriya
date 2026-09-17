import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { LiveQuestion } from "../types/liveExam.types";

export default function LiveQuestionCard({
  question,
  onReviewLater,
}: {
  question: LiveQuestion;
  onReviewLater?: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.chipsRow}>
        <View style={styles.groupChip}>
          <Text style={styles.groupChipText}>{question.groupChip}</Text>
        </View>
        <View style={styles.marksChip}>
          <Text style={styles.marksChipText}>{question.marksChip}</Text>
        </View>
        <View style={styles.subjectChip}>
          <Text style={styles.subjectChipText}>{question.subjectChip}</Text>
        </View>

        <View style={styles.spacer} />

        <Pressable style={styles.reviewButton} onPress={onReviewLater}>
          <MaterialIcons name="bookmark-border" size={14} color={colors.textPrimary} />
          <Text style={styles.reviewText}>{question.reviewLaterLabel}</Text>
        </Pressable>
      </View>

      <Text style={styles.questionText}>{question.text}</Text>

      <View style={styles.rubricRow}>
        <MaterialIcons name="psychology" size={15} color={colors.primary} />
        <Text style={styles.rubricText}>{question.rubric}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 20,
    padding: 16,
    marginTop: 14,
  },
  chipsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  groupChip: {
    backgroundColor: "#E6DDFB",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  groupChipText: {
    ...monoText(9, "700"),
    color: "#7C3AED",
    letterSpacing: 0.6,
  },
  marksChip: {
    backgroundColor: colors.beige,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  marksChipText: {
    ...monoText(9, "700"),
    color: colors.amber,
  },
  subjectChip: {
    backgroundColor: "#DFE3EE",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  subjectChipText: {
    ...monoText(9, "600"),
    color: colors.textPrimary,
  },
  spacer: {
    flex: 1,
  },
  reviewButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E2E5F0",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  reviewText: {
    ...monoText(10, "600"),
    color: colors.textPrimary,
  },
  questionText: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
    lineHeight: 26,
    marginTop: 12,
  },
  rubricRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 12,
  },
  rubricText: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});