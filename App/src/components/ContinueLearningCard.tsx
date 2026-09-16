import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { ContinueLesson } from "../types/dashboard.types";
import ProgressBar from "./ProgressBar";

interface ContinueLearningCardProps {
  lesson: ContinueLesson;
  onContinue: () => void;
}

export default function ContinueLearningCard({ lesson, onContinue }: ContinueLearningCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.iconBox}>
          <MaterialIcons name="science" size={22} color={colors.primary} />
        </View>

        <View style={styles.header}>
          <View style={styles.tagRow}>
            <Text style={styles.subject}>{lesson.subject}</Text>
            <View style={styles.weightChip}>
              <Text style={styles.weightText}>{lesson.weightage}</Text>
            </View>
          </View>
          <Text style={styles.title}>{lesson.title}</Text>
          <Text style={styles.topic} numberOfLines={1}>
            {lesson.topic}
          </Text>
        </View>
      </View>

      <View style={styles.progressLabelRow}>
        <Text style={styles.progressLabel}>Unit Completion</Text>
        <Text style={styles.progressValue}>{lesson.completionPercent}%</Text>
      </View>
      <ProgressBar percent={lesson.completionPercent} style={styles.progressBar} />

      <View style={styles.bottomRow}>
        <View style={styles.timeRow}>
          <MaterialCommunityIcons name="clock-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.timeText}>{lesson.timeLeft}</Text>
        </View>

        <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onContinue}>
          <Text style={styles.buttonText}>Continue</Text>
          <MaterialIcons name="arrow-forward" size={16} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    marginTop: 12,
  },
  topRow: {
    flexDirection: "row",
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: colors.iconBox,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    marginLeft: 12,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  subject: {
    ...monoText(10, "700"),
    color: colors.primary,
    letterSpacing: 1,
  },
  weightChip: {
    backgroundColor: colors.beige,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  weightText: {
    ...monoText(10, "700"),
    color: colors.amber,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 4,
  },
  topic: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  progressLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  progressLabel: {
    ...monoText(11),
    color: colors.textPrimary,
  },
  progressValue: {
    ...monoText(11, "700"),
    color: colors.textPrimary,
  },
  progressBar: {
    marginTop: 6,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  buttonText: {
    ...monoText(13, "700"),
    color: colors.white,
  },
});