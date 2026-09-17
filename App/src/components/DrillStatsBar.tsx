import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { DrillStats } from "../types/practiceDrill.types";

export default function DrillStatsBar({ stats }: { stats: DrillStats }) {
  return (
    <View>
      {/* Chips row */}
      <View style={styles.chipsRow}>
        <View style={styles.subjectChip}>
          <MaterialIcons name="science" size={13} color={colors.primary} />
          <Text style={styles.subjectChipText}>{stats.subjectChip}</Text>
        </View>

        <View style={styles.chip}>
          <View style={styles.amberDot} />
          <Text style={styles.chipText}>{stats.marksChip}</Text>
        </View>

        <View style={styles.chip}>
          <MaterialIcons name="timer" size={13} color={colors.primary} />
          <Text style={styles.timerText}>{stats.timer}</Text>
        </View>
      </View>

      {/* Progress row */}
      <View style={styles.progressRow}>
        <View style={styles.countWrap}>
          <Text style={styles.countCurrent}>
            {String(stats.questionIndex).padStart(2, "0")}
          </Text>
          <Text style={styles.countTotal}>/ {stats.totalQuestions} Questions</Text>
        </View>

        <View style={styles.streakPill}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakText}>Streak {stats.streak}</Text>
          <Text style={styles.xpBonus}>{stats.xpBonus}</Text>
        </View>
      </View>

      {/* Segmented progress */}
      <View style={styles.segmentsRow}>
        {Array.from({ length: stats.totalQuestions }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.segment,
              index < stats.questionIndex ? styles.segmentFilled : undefined,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chipsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  subjectChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#CFE0F8",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  subjectChipText: {
    ...monoText(9, "700"),
    color: "#1D4ED8",
    letterSpacing: 0.6,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ECEEF6",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  amberDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.amber,
  },
  chipText: {
    ...monoText(9.5, "600"),
    color: colors.textPrimary,
  },
  timerText: {
    ...monoText(9.5, "700"),
    color: colors.primary,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  countWrap: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  countCurrent: {
    ...monoText(16, "800"),
    color: colors.primary,
  },
  countTotal: {
    ...monoText(10, "600"),
    color: colors.textPrimary,
  },
  streakPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E7EAF4",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  streakEmoji: {
    fontSize: 11,
  },
  streakText: {
    ...monoText(10, "700"),
    color: colors.amber,
  },
  xpBonus: {
    ...monoText(9.5, "600"),
    color: colors.textSecondary,
  },
  segmentsRow: {
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#DDE1EC",
  },
  segmentFilled: {
    backgroundColor: colors.primary,
  },
});