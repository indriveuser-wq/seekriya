import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { TeacherFeedback } from "../types/aiCalibration.types";

export default function TeacherFeedbackSection({ feedback }: { feedback: TeacherFeedback }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Teacher Commentary & Feedback</Text>
      
      <View style={styles.voiceRow}>
        <MaterialIcons name="mic" size={14} color={colors.textSecondary} />
        <Text style={styles.voiceLabel}>Voice Dictation</Text>
      </View>

      <View style={styles.feedbackBox}>
        <Text style={styles.feedbackText}>{feedback.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  voiceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  voiceLabel: {
    ...monoText(9.5, "700"),
    color: colors.primary,
  },
  feedbackBox: {
    backgroundColor: "#F8F9FC",
    borderRadius: 10,
    padding: 12,
  },
  feedbackText: {
    fontSize: 11.5,
    color: colors.textPrimary,
    lineHeight: 17,
  },
});